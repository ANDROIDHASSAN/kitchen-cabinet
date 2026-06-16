import Nav from "@/components/Nav";
import HeroFrames from "@/components/HeroFrames";
import Manifesto from "@/components/Manifesto";
import SignatureProjects from "@/components/SignatureProjects";
import Capabilities from "@/components/Capabilities";
import MaterialsLab from "@/components/MaterialsLab";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import PortfolioGrid from "@/components/PortfolioGrid";
import Testimonials from "@/components/Testimonials";
import Recognition from "@/components/Recognition";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative bg-bone">
        <HeroFrames />
        <Manifesto />
        <SignatureProjects />
        <Capabilities />
        <MaterialsLab />
        <Process />
        <Stats />
        <PortfolioGrid />
        <Testimonials />
        <Recognition />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
