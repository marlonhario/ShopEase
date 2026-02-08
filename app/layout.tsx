import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ToasterWrapper } from "@/components/ToasterWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "ShopEase – browse and buy top shoes and streetwear styles with fast, easy shopping. Discover your favorites and shop now for the best deals online!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-full flex-col bg-white ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="grow container mx-auto px-6 py-20 md:px-20">
          {children}
        </main>
        <ToasterWrapper />
      </body>
    </html>
  );
}
