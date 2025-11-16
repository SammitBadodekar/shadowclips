"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Video,
  FileText,
  SplitSquareHorizontal,
  CreditCard,
  HelpCircle,
  Link as LinkIcon,
  Settings,
  Plus,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import { Logo } from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";

const templates = [
  {
    title: "Faceless Shorts",
    icon: FileText,
    href: "/dashboard/faceless-shorts",
  },
  {
    title: "Fake texts",
    icon: FileText,
    href: "/dashboard/fake-texts",
  },
  {
    title: "Split screen",
    icon: SplitSquareHorizontal,
    href: "/dashboard/split-screen",
  },
];

const settingsItems = [
  {
    title: "Usage",
    icon: Settings,
    href: "/dashboard/usage",
  },
  {
    title: "Billing",
    icon: CreditCard,
    href: "/dashboard/billing",
  },
  {
    title: "Support",
    icon: HelpCircle,
    href: "/dashboard/support",
  },
  {
    title: "Affiliates",
    icon: LinkIcon,
    href: "/dashboard/affiliates",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { isMobile, toggleSidebar } = useSidebar();

  return (
    <Sidebar
      className="top-(--header-height) lg:top-0 h-[calc(100svh-var(--header-height))] lg:h-svh"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link
                href="/dashboard"
                onClick={() => {
                  if (isMobile) {
                    toggleSidebar();
                  }
                }}
              >
                <Logo width={50} height={50} />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold text-lg">
                    Shadow Clips
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Home"
                  isActive={pathname === "/dashboard"}
                >
                  <Link
                    href="/dashboard"
                    onClick={() => {
                      if (isMobile) {
                        toggleSidebar();
                      }
                    }}
                  >
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Create"
                  isActive={pathname === "/dashboard/create"}
                >
                  <Link
                    href="/dashboard/create"
                    onClick={() => {
                      if (isMobile) {
                        toggleSidebar();
                      }
                    }}
                  >
                    <Plus />
                    <span>Create</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        <SidebarGroup>
          <SidebarGroupLabel>TEMPLATES</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {templates.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.href}
                  >
                    <Link
                      href={item.href}
                      onClick={() => {
                        if (isMobile) {
                          toggleSidebar();
                        }
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        <SidebarGroup>
          <SidebarGroupLabel>SETTINGS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.href}
                  >
                    <Link
                      href={item.href}
                      onClick={() => {
                        if (isMobile) {
                          toggleSidebar();
                        }
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto px-4 pb-4">
          <div className="rounded-lg bg-muted p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Credits Remaining
              </span>
              <span className="text-sm font-semibold">0</span>
            </div>
            <Button size="sm" className="w-full" variant="secondary">
              <Plus className="mr-1 h-4 w-4" />
              Add credits
            </Button>
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: session?.user?.name || "User",
            email: session?.user?.email || "",
            avatar: session?.user?.image || "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
