import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sonar Launch Kit | Launch on Base in 24 Hours",
  description:
    "AI-powered launch kit generator for Base ecosystem projects. Answer 10 questions, get a complete builder launch kit with tokenomics, LP strategy, community playbook, and more.",
  openGraph: {
    title: "Sonar Launch Kit | Launch on Base in 24 Hours",
    description:
      "Answer 10 questions, get a complete builder launch kit for Base.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonar Launch Kit | Launch on Base in 24 Hours",
    description:
      "Answer 10 questions, get a complete builder launch kit for Base.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-black text-white min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
