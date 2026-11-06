import BuildCursors from "@/components/BuildCursors";
import Certifications from "@/components/Certifications";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import ContactProvider from "@/components/ContactProvider";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Faq from "@/components/Faq";
import Navbar from "@/components/Navbar";
import Proof from "@/components/Proof";
import Results from "@/components/Results";
import Skills from "@/components/Skills";
import Tools from "@/components/Tools";

export default function Home() {
  return (
    <ContactProvider>
      <BuildCursors />
      <Navbar />
      <main id="main">
        <Hero />
        <Clients />
        <Results />
        <Journey />
        <Skills />
        <Tools />
        <Certifications />
        <Proof />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </ContactProvider>
  );
}
