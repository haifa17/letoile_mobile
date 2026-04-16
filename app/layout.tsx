import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SoundCloudPlayer from "@/components/SoundCloudPlayer";
import Header from "@/components/header";
import Footer from "@/components/footer";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LETOILE MOBILE - Votre nouveau réseau mobile",
  description:
    "Découvrez une expérience mobile révolutionnaire avec LETOILE MOBILE. Migration simple, couverture optimale, tarifs transparents.",
  generator: "v0.app",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="bg-background">
      <body className="font-sans antialiased">
        <SoundCloudPlayer />
        <Header />
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
        <Footer />
      </body>
    </html>
  );
}
