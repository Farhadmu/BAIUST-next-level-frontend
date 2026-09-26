import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CSE HUB — The Unified Digital Ecosystem for Computer Science & Engineering",
  description: "One platform for a CSE student's Academic Life, Learning Journey, Career Preparation, Community, Tools, and Alumni Network.",
  keywords: ["CSE HUB", "Computer Science", "Engineering", "Academic Hub", "Career Roadmaps", "Competitive Programming", "Student Tools"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#07100C] text-[#F2F5F3]">
        {children}
      </body>
    </html>
  );
}
