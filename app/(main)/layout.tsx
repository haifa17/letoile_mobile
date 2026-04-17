
import { Analytics } from "@vercel/analytics/next";
import "./../globals.css";
import SoundCloudPlayer from "@/components/SoundCloudPlayer";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SoundCloudPlayer />
      <Header />
      {children}
      {process.env.NODE_ENV === "production" && <Analytics />}
      <Footer />
    </>
  );
}
