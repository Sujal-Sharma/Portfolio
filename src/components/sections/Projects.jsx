import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects, gmailLink } from "../../constants";

const StatBadge = ({ label, value }) => (
  <div className="flex flex-col items-center p-2 rounded-lg bg-white/5 border border-white/10">
    <span className="text-white font-bold text-sm">{value}</span>
    <span className="text-[#aaa6c3] text-xs">{label}</span>
  </div>
);

const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group relative"
    >
      {/* Card */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1a0e2e] to-[#0a0515] hover:border-white/20 transition-all duration-500">
        {/* Top gradient bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`} />

        {/* Header */}
        <div className={`relative p-6 bg-gradient-to-br ${project.gradient} opacity-90`}>
          <div className="flex items-start justify-between">
            <div className="text-6xl">{project.icon}</div>
            <div className="flex gap-2">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="w-9 h-9 rounded-xl bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </motion.a>
              )}
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="w-9 h-9 rounded-xl bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </motion.a>
              )}
            </div>
          </div>
          <h3 className="text-white font-black text-2xl mt-4">{project.name}</h3>

          {/* Stats */}
          <div className="flex gap-2 mt-3">
            {Object.entries(project.stats).map(([key, val]) => (
              <div key={key} className="px-2 py-1 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10">
                <span className="text-white text-xs font-semibold">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Highlight */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-white/5 border border-white/5 mb-4">
            <span className="text-[#00d9ff] mt-0.5">✦</span>
            <p className="text-[#00d9ff] text-sm font-medium">{project.highlight}</p>
          </div>

          <p className="text-[#aaa6c3] text-sm leading-relaxed mb-5">{project.description}</p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium rounded-lg border border-white/10 text-[#aaa6c3] bg-white/5 hover:text-white hover:border-white/20 transition-all"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(145,94,255,0.05) 0%, transparent 60%)"
          }}
        />
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" className="relative py-24 bg-[#050816] overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00d9ff] to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#915eff]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#00d9ff] text-sm font-medium tracking-widest uppercase mb-3">My Work</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Featured <span className="gradient-text-2">Projects</span>
          </h2>
          <p className="text-[#aaa6c3] text-lg max-w-2xl mx-auto">
            Production-ready applications built with modern tech stacks, real-world use cases, and measurable outcomes.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00d9ff] to-[#915eff] mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-[#aaa6c3] mb-6">More projects coming soon. Want to collaborate?</p>
          <motion.a
            href={gmailLink("Project Collaboration")}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 217, 255, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-4 bg-gradient-to-r from-[#00d9ff] to-[#915eff] text-white font-bold rounded-2xl text-lg"
          >
            Let's Build Together →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
