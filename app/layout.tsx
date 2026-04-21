import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "LETOILE MOBILE - Votre nouveau réseau mobile",
  description:
    "Découvrez une expérience mobile révolutionnaire avec LETOILE MOBILE. Migration simple, couverture optimale, tarifs transparents.",
  generator: "v0.app",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="bg-background">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sekuya&family=Mulish:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {" "}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
