import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mariia Batalkina — Software Engineer",
  description:
    "Software Engineer and former professional ballet dancer. I build reliable LLM systems: retrieval, validated outputs and secure multi-tenant backends.",
  openGraph: {
    title: "Mariia Batalkina — Software Engineer",
    description:
      "Software Engineer and former professional ballet dancer. I build reliable LLM systems: retrieval, validated outputs and secure multi-tenant backends.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mariia Batalkina — Software Engineer",
    description:
      "Software Engineer and former professional ballet dancer. Building reliable LLM systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#ededed] cursor-none">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
