export const navLinks = [
  { id: "about", title: "About" },
  { id: "projects", title: "Projects" },
  { id: "research", title: "Research" },
  { id: "skills", title: "Skills" },
  { id: "contact", title: "Contact" },
];

export const services = [
  {
    title: "AI/ML Engineer",
    icon: "🧠",
    description: "Building production-ready ML systems with TensorFlow, PyTorch, and Scikit-learn",
    color: "#915eff",
  },
  {
    title: "Full-Stack Developer",
    icon: "⚡",
    description: "Crafting scalable web applications with React, Node.js, and cloud infrastructure",
    color: "#00d9ff",
  },
  {
    title: "Edge AI Researcher",
    icon: "🔬",
    description: "Pioneering on-device ML for real-time healthcare monitoring systems",
    color: "#ff6b35",
  },
  {
    title: "DevOps & Cloud",
    icon: "☁️",
    description: "Deploying with Docker, GitHub Actions CI/CD, and AWS infrastructure",
    color: "#4ecdc4",
  },
];

export const experiences = [
  {
    title: "B.Tech - AI & ML",
    company: "SRM University AP",
    date: "2022 - 2026",
    description: [
      "CGPA: 7.95",
      "Specializing in Artificial Intelligence and Machine Learning",
      "Working on Edge AI and real-time healthcare monitoring research",
      "NPTEL Proud Pinnacle Topper – Sustainable Development",
    ],
    icon: "🎓",
    color: "#915eff",
  },
  {
    title: "Higher Secondary (Class XII)",
    company: "FIITJEE International",
    date: "2020 - 2022",
    description: [
      "Focused on Physics, Chemistry, Mathematics",
      "Prepared for engineering entrance examinations",
      "Strong foundation in analytical problem-solving",
    ],
    icon: "📚",
    color: "#00d9ff",
  },
  {
    title: "Secondary (Class X)",
    company: "Atkinson High School",
    date: "2020",
    description: [
      "Completed secondary education",
      "Developed foundational academic skills",
    ],
    icon: "🏫",
    color: "#ff6b35",
  },
];

export const projects = [
  {
    name: "Hire AI",
    description:
      "Full-stack AI-powered interview preparation platform with voice-based mock interviews (Vapi), ATS checker, resume improver, resume builder, Q&A tools, and company-specific interview question banks with solutions. Built with Next.js, Firebase, and Groq.",
    tags: ["Next.js", "Firebase", "Groq", "Vapi", "React", "TypeScript"],
    image: null,
    demo: "https://ai-interview-ten-khaki.vercel.app/",
    github: "https://github.com/Sujal-Sharma/AI-INTERVIEW",
    highlight: "End-to-end interview prep: voice AI mock interviews + resume tools + question banks",
    gradient: "from-purple-600 via-violet-600 to-indigo-600",
    icon: "🤖",
    stats: { voice: "Vapi AI", resume: "ATS+Builder", prep: "End-to-end" },
  },
  {
    name: "LinkPulse",
    description:
      "URL shortener with sub-10ms redirect pipeline using Redis caching, Bloom filters, and async Bull queues. Real-time analytics with Socket.io and geographic tracking.",
    tags: ["Node.js", "Express", "MongoDB", "Redis", "Socket.io", "React", "Docker", "GitHub Actions"],
    image: null,
    demo: "https://link-pulse-pi.vercel.app/",
    github: "https://github.com/Sujal-Sharma/LinkPulse",
    highlight: "<10ms redirect latency with >95% cache hit rate",
    gradient: "from-cyan-500 via-blue-600 to-purple-600",
    icon: "🔗",
    stats: { latency: "<10ms", cache: ">95%", pipeline: "Async" },
  },
  {
    name: "Digital Noticeboard",
    description:
      "Role-based notice management system with secure auth, CRUD operations, and XSS mitigation. Centralized institutional notice distribution with controlled access.",
    tags: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Bootstrap"],
    image: null,
    demo: null,
    github: "https://github.com/Sujal-Sharma/Digital_Noticeboard",
    highlight: "Secure, role-separated, auditable notice management system",
    gradient: "from-orange-500 via-red-500 to-pink-600",
    icon: "📋",
    stats: { auth: "Session-based", roles: "Multi-role", security: "XSS-safe" },
  },
];

