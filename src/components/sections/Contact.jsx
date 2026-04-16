import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, OrbitControls, Stars } from "@react-three/drei";
import { socialLinks, gmailLink } from "../../constants";

const EarthGlobe = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <>
      <Sphere ref={meshRef} args={[1.8, 64, 64]}>
        <MeshDistortMaterial
          color="#0a2444"
          emissive="#00d9ff"
          emissiveIntensity={0.15}
          distort={0.15}
          speed={1.5}
          roughness={0.3}
          metalness={0.7}
        />
      </Sphere>
      {/* Glow rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={1} transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshStandardMaterial color="#915eff" emissive="#915eff" emissiveIntensity={0.8} transparent opacity={0.4} />
      </mesh>
    </>
  );
};

const ContactCanvas = () => (
  <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={3} color="#00d9ff" />
      <pointLight position={[-3, -3, 3]} intensity={2} color="#915eff" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      <EarthGlobe />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
    </Suspense>
  </Canvas>
);

const ContactLink = ({ icon, label, value, href, color, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ x: 8, scale: 1.02 }}
      className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/3 hover:bg-white/6 hover:border-white/20 transition-all duration-300 group"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-all duration-300 group-hover:scale-110"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        {icon}
      </div>
      <div>
        <p className="text-[#aaa6c3] text-xs uppercase tracking-wider">{label}</p>
        <p className="text-white font-semibold text-sm">{value}</p>
      </div>
      <div className="ml-auto text-[#aaa6c3] group-hover:text-white transition-colors">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </motion.a>
  );
};

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create mailto link as fallback
    const subject = `Portfolio Contact from ${formState.name}`;
    const body = `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`;
    window.open(gmailLink(subject, body), "_blank");
    setStatus("success");
    setTimeout(() => setStatus(null), 4000);
  };

  const contactInfo = [
    { icon: "📧", label: "Email", value: socialLinks.email, href: gmailLink(), color: "#915eff" },
    { icon: "📱", label: "Phone", value: socialLinks.phone, href: `tel:${socialLinks.phone}`, color: "#00d9ff" },
    { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/sujal-sharma-926a8a252", href: socialLinks.linkedin, color: "#0077b5" },
    { icon: "🐙", label: "GitHub", value: "github.com/Sujal-Sharma", href: socialLinks.github, color: "#6e40c9" },
  ];

  return (
    <section id="contact" className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050816 0%, #060d1a 100%)" }}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00d9ff] to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00d9ff]/2 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#00d9ff] text-sm font-medium tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Let's <span className="gradient-text-2">Connect</span>
          </h2>
          <p className="text-[#aaa6c3] text-lg max-w-2xl mx-auto">
            Whether you have a project in mind, a job opportunity, or just want to say hi —
            my inbox is always open!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00d9ff] to-[#915eff] mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Contact info + 3D Globe */}
          <div className="space-y-6">
            {/* 3D Globe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="h-[300px] relative mb-6"
            >
              <ContactCanvas />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="px-4 py-2 bg-[#00d9ff]/20 border border-[#00d9ff]/40 rounded-full text-[#00d9ff] text-sm font-bold backdrop-blur-sm"
                >
                  📍 SRM University AP, India
                </motion.div>
              </div>
            </motion.div>

            {/* Contact links */}
            <div className="space-y-3">
              {contactInfo.map((info, i) => (
                <ContactLink key={info.label} {...info} index={i} />
              ))}
            </div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 rounded-xl border border-[#00d9ff]/20 bg-[#00d9ff]/5 flex items-center gap-3"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0"
              />
              <p className="text-[#aaa6c3] text-sm">
                <span className="text-white font-semibold">Available for opportunities</span> — Full-time, Internships & Freelance
              </p>
            </motion.div>
          </div>

          {/* Right - Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl border border-white/10 bg-white/3 space-y-5">
              <h3 className="text-white font-black text-xl mb-2">Send a Message</h3>
              <p className="text-[#aaa6c3] text-sm mb-6">I'll get back to you within 24 hours.</p>

              <div>
                <label className="block text-[#aaa6c3] text-xs font-medium mb-2 uppercase tracking-wider">Your Name</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState(p => ({ ...p, name: e.target.value }))}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#aaa6c3]/50 outline-none focus:border-[#915eff]/50 focus:bg-white/8 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-[#aaa6c3] text-xs font-medium mb-2 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState(p => ({ ...p, email: e.target.value }))}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#aaa6c3]/50 outline-none focus:border-[#915eff]/50 focus:bg-white/8 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-[#aaa6c3] text-xs font-medium mb-2 uppercase tracking-wider">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState(p => ({ ...p, message: e.target.value }))}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-[#aaa6c3]/50 outline-none focus:border-[#915eff]/50 focus:bg-white/8 transition-all resize-none text-sm"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(145,94,255,0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-[#915eff] to-[#00d9ff] text-white font-bold rounded-xl text-base transition-all"
              >
                {status === "success" ? "✓ Message Sent!" : "Send Message →"}
              </motion.button>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-green-400 text-sm"
                >
                  Your email client has opened. Looking forward to hearing from you!
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
