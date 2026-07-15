import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalShell from "@/components/ConditionalShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LA Open Books | Bookendbook",
  description:
    "Discover the Bookendbook catalog — illustrated word search and activity books for curious minds: history, culture, and the world, one puzzle at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#060606] text-[#f5f0eb]">
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  );
}
