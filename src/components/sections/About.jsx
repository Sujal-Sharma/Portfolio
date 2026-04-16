import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { services, experiences, gmailLink } from "../../constants";
import FloatingSphere from "../canvas/FloatingSphere";

const ServiceCard = ({ service, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
      className="group relative p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm cursor-pointer overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"
        style={{ background: `radial-gradient(circle at 50% 50%, ${service.color}20, transparent 70%)` }}
      />

      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
      />

      <div className="relative z-10">
        <div
          className="text-4xl mb-4 w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}
        >
          {service.icon}
        </div>
        <h3 className="text-white font-bold text-lg mb-2">{service.title}</h3>
        <p className="text-[#aaa6c3] text-sm leading-relaxed">{service.description}</p>
      </div>

      {/* Bottom border animate */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
        style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
      />
    </motion.div>
  );
};

const TimelineItem = ({ exp, index, isLast }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`flex items-center gap-8 mb-8 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="inline-block p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm max-w-sm"
          style={{ boxShadow: `0 0 30px ${exp.color}10` }}
        >
          <div className="flex items-center gap-2 mb-2" style={{ justifyContent: isLeft ? "flex-end" : "flex-start" }}>
            <span className="text-xs px-2 py-1 rounded-full border" style={{ color: exp.color, borderColor: `${exp.color}40`, background: `${exp.color}10` }}>
              {exp.date}
            </span>
          </div>
          <h3 className="text-white font-bold text-lg">{exp.title}</h3>
          <p style={{ color: exp.color }} className="font-medium text-sm mb-3">{exp.company}</p>
          <ul className={`space-y-1 ${isLeft ? "text-right" : "text-left"}`}>
            {exp.description.map((desc, i) => (
              <li key={i} className="text-[#aaa6c3] text-xs flex items-start gap-1.5" style={{ justifyContent: isLeft ? "flex-end" : "flex-start" }}>
                <span style={{ color: exp.color }} className="mt-0.5">•</span>
                {desc}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Center dot */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-4 border-[#050816]"
          style={{ background: `linear-gradient(135deg, ${exp.color}, ${exp.color}80)`, boxShadow: `0 0 20px ${exp.color}60` }}
        >
          {exp.icon}
        </motion.div>
        {!isLast && <div className="w-0.5 h-16 mt-4" style={{ background: `linear-gradient(180deg, ${exp.color}, transparent)` }} />}
      </div>

      {/* Empty space for other side */}
      <div className="flex-1" />
    </motion.div>
  );
};

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="relative min-h-screen py-20 bg-[#050816] overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#915eff] to-transparent" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-[#915eff]/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-[#00d9ff]/5 rounded-full blur-[80px]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#915eff] text-sm font-medium tracking-widest uppercase mb-3">Introduction</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#915eff] to-[#00d9ff] mx-auto rounded-full" />
        </motion.div>

        {/* About content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* 3D Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="h-[400px] relative"
          >
            <FloatingSphere color1="#915eff" color2="#00d9ff" />
            {/* Floating labels */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute top-8 left-8 px-3 py-2 bg-[#915eff]/20 border border-[#915eff]/30 rounded-xl text-sm text-white font-medium backdrop-blur-sm"
            >
              🧠 AI/ML Expert
            </motion.div>
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ repeat: Infinity, duration: 3.5 }}
              className="absolute bottom-8 right-8 px-3 py-2 bg-[#00d9ff]/20 border border-[#00d9ff]/30 rounded-xl text-sm text-white font-medium backdrop-blur-sm"
            >
              ⚡ Full-Stack Dev
            </motion.div>
            <motion.div
              animate={{ y: [-3, 7, -3] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute top-1/2 right-4 px-3 py-2 bg-[#ff6b35]/20 border border-[#ff6b35]/30 rounded-xl text-sm text-white font-medium backdrop-blur-sm"
            >
              🔬 Researcher
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-black text-white mb-4">
              Turning AI Ideas into{" "}
              <span className="gradient-text">Reality</span>
            </h3>
            <p className="text-[#aaa6c3] leading-relaxed mb-6 text-base">
              I'm a passionate final-year B.Tech student at SRM University AP, specializing in
              Artificial Intelligence and Machine Learning. I love building systems that sit at the
              intersection of ML and engineering — from real-time analytics pipelines to Edge AI
              healthcare devices.
            </p>
            <p className="text-[#aaa6c3] leading-relaxed mb-8 text-base">
              My recent research on Edge AI for real-time patient health monitoring has been{" "}
              <span className="text-[#915eff] font-semibold">selected for conference publication</span>,
              reflecting my dedication to impactful, applied AI research.
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { label: "University", value: "SRM University AP" },
                { label: "CGPA", value: "7.95 / 10" },
                { label: "Graduation", value: "2026" },
                { label: "Location", value: "Andhra Pradesh, India" },
              ].map((fact) => (
                <div key={fact.label} className="flex flex-col p-3 rounded-xl border border-white/5 bg-white/2">
                  <span className="text-[#915eff] text-xs font-medium">{fact.label}</span>
                  <span className="text-white font-semibold text-sm">{fact.value}</span>
                </div>
              ))}
            </div>

            <motion.a
              href={gmailLink("Let's Connect")}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(145,94,255,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 bg-gradient-to-r from-[#915eff] to-[#00d9ff] text-white font-bold rounded-xl"
            >
              Let's Connect →
            </motion.a>
          </motion.div>
        </div>

        {/* What I Do */}
        <div className="mb-24">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-white text-center mb-10"
          >
            What I <span className="gradient-text">Do</span>
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-white text-center mb-12"
          >
            Education <span className="gradient-text">Journey</span>
          </motion.h3>
          <div className="relative">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={exp.title}
                exp={exp}
                index={index}
                isLast={index === experiences.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
