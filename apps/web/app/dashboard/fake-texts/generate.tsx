"use client";
import { Button } from "@/components/ui/button";
import { WandSparkles } from "lucide-react";
import React from "react";

const Generate = () => {
  return (
    <div className="flex sticky bottom-0 w-full bg-background py-2 lg:py-4 gap-2 items-center justify-end mt-auto">
      <Button variant="secondary">Save</Button>
      <Button className="flex items-center">
        <WandSparkles />
        <p>Generate</p>
      </Button>
    </div>
  );
};

export default Generate;
