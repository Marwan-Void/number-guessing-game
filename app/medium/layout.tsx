import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Number Guessing Game - Medium Mode - Marwan Codex",
  description: "A Number Guessing Game Made By Marwan Codex, In This Game You Guess The Secret Number That System Chooses Randomly, This is The Medium Mode Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return (
    <>
        {children}
    </>
  );
}