"use client";
import { useEffect, useCallback } from "react";
import mermaid from "mermaid";
import { Theme } from "@/types/Theme";

const buildTheme = (theme: Theme) => {
  let themeVars: Record<string, string> = {
    fontFamily: '"Inter", sans-serif',
    fontSize: "1.1rem",
    background: "#ffffff",
    primaryColor: "#ffffff",
    primaryBorderColor: "#0a0a0a",
    secondaryColor: "gold",
    secondaryBorderColor: "#0a0a0a",
  };
  if (theme !== Theme.LIGHT) {
    themeVars = {
      ...themeVars,
      background: "#1e1e2f",
      primaryTextColor: "#0a0a0a",
      primaryColor: "hsl(47, 29%, 94%)",
      titleColor: "hsl(47, 29%, 94%)",
      textColor: "hsl(47, 29%, 94%)",
      secondaryColor: "hsl(41, 87%, 72%)",
    };
  }
  return themeVars;
};

const prepMermaidBlocks = () => {
  const mermaidBlocks = document.querySelectorAll<HTMLElement>(".mermaid");
  mermaidBlocks.forEach((el, index) => {
    const originalText =
      el.getAttribute("data-mermaid-original") ?? el.textContent ?? "";
    const id = `mermaid-${index}`;
    el.setAttribute("data-mermaid-original", originalText); // Persist original source
    el.setAttribute("id", id); // Set the ID for the element
  });
};

export const MermaidInitializer = ({ theme }: { theme: Theme }) => {
  const setMermaid = (themeVars: Record<string, string>) => {
    mermaid.initialize({
      theme: "base",
      themeVariables: themeVars,
      layout: "elk",
      flowchart: {
        curve: "monotoneX",
      },
    });
    mermaid.contentLoaded();
  };

  const resetMermaidToOriginalContent = () => {
    const contentMap = document.querySelectorAll<HTMLElement>(".mermaid");
    contentMap.forEach((el) => {
      const originalText = el.getAttribute("data-mermaid-original");
      if (originalText) {
        el.textContent = originalText;
        el.classList.add("mermaid-pending");
        el.removeAttribute("data-processed");
      }
    });
  };

  const rerenderMermaid = useCallback(() => {
    const newTheme = buildTheme(theme);
    resetMermaidToOriginalContent();
    setMermaid(newTheme);
  }, [theme]);

  useEffect(() => {
    prepMermaidBlocks();
    rerenderMermaid();

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          rerenderMermaid();
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect(); // Clean up the observer
    };
  }, [rerenderMermaid]);

  return null;
};
