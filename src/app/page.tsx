import BuildCursors from "@/components/BuildCursors";
import Certifications from "@/components/Certifications";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import ContactProvider from "@/components/ContactProvider";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Navbar from "@/components/Navbar";
import Results from "@/components/Results";
import Skills from "@/components/Skills";

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
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </ContactProvider>
  );
}
