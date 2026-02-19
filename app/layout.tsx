import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "app/providers";
import { preloadState } from "entity/user";
import type { ReactNode } from "react";

const notoSans = Noto_Sans({ variable: "--font-sans" });

export const metadata: Metadata = {
  title: "COLLAPSE: сумки, рюкзаки, одежда",
  description:
    "Интернет-магазин COLLAPSE предлагает стильные, оригинальные и функциональные сумки и рюкзаки, а также одежду и аксессуары.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const preloadedState = await preloadState();

  return (
    <html lang="en" className={notoSans.variable}>
      <body className={`antialiased flex flex-col min-h-screen gap-8`}>
        <Providers preloadedState={preloadedState}>{children}</Providers>
      </body>
    </html>
  );
}
