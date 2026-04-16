import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Research from "./components/sections/Research";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import Footer from "./components/Footer";

const CursorGlow = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div ref={glowRef} className="cursor-glow" />;
};

function App() {
  return (
    <div className="relative min-h-screen bg-[#050816] overflow-x-hidden">
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Research />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
