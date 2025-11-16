"use client";

import { SidebarIcon } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const pathName = usePathname();

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b lg:hidden">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-2" />
        <div className="flex-1">
          <h2 className="text-sm font-medium capitalize">
            {pathName?.split("/")?.pop()}
          </h2>
        </div>
      </div>
    </header>
  );
}
