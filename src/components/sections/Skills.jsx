import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { skills, certifications } from "../../constants";
import SkillsOrbCanvas from "../canvas/SkillsOrb";

const SkillBar = ({ skill, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-white text-sm font-medium group-hover:text-[#915eff] transition-colors">{skill.name}</span>
        <span className="text-[#aaa6c3] text-xs font-mono">{skill.level}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.07 + 0.3, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)` }}
        />
      </div>
    </motion.div>
  );
};

const CertCard = ({ cert, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.04, y: -4 }}
      className="p-4 rounded-xl border border-white/10 bg-white/3 hover:bg-white/5 transition-all duration-300 flex items-center gap-4"
      style={{ borderLeftColor: cert.color, borderLeftWidth: "3px" }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
      >
        {cert.icon}
      </div>
      <div>
        <p className="text-white font-semibold text-sm">{cert.name}</p>
        <p className="text-[#aaa6c3] text-xs">{cert.issuer}</p>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Languages");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const categories = Object.keys(skills);

  // Collect all skills for 3D orb
  const allSkills = Object.values(skills).flat();

  return (
    <section id="skills" className="relative py-24 bg-[#050816] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#915eff] to-transparent" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#00d9ff]/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#915eff]/5 rounded-full blur-[80px]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#915eff] text-sm font-medium tracking-widest uppercase mb-3">Technical Arsenal</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#915eff] to-[#00d9ff] mx-auto rounded-full" />
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
          {/* 3D Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="h-[420px] relative"
          >
            <SkillsOrbCanvas skills={allSkills} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 rounded-full bg-[#915eff]/10 border border-[#915eff]/20 flex items-center justify-center">
                <span className="text-3xl">⚡</span>
              </div>
            </div>
          </motion.div>

          {/* Skill bars */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-[#915eff] to-[#00d9ff] text-white shadow-lg"
                      : "border border-white/10 text-[#aaa6c3] hover:text-white hover:border-white/20 bg-white/3"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* Skill bars */}
            <div className="space-y-4">
              {skills[activeCategory]?.map((skill, i) => (
                <SkillBar key={`${activeCategory}-${skill.name}`} skill={skill} index={i} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-black text-white text-center mb-8">
            Certifications & <span className="gradient-text">Achievements</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <CertCard key={cert.name} cert={cert} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Tech tags cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-[#aaa6c3] text-sm mb-6 uppercase tracking-widest">Also familiar with</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Power BI", "Seaborn", "Matplotlib", "Jupyter", "Postman", "Socket.io", "Framer Motion", "Recharts", "Bull Queue", "Bloom Filters", "Lua Scripts", "JWT Auth"].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 text-[#aaa6c3] hover:text-white hover:border-[#915eff]/50 hover:bg-[#915eff]/10 transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
