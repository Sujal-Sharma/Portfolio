import { motion } from "framer-motion";
import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Stars, Float, OrbitControls } from "@react-three/drei";
import Stars2 from "../canvas/Stars";
import { socialLinks, gmailLink } from "../../constants";

const FloatingBrain = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef}>
        {/* Main sphere */}
        <Sphere args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color="#915eff"
            emissive="#4a00e0"
            emissiveIntensity={0.3}
            distort={0.4}
            speed={3}
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>
        {/* Ring 1 */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.8, 0.03, 16, 100]} />
          <meshStandardMaterial
            color="#00d9ff"
            emissive="#00d9ff"
            emissiveIntensity={1}
          />
        </mesh>
        {/* Ring 2 */}
        <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
          <torusGeometry args={[2.1, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#915eff"
            emissive="#915eff"
            emissiveIntensity={0.8}
          />
        </mesh>
        {/* Orbiting particles */}
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 1.8, Math.sin(angle) * 0.3, Math.sin(angle) * 1.8]}
            >
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#00d9ff" : "#ff6b35"}
                emissive={i % 2 === 0 ? "#00d9ff" : "#ff6b35"}
                emissiveIntensity={1}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
};

const BackgroundGrid = () => {
  const gridRef = useRef();
  useFrame((state) => {
    gridRef.current.rotation.x = -Math.PI / 2;
    gridRef.current.position.y = -3;
  });

  return (
    <mesh ref={gridRef}>
      <planeGeometry args={[40, 40, 40, 40]} />
      <meshStandardMaterial
        color="#915eff"
        wireframe
        opacity={0.08}
        transparent
      />
    </mesh>
  );
};

const HeroCanvas = () => (
  <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={3} color="#915eff" />
      <pointLight position={[-3, -3, 3]} intensity={2} color="#00d9ff" />
      <pointLight position={[0, -3, -3]} intensity={1} color="#ff6b35" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <FloatingBrain />
      <BackgroundGrid />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Suspense>
  </Canvas>
);

const TypewriterText = ({ words }) => {
  const [currentWord, setCurrentWord] = words.reduce ? [words[0], 0] : ["", 0];
  return <span className="gradient-text">{words[0]}</span>;
};

const Hero = () => {
  const roles = ["AI/ML Engineer", "Full-Stack Developer", "Edge AI Researcher", "Problem Solver"];
  const roleRef = useRef();
  const indexRef = useRef(0);

  useEffect(() => {
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    const type = () => {
      const current = roles[indexRef.current];
      if (!isDeleting) {
        charIndex++;
        if (roleRef.current) roleRef.current.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          isDeleting = true;
          timeout = setTimeout(type, 2000);
          return;
        }
      } else {
        charIndex--;
        if (roleRef.current) roleRef.current.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          indexRef.current = (indexRef.current + 1) % roles.length;
        }
      }
      timeout = setTimeout(type, isDeleting ? 50 : 100);
    };

    timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#050816]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0520] via-[#050816] to-[#020b15] z-0" />

      {/* Radial glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#915eff]/10 rounded-full blur-[100px] z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00d9ff]/10 rounded-full blur-[100px] z-0" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#ff6b35]/5 rounded-full blur-[80px] z-0 -translate-x-1/2 -translate-y-1/2" />

      {/* 3D Canvas - right side */}
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full z-10 opacity-80">
        <HeroCanvas />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#915eff]/10 border border-[#915eff]/30 rounded-full text-[#915eff] text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 bg-[#915eff] rounded-full animate-pulse" />
            Available for Opportunities
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-black text-white leading-tight mb-4"
          >
            Hi, I'm{" "}
            <span className="block">
              <span className="gradient-text">Sujal Kumar</span>
            </span>
            <span className="block">Sharma</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-[#aaa6c3] mb-6 h-10"
          >
            <span ref={roleRef} className="text-[#00d9ff]" />
            <span className="animate-pulse text-[#915eff]">|</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[#aaa6c3] text-lg leading-relaxed mb-8 max-w-xl"
          >
            Final-year B.Tech (AI & ML) student at SRM University AP. Building{" "}
            <span className="text-[#915eff] font-semibold">production-ready ML systems</span>,{" "}
            <span className="text-[#00d9ff] font-semibold">full-stack applications</span>, and{" "}
            <span className="text-[#ff6b35] font-semibold">Edge AI research</span> — selected for conference publication.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex gap-8 mb-10"
          >
            {[
              { value: "3+", label: "Projects" },
              { value: "7.95", label: "CGPA" },
              { value: "1", label: "Research Paper" },
              { value: "5+", label: "Certifications" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-black gradient-text">{stat.value}</p>
                <p className="text-[#aaa6c3] text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(145,94,255,0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#915eff] to-[#00d9ff] text-white font-bold rounded-2xl text-lg shadow-lg"
            >
              View My Work
            </motion.button>
            <motion.a
              href={gmailLink("Let's Connect")}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-[#915eff]/50 text-white font-bold rounded-2xl text-lg hover:bg-[#915eff]/10 hover:border-[#915eff] transition-all duration-300"
            >
              Contact Me
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex items-center gap-4 mt-10"
          >
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#915eff]/50 hover:bg-[#915eff]/10 transition-all duration-300"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#00d9ff]/50 hover:bg-[#00d9ff]/10 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href={gmailLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#ff6b35]/50 hover:bg-[#ff6b35]/10 transition-all duration-300"
              aria-label="Email"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[#aaa6c3] text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-[#915eff]/50 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1 h-3 bg-gradient-to-b from-[#915eff] to-transparent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
