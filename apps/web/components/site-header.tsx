"use client";

import { SidebarIcon } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  console.log("here in header");

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b sm:hidden">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex-1 ml-2">
          <h2 className="text-sm font-medium">Shadow Clips</h2>
        </div>
      </div>
    </header>
  );
}
