import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import CursorFx from "@/components/CursorFx";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kai Voss — Roblox Scripter & Game Developer",
  description:
    "Freelance Roblox scripter & game developer. Combat, matchmaking, and anti-cheat systems that turn a fun idea into a game people sink hundreds of hours into — fast, fair, and unbreakable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body>
        <div className="bg-atmos" />
        <CursorFx />
        {children}
      </body>
    </html>
  );
}
