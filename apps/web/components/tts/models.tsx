"use client";
import React, { useState, useMemo } from "react";
import { ttsModels } from "@/lib/tts-models";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { AudioPlayer } from "../audio-player";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

// Filter state interface
export interface VoiceFilters {
  searchQuery: string;
  selectedGender: string;
  selectedAccent: string;
  selectedCharacteristic: string;
  selectedAge: string;
  selectedUseCase: string;
}

// Reusable Filters Component
export const VoiceFiltersComponent = ({
  filters,
  onFiltersChange,
  models,
}: {
  filters: VoiceFilters;
  onFiltersChange: (filters: VoiceFilters) => void;
  models: typeof ttsModels;
}) => {
  // Get unique values for filters
  const characteristics = useMemo(() => {
    const tagSet = new Set<string>();
    models.forEach((model) => {
      model.metadata.tags.forEach((tag) => {
        // Exclude masculine/feminine as they're handled separately
        if (tag !== "masculine" && tag !== "feminine") {
          tagSet.add(tag);
        }
      });
    });
    return Array.from(tagSet).sort();
  }, [models]);

  const accents = useMemo(() => {
    const accentSet = new Set<string>();
    models.forEach((model) => {
      if (model.metadata.accent) accentSet.add(model.metadata.accent);
    });
    return Array.from(accentSet).sort();
  }, [models]);

  const updateFilter = (key: keyof VoiceFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="w-full px-4 mb-4">
      {/* Search and Filters row */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search input */}
        <div className="relative flex-1 min-w-[200px] max-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for voices"
            value={filters.searchQuery}
            onChange={(e) => updateFilter("searchQuery", e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md bg-secondary/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Filters label */}
        <span className="text-sm font-medium">Filters</span>

        {/* Gender filter */}
        <Select
          value={filters.selectedGender}
          onValueChange={(value) => updateFilter("selectedGender", value)}
        >
          <SelectTrigger className="w-[140px] border-dashed">
            <SelectValue placeholder="+ Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="masculine">Masculine</SelectItem>
            <SelectItem value="feminine">Feminine</SelectItem>
          </SelectContent>
        </Select>

        {/* Voice Type (Characteristics) filter */}
        <Select
          value={filters.selectedCharacteristic}
          onValueChange={(value) =>
            updateFilter("selectedCharacteristic", value)
          }
        >
          <SelectTrigger className="w-40 border-dashed">
            <SelectValue placeholder="+ Voice Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {characteristics.map((char) => (
              <SelectItem key={char} value={char}>
                {char}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Country (Accent) filter */}
        <Select
          value={filters.selectedAccent}
          onValueChange={(value) => updateFilter("selectedAccent", value)}
        >
          <SelectTrigger className="w-[140px] border-dashed">
            <SelectValue placeholder="+ Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {accents.map((accent) => (
              <SelectItem key={accent} value={accent}>
                {accent}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

// Helper function to filter models
export const filterModels = (
  models: typeof ttsModels,
  filters: VoiceFilters
) => {
  return models.filter((model) => {
    // Search filter
    const searchMatch =
      filters.searchQuery === "" ||
      model.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      model.metadata.tags.some((tag) =>
        tag.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );

    // Gender filter
    const isMasculine = model.metadata.tags.includes("masculine");
    const isFeminine = model.metadata.tags.includes("feminine");
    const genderMatch =
      filters.selectedGender === "all" ||
      (filters.selectedGender === "masculine" && isMasculine) ||
      (filters.selectedGender === "feminine" && isFeminine);

    const accentMatch =
      filters.selectedAccent === "all" ||
      model.metadata.accent === filters.selectedAccent;
    const characteristicMatch =
      filters.selectedCharacteristic === "all" ||
      model.metadata.tags.includes(filters.selectedCharacteristic);
    const ageMatch =
      filters.selectedAge === "all" ||
      model.metadata.age === filters.selectedAge;
    const useCaseMatch =
      filters.selectedUseCase === "all" ||
      model.metadata.use_cases.includes(filters.selectedUseCase);

    return (
      searchMatch &&
      genderMatch &&
      accentMatch &&
      characteristicMatch &&
      ageMatch &&
      useCaseMatch
    );
  });
};

const Models = ({
  className,
  onSelectModel,
  filters,
  models,
}: {
  className?: string;
  onSelectModel?: (model: (typeof ttsModels)[number]) => void;
  filters?: VoiceFilters;
  models?: typeof ttsModels;
}) => {
  const [selectedModel, setSelectedModel] = useState<string>("");

  // Get English models first if no models provided
  const baseModels = useMemo(() => {
    if (models) return models;
    return ttsModels.filter((model) => model.languages.includes("en"));
  }, [models]);

  // Filter models if filters are provided
  const displayModels = useMemo(() => {
    if (!filters) return baseModels;
    return filterModels(baseModels, filters);
  }, [baseModels, filters]);

  return (
    <div className={cn("w-full px-4 flex flex-col gap-2", className)}>
      {displayModels.map((model) => (
        <Card
          key={model.uuid}
          className={`p-2 px-2 w-full items-start justify-start ${selectedModel === model.uuid ? "bg-primary/5" : ""}`}
          onClick={() => {
            if (onSelectModel) {
              onSelectModel(model);
              setSelectedModel(model.uuid);
            }
          }}
        >
          <CardContent className="flex items-center gap-4 w-full px-2">
            <AudioPlayer src={model.metadata.sample} className="min-w-8" />
            <div className="capitalize">{model.name}</div>
            <div className="text-sm text-primary/50 truncate">
              {model.metadata.tags.join(", ")}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Models;
