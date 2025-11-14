import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function Logo({
  className,
  width = 32,
  height = 32,
  priority = false
}: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="Shadow Clips Logo"
      width={width}
      height={height}
      priority={priority}
      className={cn("object-contain", className)}
    />
  );
}
