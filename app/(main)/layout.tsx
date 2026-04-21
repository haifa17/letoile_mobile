import { Analytics } from "@vercel/analytics/next";
import "./../globals.css";
import SoundCloudPlayer from "@/app/(main)/components/SoundCloudPlayer";
import Header from "@/app/(main)/components/header";
import Footer from "@/app/(main)/components/footer";
import { ToastContainer } from "react-toastify";
import Chatbot from "@/components/Chatbot";

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
      <Chatbot />
      <ToastContainer />

      <Footer />
    </>
  );
}
