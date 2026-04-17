import Hero from "@/app/(main)/components/hero";
import Banner from "@/app/(main)/components/banner";
import Portability from "@/app/(main)/components/portability";
import Migration from "@/app/(main)/components/migration";
import Offers from "@/app/(main)/components/offers";
import FAQ from "@/app/(main)/components/faq";
import SoundCloudPlayer from "@/app/(main)/components/SoundCloudPlayer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <SoundCloudPlayer />
      <Hero />
      <Banner />
      <Portability />
      <Migration />
      <Offers />
      {/* <Trust /> */}
      <FAQ />
    </main>
  );
}
