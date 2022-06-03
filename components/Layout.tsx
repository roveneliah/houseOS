import Head from "next/head";
import { ReactNode, useState } from "react";
import { themes } from "../config";
import { useGetCommands } from "../hooks/useGetCommands";
import CommandPalette from "./CommandPalette";
import { Command } from "../types/Command";

export default function Layout({
  children,
  paletteOpen = false,
}: {
  children?: ReactNode;
  paletteOpen?: boolean;
}) {
  const [themeIndex, setThemeIndex] = useState<number>(0);
  const themeName = themes[themeIndex]?.toString();
  const commands: Array<Command> = useGetCommands();
  return (
    <div data-theme={themeName} className="min-h-screen">
      <Head>
        <title>LFG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommandPalette commands={commands} startsOpen={paletteOpen} />
      <main className="flex h-[100vh] w-full flex-1 flex-col items-start justify-start bg-gray-500 bg-cover text-center">
        {children}
      </main>
    </div>
  );
}
