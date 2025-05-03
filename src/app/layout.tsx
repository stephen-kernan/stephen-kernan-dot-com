import type { Metadata } from "next";
import { Gloock, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/molecules/NavBar/NavBar";
import { unstable_ViewTransition as ViewTransition } from "react";
import { cookies } from "next/headers";
import { Theme } from "@/types/Theme";

const gloock = Gloock({
  variable: "--font-gloock",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jb-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "stephen kernan",
  // TODO: Fill out description for page
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value ?? Theme.DARK;

  return (
    <html lang="en" data-theme={theme}>
      <ViewTransition>
        <body
          className={`${gloock.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
        >
          <NavBar theme={theme as Theme} />
          <div className="page">{children}</div>
        </body>
      </ViewTransition>
    </html>
  );
}
