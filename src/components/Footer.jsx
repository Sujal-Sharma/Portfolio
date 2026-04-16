import { motion } from "framer-motion";
import { socialLinks, navLinks, gmailLink } from "../constants";

const Footer = () => {
  return (
    <footer className="relative bg-[#020b15] border-t border-white/5 py-12 overflow-hidden">
      {/* Gradient line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#915eff] to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-32 bg-[#915eff]/5 blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#915eff] to-[#00d9ff] flex items-center justify-center font-bold text-lg">
                S
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-none">Sujal Kumar Sharma</p>
                <p className="text-[#915eff] text-xs font-medium tracking-wider">AI/ML Engineer</p>
              </div>
            </div>
            <p className="text-[#aaa6c3] text-sm leading-relaxed max-w-xs">
              Building the future at the intersection of AI, Engineering, and Healthcare.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-white font-semibold mb-4">Navigation</p>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" })}
                  className="text-[#aaa6c3] text-sm hover:text-[#915eff] transition-colors text-left"
                >
                  {link.title}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-semibold mb-4">Contact</p>
            <div className="flex flex-col gap-2">
              <a href={gmailLink()} target="_blank" rel="noopener noreferrer" className="text-[#aaa6c3] text-sm hover:text-[#00d9ff] transition-colors">
                {socialLinks.email}
              </a>
              <a href={`tel:${socialLinks.phone}`} className="text-[#aaa6c3] text-sm hover:text-[#00d9ff] transition-colors">
                {socialLinks.phone}
              </a>
            </div>

            {/* Social icons */}
            <div className="flex gap-3 mt-4">
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-[#aaa6c3] hover:text-white hover:border-[#915eff]/50 hover:bg-[#915eff]/10 transition-all">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-[#aaa6c3] hover:text-white hover:border-[#00d9ff]/50 hover:bg-[#00d9ff]/10 transition-all">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href={gmailLink()} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-[#aaa6c3] hover:text-white hover:border-[#ff6b35]/50 hover:bg-[#ff6b35]/10 transition-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#aaa6c3] text-sm">
            © Sujal Kumar Sharma
          </p>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
            <span className="text-[#aaa6c3] text-sm">Open to work</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