export const skills = {
  "Languages": [
    { name: "Python", level: 92, color: "#3776AB" },
    { name: "JavaScript", level: 88, color: "#F7DF1E" },
    { name: "C/C++", level: 80, color: "#00599C" },
    { name: "Java", level: 75, color: "#ED8B00" },
    { name: "SQL", level: 85, color: "#4479A1" },
    { name: "PHP", level: 72, color: "#777BB4" },
  ],
  "AI/ML": [
    { name: "TensorFlow", level: 88, color: "#FF6F00" },
    { name: "PyTorch", level: 82, color: "#EE4C2C" },
    { name: "Scikit-learn", level: 90, color: "#F7931E" },
    { name: "CNNs/RNNs", level: 85, color: "#915eff" },
    { name: "NumPy/Pandas", level: 92, color: "#013243" },
  ],
  "Backend": [
    { name: "Node.js", level: 88, color: "#339933" },
    { name: "Express.js", level: 85, color: "#000000" },
    { name: "MongoDB", level: 82, color: "#47A248" },
    { name: "Redis", level: 78, color: "#DC382D" },
    { name: "REST APIs", level: 90, color: "#00d9ff" },
  ],
  "Frontend": [
    { name: "React", level: 88, color: "#61DAFB" },
    { name: "Next.js", level: 82, color: "#000000" },
    { name: "Three.js", level: 70, color: "#000000" },
    { name: "Framer Motion", level: 75, color: "#0055FF" },
    { name: "TailwindCSS", level: 88, color: "#06B6D4" },
  ],
  "DevOps": [
    { name: "Docker", level: 80, color: "#2496ED" },
    { name: "GitHub Actions", level: 82, color: "#2088FF" },
    { name: "AWS", level: 72, color: "#FF9900" },
    { name: "Git", level: 90, color: "#F05032" },
    { name: "Postman", level: 85, color: "#FF6C37" },
  ],
};

export const certifications = [
  { name: "AWS Fundamentals", issuer: "Amazon Web Services", color: "#FF9900", icon: "☁️" },
  { name: "E-Business Certification", issuer: "NPTEL", color: "#915eff", icon: "📊" },
  { name: "Web Development Fundamentals", issuer: "IBM SkillsBuild", color: "#0F62FE", icon: "🌐" },
  { name: "Job Application Essentials", issuer: "IBM SkillsBuild", color: "#0F62FE", icon: "💼" },
  { name: "NPTEL Proud Pinnacle Topper", issuer: "Sustainable Development", color: "#00d9ff", icon: "🏆" },
];

export const research = {
  title: "Real-Time Patient Health Monitoring Using Edge AI",
  status: "Selected for Conference - Publishing Soon",
  abstract: "Modern healthcare systems are transitioning toward distributed technologies. This research presents a real-time health monitoring system that performs all calculations on an edge device without cloud dependency. Patient data including heart rate, temperature, and SpO2 sensor readings are processed through an on-board pipeline with ML-based analysis.",
  keyFindings: [
    "Reduced latency vs cloud-based solutions",
    "Enhanced patient data privacy - no external server transmission",
    "Comparable accuracy to cloud ML models",
    "Cost-effective edge deployment on Raspberry Pi",
    "Real-time anomaly detection with instant alerts",
  ],
  technologies: ["Edge AI", "Raspberry Pi", "Machine Learning", "TensorFlow Lite", "IoT Sensors", "Python"],
  applications: [
    "In-home patient monitoring",
    "Elderly care systems",
    "Rural healthcare",
    "Telemedicine environments",
    "Post-surgery recovery monitoring",
  ],
  pipeline: [
    { step: "Data Acquisition", desc: "Heart rate, SpO2, temperature sensors", icon: "📡" },
    { step: "Data Cleaning", desc: "Noise removal and signal preprocessing", icon: "🔧" },
    { step: "Feature Extraction", desc: "Meaningful feature derivation from raw signals", icon: "⚙️" },
    { step: "ML Inference", desc: "Lightweight models for on-device classification", icon: "🧠" },
    { step: "Alert System", desc: "Real-time anomaly detection and notification", icon: "🚨" },
  ],
};

export const socialLinks = {
  github: "https://github.com/Sujal-Sharma",
  linkedin: "https://www.linkedin.com/in/sujal-sharma-926a8a252/",
  email: "sharmaofficial2004@gmail.com",
  phone: "+91 9290300600",
};

export const gmailLink = (subject = "", body = "") => {
  const to = "sharmaofficial2004@gmail.com";
  const params = new URLSearchParams();
  if (subject) params.set("su", subject);
  if (body) params.set("body", body);
  const qs = params.toString();
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}${qs ? "&" + qs : ""}`;
};
