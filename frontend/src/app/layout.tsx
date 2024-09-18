import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Betitfy | Betting Made Simple and Fun",
  description: "Enjoy easy and fun betting on roulette and more. Join now for a hassle-free, secure experience and win big with Betitfy!"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        
      {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" /> */}
      {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /> */}
      </head>
      <body className={outfit.className + ' bg-custom-gray-900 h-dvh'}>{children}</body>
    </html>
  );
}
