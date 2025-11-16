"use client";

import Models, {
  VoiceFilters,
  VoiceFiltersComponent,
} from "@/components/tts/models";
import { ttsModels } from "@/lib/tts-models";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bgAudios } from "@/lib/bg-audios";
import { AudioPlayer } from "@/components/audio-player";
import { Slider } from "@/components/ui/slider";

const Audio = () => {
  const [filters, setFilters] = useState<VoiceFilters>({
    searchQuery: "",
    selectedGender: "all",
    selectedAccent: "all",
    selectedCharacteristic: "all",
    selectedAge: "all",
    selectedUseCase: "all",
  });
  const [receiverModel, setReceiverModel] = useState<
    (typeof ttsModels)[number] | null
  >(null);
  const [senderModel, setSenderModel] = useState<
    (typeof ttsModels)[number] | null
  >(null);
  const [bgAudioSelected, setBgAudioSelected] = useState<
    (typeof bgAudios)[number] | null
  >(null);
  const [bgAudioVolume, setBgAudioVolume] = useState(0.2);

  return (
    <div className="w-full flex flex-col gap-4 pt-2">
      <div className="w-full border-2 border-primary/5 p-2 lg:p-4 rounded-lg">
        <h3 className="font-bold text-lg px-4 pb-8">Choose background audio</h3>
        <div className="flex w-full gap-2 px-4">
          <Select
            onValueChange={(v) => setBgAudioSelected(bgAudios[Number(v)])}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose background audio" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {bgAudios.map((audio, index) => (
                  <SelectItem value={String(index)} key={audio.name}>
                    {audio.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <AudioPlayer
            src={bgAudioSelected?.path!}
            className="min-w-8"
            volume={bgAudioVolume}
          />
        </div>
        <div className="flex gap-4 mt-4 w-full px-4">
          <h3 className="text-nowrap w-max text-sm">
            Volume: <span className="">{Math.floor(bgAudioVolume * 100)}%</span>
          </h3>
          <Slider
            defaultValue={[20]}
            max={100}
            step={1}
            value={[bgAudioVolume * 100]}
            onValueChange={(v) => setBgAudioVolume(v[0] * 0.01)}
            className="w-full"
          />
        </div>
      </div>
      <div className="w-full border-2 border-primary/5 p-2 lg:p-4 rounded-lg">
        <h3 className="font-bold text-lg px-4 pb-8">Choose narration audio</h3>
        <VoiceFiltersComponent
          filters={filters}
          onFiltersChange={setFilters}
          models={ttsModels.filter((model) => model.languages.includes("en"))}
        />
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 items-start mt-4">
          <div className="min-w-0 w-full lg:flex-1">
            <p className="px-4 font-semibold mb-2">Receiver's voice</p>
            <Models
              filters={filters}
              className="max-h-80 overflow-y-auto"
              onSelectModel={(model) => setReceiverModel(model)}
            />
          </div>
          <div className="min-w-0  w-full lg:flex-1">
            <p className="px-4 font-semibold mb-2">Sender's voice</p>
            <Models
              filters={filters}
              className="max-h-80 overflow-y-auto"
              onSelectModel={(model) => setSenderModel(model)}
            />
          </div>
        </div>
        {/* Multiple Models components sharing the same filters */}
      </div>
    </div>
  );
};

export default Audio;
