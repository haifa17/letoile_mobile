import Hero from "@/components/hero";
import Banner from "@/components/banner";
import Portability from "@/components/portability";
import Migration from "@/components/migration";
import Offers from "@/components/offers";
import FAQ from "@/components/faq";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
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
