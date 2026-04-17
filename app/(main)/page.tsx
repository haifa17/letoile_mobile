import Hero from "@/components/hero";
import Banner from "@/components/banner";
import Portability from "@/components/portability";
import Migration from "@/components/migration";
import Offers from "@/components/offers";
import FAQ from "@/components/faq";
import SoundCloudPlayer from "@/components/SoundCloudPlayer";

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
