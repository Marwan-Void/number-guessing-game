import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Number Guessing Game - Free Mode Page - Marwan Void",
  description: "A Number Guessing Game Made By Marwan Void, In This Game You Guess The Secret Number That System Chooses Randomly",
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
