import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Toolkit from "@/components/toolkit";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <div id="app-wrapper">
      <Navbar />
      <div id="app-content">
        <Hero />
        <About />
        <Toolkit />
        <Contact />
      </div>
    </div>
  );
}
