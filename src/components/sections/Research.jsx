import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { research } from "../../constants";

const PipelineStep = ({ step, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="flex items-center gap-4"
    >
      {/* Step number */}
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#915eff] to-[#00d9ff] flex items-center justify-center text-2xl shadow-lg"
        style={{ boxShadow: "0 0 20px rgba(145,94,255,0.4)" }}>
        {step.icon}
      </div>
      {/* Arrow connector */}
      {index < research.pipeline.length - 1 && (
        <div className="hidden lg:block absolute left-6 mt-14 w-0.5 h-8 bg-gradient-to-b from-[#915eff] to-[#00d9ff]" />
      )}
      <div className="flex-1 p-4 rounded-xl border border-white/10 bg-white/3 hover:bg-white/5 transition-all duration-300">
        <h4 className="text-white font-bold text-sm mb-1">{step.step}</h4>
        <p className="text-[#aaa6c3] text-xs">{step.desc}</p>
      </div>
    </motion.div>
  );
};

const Research = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="research" className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050816 0%, #0a0520 50%, #050816 100%)" }}>
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff6b35] to-transparent" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#ff6b35]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#915eff]/5 rounded-full blur-[100px]" />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#915eff]"
          style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [-10, 10, -10], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#ff6b35] text-sm font-medium tracking-widest uppercase mb-3">Published Research</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Research <span className="gradient-text">Paper</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ff6b35] to-[#915eff] mx-auto rounded-full" />
        </motion.div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#ff6b35]/40 bg-[#ff6b35]/10">
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-3 h-3 bg-[#ff6b35] rounded-full"
            />
            <span className="text-[#ff6b35] font-bold">{research.status}</span>
          </div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Left - Paper info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Title card */}
            <div className="p-6 rounded-2xl border border-[#ff6b35]/20 bg-gradient-to-br from-[#ff6b35]/5 to-transparent mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📄</span>
                <span className="text-[#ff6b35] text-xs font-bold tracking-widest uppercase">Research Paper</span>
              </div>
              <h3 className="text-white font-black text-xl leading-tight mb-4">{research.title}</h3>
              <p className="text-[#aaa6c3] text-sm leading-relaxed">{research.abstract}</p>
            </div>

            {/* Key Findings */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/3">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="text-[#00d9ff]">✦</span> Key Findings
              </h4>
              <ul className="space-y-3">
                {research.keyFindings.map((finding, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-3 text-[#aaa6c3] text-sm"
                  >
                    <span className="text-[#915eff] mt-0.5 font-bold">→</span>
                    {finding}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right - Pipeline & Applications */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Edge AI Pipeline */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/3">
              <h4 className="text-white font-bold mb-5 flex items-center gap-2">
                <span className="text-[#ff6b35]">⚡</span> Edge AI Pipeline
              </h4>
              <div className="relative flex flex-col gap-3">
                {research.pipeline.map((step, i) => (
                  <PipelineStep key={step.step} step={step} index={i} />
                ))}
              </div>
            </div>

            {/* Applications */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/3">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="text-[#00d9ff]">🎯</span> Applications
              </h4>
              <div className="flex flex-wrap gap-2">
                {research.applications.map((app, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[#00d9ff]/30 text-[#00d9ff] bg-[#00d9ff]/10"
                  >
                    {app}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/3">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="text-[#915eff]">🔧</span> Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {research.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[#915eff]/30 text-[#915eff] bg-[#915eff]/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom impact section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: "⚡", label: "Latency", value: "Reduced", desc: "vs cloud solutions" },
            { icon: "🔒", label: "Privacy", value: "On-Device", desc: "no data transmission" },
            { icon: "💰", label: "Cost", value: "Low Cost", desc: "edge deployment" },
            { icon: "🌐", label: "Connectivity", value: "Offline", desc: "no internet required" },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent text-center"
            >
              <div className="text-3xl mb-2">{metric.icon}</div>
              <p className="text-white font-black text-lg">{metric.value}</p>
              <p className="text-[#915eff] font-semibold text-sm">{metric.label}</p>
              <p className="text-[#aaa6c3] text-xs mt-1">{metric.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Research;
