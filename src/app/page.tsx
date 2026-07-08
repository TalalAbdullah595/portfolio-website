import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SelectedWork from "@/components/SelectedWork";
import Engagements from "@/components/Engagements";
import Process from "@/components/Process";
import Reception from "@/components/Reception";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import RevealFx from "@/components/RevealFx";

export default function Home() {
  return (
    <>
      <Loader />
      <Nav variant="home" />
      <main className="page">
        <Hero />
        <About />
        <SelectedWork />
        <Engagements />
        <Process />
        <Reception />
        <Contact />
        <Footer />
      </main>
      <RevealFx />
    </>
  );
}
