import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, socialLinks, gmailLink } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActive(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050816]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer flex items-center gap-3"
          onClick={() => { setActive(""); window.scrollTo(0, 0); }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#915eff] to-[#00d9ff] flex items-center justify-center font-bold text-lg shadow-lg neon-purple">
            S
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-none">Sujal</p>
            <p className="text-[#915eff] text-xs font-medium tracking-widest uppercase">AI/ML Engineer</p>
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <motion.button
              key={link.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(link.id)}
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                active === link.id ? "text-white" : "text-[#aaa6c3] hover:text-white"
              }`}
            >
              {active === link.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 rounded-lg border border-white/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{link.title}</span>
            </motion.button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <motion.a
            href={gmailLink("Hiring Inquiry")}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(145,94,255,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-gradient-to-r from-[#915eff] to-[#00d9ff] text-white text-sm font-semibold rounded-xl transition-all duration-300"
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-white transition-all"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-white transition-all"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-white transition-all"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050816]/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {link.title}
                </button>
              ))}
              <a
                href={gmailLink("Hiring Inquiry")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-4 py-3 bg-gradient-to-r from-[#915eff] to-[#00d9ff] text-white text-center font-semibold rounded-xl"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
