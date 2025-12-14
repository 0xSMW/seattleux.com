"use client";

import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ThemeValue = "system" | "light" | "dark";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const value = (theme ?? "system") as ThemeValue;

  return (
    <div className="w-[120px]">
      <span className="sr-only">Theme</span>
      <Select value={value} onValueChange={(v) => setTheme(v)}>
        <SelectTrigger aria-label="Theme">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="system">System</SelectItem>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
