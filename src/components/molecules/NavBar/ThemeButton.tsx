"use client";
import { FC, useState } from "react";
import { Button, ButtonVariant } from "@/components/atoms/Button/Button";
import { Sun } from "@/icons/Sun";
import { Moon } from "@/icons/Moon";
import { setCookie } from "@/actions/setCookie";
import { Theme } from "@/types/Theme";

interface ThemeButtonProps {
  startingTheme?: Theme;
}

export const ThemeButton: FC<ThemeButtonProps> = ({ startingTheme }) => {
  const [theme, setTheme] = useState(startingTheme);
  const isDark = theme === Theme.DARK;
  const swapTheme = (newTheme: Theme) => {
    setCookie("theme", newTheme);
    document.documentElement.style.setProperty("color-scheme", newTheme);
    const html = document.getElementsByTagName("html");
    html[0].setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <Button
      variant={ButtonVariant.ICON}
      onClick={() => {
        swapTheme(isDark ? Theme.LIGHT : Theme.DARK);
      }}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
};
