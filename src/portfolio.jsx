import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];


function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

const SKILLS = [
  { name: "Python", level: 90, color: "#3776AB" },
  { name: "PyTorch", level: 82, color: "#EE4C2C" },
  { name: "Machine Learning", level: 85, color: "#38BDF8" },
  { name: "Federated Learning", level: 80, color: "#A78BFA" },
  { name: "React.js", level: 82, color: "#61DAFB" },
  { name: "Node.js", level: 75, color: "#68A063" },
  { name: "MongoDB", level: 70, color: "#4DB33D" },
  { name: "SQL", level: 75, color: "#F59E0B" },
];

const PROJECTS = [
  {
    title: "AI Portfolio Chatbot",
    desc: "An AI-powered version of me that lets recruiters explore my background through conversational, resume-grounded answers. Features streaming responses, conversation memory, job-description matching, and PDF resume parsing.",
    tags: [
      "Python",
      "FastAPI",
      "React",
      "Tailwind CSS",
      "Groq API",
      "Pydantic",
    ],
    color: "#A78BFA",
    icon: "🤖",
    link: "https://github.com/shahriar2711/Portfolio-AI",
    demo: "https://portfolio-ai-mocha-two.vercel.app/",
    year: "2026",
  },
  {
    title: "ICU Mortality Prediction Dashboard",
    desc: "A deployed Streamlit application for ICU mortality risk prediction using a trained BiLSTM model, with LIME-based explanations and federated training analytics.",
    tags: ["Python", "PyTorch", "Streamlit", "LIME", "Plotly"],
    color: "#38BDF8",
    icon: "🫀",
    link: "https://github.com/shahriar2711/icu-mortality-dashboard",
    demo: "https://icu-mortality-dashboard-9hcngbceubtej2dizahnxa.streamlit.app/",
    year: "2026",
  },
  {
    title: "LLM Resume Evaluator",
    desc: "An LLM-powered resume screening tool that evaluates candidate resumes against job descriptions using structured extraction and semantic matching.",
    tags: ["Python", "Groq API", "Pydantic", "LLMs"],
    color: "#A78BFA",
    icon: "📄",
    link: "https://github.com/shahriar2711/llm-resume-evaluator",
    year: "2026",
  },
  {
    title: "MediTrack",
    desc: "A full-stack healthcare platform with role-based dashboards, secure authentication, digital consultations, e-prescriptions, and patient history management.",
    tags: ["React.js", "Node.js", "MongoDB", "JWT"],
    color: "#22C55E",
    icon: "⚕",
    link: "https://github.com/shahriar2711/MediTrack",
    demo: "https://medi-track-pfqxu23p7-shahriar2711s-projects.vercel.app/",
    year: "2026",
  },
  {
    title: "StudyPlan",
    desc: "A MERN-based study management platform for organizing academic tasks, schedules, deadlines, and semester-wise progress.",
    tags: ["React.js", "Node.js", "MongoDB", "Firebase"],
    color: "#F59E0B",
    icon: "📚",
    link: "https://github.com/shahriar2711/Study-plan",
    year: "2025",
  },
];

const EXPERIENCE = [
  {
    role: "UI/UX Intern",
    company: "Reddot Digital",
    period: "2025",
    desc: "Designed and prototyped user interfaces using Figma in a collaborative team environment, contributing to real-world product design workflows and improving usability through structured design thinking.",
    link: "https://www.figma.com/design/3XXrD7yJ8A2sthKwgBeAyI/ResQ?node-id=7-2672&p=f&t=DyE3cf2lOC3njqYs-0",
  },
  {
    role: "Publication Secretary",
    company: "IEEE CS CUET Student Branch",
    period: "2025 – Present",
    desc: "Managing publications and technical content while collaborating with teams to organize events and promote student engagement in computer science activities.",
  },
  {
    role: "Deputy Finance Secretary",
    company: "CUET Computer Club",
    period: "2025 – Present",
    desc: "Assisting in financial planning, budgeting, and coordination of club activities while ensuring smooth execution of technical events.",
  },
  {
    role: "Joint Publication Secretary",
    company: "JOYODDHONEY, CUET",
    period: "2025 – Present",
    desc: "Contributing to content creation, publications, and communication strategies for organizational initiatives.",
  },
  {
    role: "Head of Logistics",
    company: "Hult Prize CUET",
    period: "2024 – 2025",
    desc: "Led logistics operations for large-scale events, coordinating teams and ensuring smooth execution of competition activities.",
  },
];

function useActiveSection() {
  const [active, setActive] = useState("About");
  useEffect(() => {
    const handler = () => {
      const sections = NAV_LINKS.map(n => document.getElementById(n.toLowerCase()));
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.getBoundingClientRect().top <= 120) {
          setActive(NAV_LINKS[i]);
          return;
        }
      }
      setActive("About");
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

function Noise() {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.4,
      }}
    />
  );
}

function GridBg() {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
  );
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY });
    const over = e => setHovered(!!e.target.closest("a,button,[data-hover]"));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);
  return (
    <>
      <motion.div animate={{ x: pos.x - 4, y: pos.y - 4, scale: hovered ? 1.5 : 1 }} transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{ position: "fixed", width: 8, height: 8, borderRadius: "50%", background: "#38BDF8", zIndex: 9999, pointerEvents: "none", top: 0, left: 0 }} />
      <motion.div animate={{ x: pos.x - 20, y: pos.y - 20, scale: hovered ? 1.5 : 1, opacity: hovered ? 0.6 : 0.2 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ position: "fixed", width: 40, height: 40, borderRadius: "50%", border: "1px solid #38BDF8", zIndex: 9998, pointerEvents: "none", top: 0, left: 0 }} />
    </>
  );
}


function Navbar() {
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 md:px-8 transition-all duration-300
        ${scrolled
          ? "backdrop-blur-xl bg-[#08080C]/85 border-b border-primary/10"
          : "bg-transparent"
        }`}
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
        className="font-mono text-primary font-bold tracking-widest cursor-pointer text-sm md:text-base"
      >
        {"<Atiq />"}
      </motion.div>

      {/* Nav Links (Desktop Only) */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => {
          const isActive = active === link;

          return (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`relative text-xs uppercase tracking-widest transition-all duration-200
                ${isActive
                  ? "text-primary font-semibold"
                  : "text-white/60 hover:text-white"
                }`}
            >
              {link}

              {isActive && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute left-0 right-0 -bottom-1 h-[1px] bg-primary"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </a>
          );
        })}
      </div>

      {/* Mobile Menu Placeholder */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white/70 text-xl"
      >
        {menuOpen ? "✕" : "☰"}
      </button>
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#08080C]/95 backdrop-blur-xl border-t border-white/10 flex flex-col items-center py-6 gap-6 md:hidden z-40">

          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-white/70 uppercase text-sm tracking-widest hover:text-primary transition"
            >
              {link}
            </a>
          ))}

        </div>
      )}
    </motion.nav>
  );
}


function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const op = useTransform(scrollY, [0, 400], [1, 0]);

  const roles = [
    "Frontend Developer",
    "AI Engineering Enthusiast",
    "AI/ML Researcher",
    "Problem Solver"
  ];

  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.section
      id="home"
      style={{
        y,
        opacity: op,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 3rem",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 900 }}>
        {/* Intro Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: "'Courier New', monospace",
            color: "#38BDF8",
            fontSize: 14,
            letterSpacing: 3,
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              width: 40,
              height: 1,
              background: "#38BDF8",
              display: "inline-block",
            }}
          />
          Hello, I'm
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            margin: 0,
            letterSpacing: -2,
            color: "#ffffff",
          }}
        >
          Atiq<br />
          <span
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.2)",
              color: "transparent",
            }}
          >
            Shahriar.
          </span>
        </motion.h1>

        {/* Animated Roles */}
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            margin: "16px 0 0",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                fontSize: "clamp(1.2rem, 3vw, 2rem)",
                fontWeight: 300,
                color: "#38BDF8",
                margin: 0,
                letterSpacing: -0.5,
              }}
            >
              {roles[roleIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          style={{
            fontSize: 17,
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.55)",
            maxWidth: 520,
            marginTop: 24,
          }}
        >
          I build AI-driven and software systems that connect machine learning research
          with practical applications. My interests include federated learning, NLP,
          LLMs, explainable AI, and full-stack development, with a focus on building
          useful and deployable solutions.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{
            display: "flex",
            gap: 16,
            marginTop: 40,
          }}
        >
          <motion.a
            whileHover={{ scale: 1.04, background: "#38BDF8", color: "#08080C" }}
            whileTap={{ scale: 0.97 }}
            href="#projects"
            style={{
              padding: "14px 32px",
              borderRadius: 8,
              background: "#38BDF8",
              color: "#08080C",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 1,
              textDecoration: "none",
              display: "inline-block",
              transition: "all 0.2s",
            }}
          >
            View Projects
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.04, borderColor: "rgba(56,189,248,0.6)" }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            style={{
              padding: "14px 32px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.7)",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 1,
              textDecoration: "none",
              display: "inline-block",
              transition: "all 0.2s",
            }}
          >
            Contact Me
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            display: "flex",
            gap: 24,
            marginTop: 56,
            alignItems: "center",
          }}
        >
          {[
            { name: "GitHub", link: "https://github.com/shahriar2711" },
            { name: "LinkedIn", link: "https://www.linkedin.com/in/atiq-shahriar-98604321b/" }
          ].map((s) => (
            <motion.a
              key={s.name}
              whileHover={{ color: "#38BDF8", y: -2 }}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: 12,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {s.name}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Background Text */}
      <div
        style={{
          position: "absolute",
          right: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          opacity: 0.06,
          fontSize: "22vw",
          fontWeight: 900,
          lineHeight: 1,
          color: "#38BDF8",
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: -10,
        }}
      >
        AS
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 1,
            height: 50,
            background:
              "linear-gradient(to bottom, transparent, rgba(56,189,248,0.5))",
          }}
        />
        <span
          style={{
            fontSize: 10,
            letterSpacing: 3,
            color: "rgba(255,255,255,0.25)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
      </motion.div>
    </motion.section>
  );
}

function SkillBar({ name, level, color, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)", letterSpacing: 1 }}>{name}</span>
        <span style={{ fontSize: 12, color: color, fontFamily: "'Courier New', monospace" }}>{level}%</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
        <motion.div initial={{ width: 0 }} animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ delay: index * 0.08, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: "100%", borderRadius: 4, background: color }} />
      </div>
    </div>
  );
}

function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        padding: isMobile ? "80px 1.5rem" : "120px 3rem",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <SectionHeader
        label="02. Skills"
        title="Technical Expertise"
        subtitle="Tools and technologies I use across AI, research, and software development."
      />

      {/* Skill Bars */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 40 : 80,
          marginTop: 60,
        }}
      >
        <div>
          {SKILLS.slice(0, 4).map((s, i) => (
            <SkillBar key={s.name} {...s} index={i} />
          ))}
        </div>
        <div>
          {SKILLS.slice(4).map((s, i) => (
            <SkillBar key={s.name} {...s} index={i + 4} />
          ))}
        </div>
      </div>

      {/* 🔹 Tech Tags (Reduced + Cleaner) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8 }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          marginTop: 80,
        }}
      >
        {[
          "PyTorch",
          "Transformers",
          "Explainable AI",
          "LLMs",
          "FastAPI",
          "Streamlit",
          "Git",
          "Firebase",
          "JWT",
        ].map((t) => (
          <span
            key={t}
            style={{
              padding: "8px 16px",
              borderRadius: 6,
              border: "1px solid rgba(56,189,248,0.15)",
              color: "rgba(255,255,255,0.55)",
              fontSize: 12,
              letterSpacing: 1,
              fontFamily: "'Courier New', monospace",
              whiteSpace: "nowrap",
            }}
          >
            {t}
          </span>
        ))}
      </motion.div>

      {/* 🔥 Problem Solving (Upgraded Visual) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1 }}
        style={{
          marginTop: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: "#38BDF8",
            letterSpacing: 2,
          }}
        >
          200+
        </div>

        <div
          style={{
            fontSize: 13,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
            marginTop: 6,
          }}
        >
          Problems Solved
        </div>

        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.5)",
            maxWidth: 500,
            marginTop: 12,
            lineHeight: 1.6,
          }}
        >
          Solved algorithmic problems on Codeforces and LeetCode, focusing on
          data structures, algorithms, and efficient problem-solving techniques.
        </p>

        <div style={{ display: "flex", gap: 24, marginTop: 16 }}>
          <motion.a
            whileHover={{ color: "#38BDF8", y: -2 }}
            href="https://codeforces.com/profile/atiqshahriar2001"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 12,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Codeforces ↗
          </motion.a>

          <motion.a
            whileHover={{ color: "#38BDF8", y: -2 }}
            href="https://leetcode.com/u/e2ipFO3eI3/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 12,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            LeetCode ↗
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (project.link) {
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
      data-hover
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${hovered ? project.color + "30" : "rgba(255,255,255,0.07)"
          }`,
        background: hovered
          ? "rgba(255,255,255,0.03)"
          : "rgba(255,255,255,0.02)",
        padding: "2rem",
        cursor: project.link ? "pointer" : "default",
        transition: "all 0.3s",
      }}
    >
      {/* Glow Effect */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at top left, ${project.color}08, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <motion.div
          animate={{
            color: hovered
              ? project.color
              : "rgba(255,255,255,0.15)",
            scale: hovered ? 1.1 : 1,
          }}
          style={{ fontSize: 28, transition: "all 0.3s" }}
        >
          {project.icon}
        </motion.div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: 2,
              fontFamily: "'Courier New', monospace",
            }}
          >
            {project.year}
          </span>

          {/* Click Icon */}
          {project.link && (
            <motion.span
              whileHover={{ x: 2, y: -2 }}
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.3)",
              }}
            >
              ↗
            </motion.span>
          )}
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#ffffff",
          margin: "0 0 10px",
          letterSpacing: -0.5,
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.45)",
          margin: "0 0 24px",
        }}
      >
        {project.desc}
      </p>

      {/* Project Links */}
      {(project.link || project.demo) && (
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 12px",
                borderRadius: 5,
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.65)",
                fontSize: 11,
                letterSpacing: 1,
                textDecoration: "none",
                fontFamily: "'Courier New', monospace",
                transition: "all 0.2s",
              }}
            >
              GitHub ↗
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 12px",
                borderRadius: 5,
                border: `1px solid ${project.color}40`,
                color: project.color,
                fontSize: 11,
                letterSpacing: 1,
                textDecoration: "none",
                fontFamily: "'Courier New', monospace",
                transition: "all 0.2s",
              }}
            >
              Live Demo ↗
            </a>
          )}
        </div>
      )}

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              padding: "4px 12px",
              borderRadius: 4,
              background: `${project.color}12`,
              color: project.color,
              fontSize: 11,
              letterSpacing: 1,
              fontWeight: 600,
              fontFamily: "'Courier New', monospace",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom Line Animation */}
      <motion.div
        animate={{ width: hovered ? "100%" : "0%" }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 1,
          background: project.color,
          transition: "width 0.4s ease",
        }}
      />
    </motion.div>
  );
}

function Projects() {
  const isMobile = useIsMobile();
  return (
    <section id="projects" style={{ padding: isMobile ? "80px 1.5rem" : "120px 3rem", maxWidth: 1200, margin: "0 auto" }}>
      <SectionHeader
        label="03. Projects"
        title="Selected Work"
        subtitle="AI, research, and software projects I've built and deployed."
      />
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 24, marginTop: 60 }}>
        {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
      </div>
    </section>
  );
}

function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();
  return (
    <section id="experience" ref={ref} style={{ padding: isMobile ? "80px 1.5rem" : "120px 3rem", maxWidth: 1200, margin: "0 auto" }}>
      <SectionHeader
        label="05. Experience"
        title="Experience"
        subtitle="Professional, leadership, and technical involvement."
      />
      <div style={{ marginTop: 60, position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, #38BDF8, transparent)" }} />
        {EXPERIENCE.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            onClick={() => exp.link && window.open(exp.link, "_blank")}
            style={{
              paddingLeft: 48,
              marginBottom: 56,
              position: "relative",
              cursor: exp.link ? "pointer" : "default",
            }}
          >
            <div style={{ position: "absolute", left: -5, top: 4, width: 11, height: 11, borderRadius: "50%", background: "#38BDF8", boxShadow: "0 0 12px #38BDF8" }} />
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#ffffff", margin: 0 }}>{exp.role}</h3>
              <span style={{ color: "#38BDF8", fontWeight: 600 }}>@ {exp.company}</span>
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: 2, fontFamily: "'Courier New', monospace", marginBottom: 14 }}>{exp.period}</div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.45)", margin: 0, maxWidth: 600 }}>{exp.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const isMobile = useIsMobile();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");

    try {
      await emailjs.send(
        "service_st6ok6e",
        "template_2ykyko8",
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "hTk5uei2CIKYloIfB"
      );

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });

    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{ padding: isMobile ? "80px 1.5rem" : "120px 3rem", maxWidth: 1200, margin: "0 auto" }}
    >
      <SectionHeader
        label="05. Contact"
        title="Get In Touch"
        subtitle="Open to internships, collaborations, and opportunities."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 40 : 80,
          marginTop: 60,
        }}
      >
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.9,
              color: "rgba(255,255,255,0.5)",
              marginBottom: 40,
            }}
          >
            I'm always open to discussing new opportunities, collaborating on
            interesting projects, or just having a conversation about technology
            and ideas.
          </p>

          {[
            ["Email", "atiqshahriar2001@gmail.com"],
            ["Location", "Chittagong, Bangladesh"],
            ["Availability", "Open to AI/ML, Software Engineering & Research Opportunities"],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                display: "flex",
                gap: 24,
                marginBottom: 20,
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  minWidth: 90,
                  paddingTop: 2,
                }}
              >
                {k}
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                {v}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Right Side (Form) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 16,
              }}
            >
              <div style={{ fontSize: 48 }}>✦</div>
              <p
                style={{
                  color: "#38BDF8",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                Message Sent!
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: 14,
                }}
              >
                I'll get back to you soon.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              {[
                ["Name", "text", "name", "Your name"],
                ["Email", "email", "email", "your@email.com"],
              ].map(([label, type, field, placeholder]) => (
                <div key={field}>
                  <label
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.3)",
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    {label}
                  </label>

                  <input
                    type={type}
                    value={form[field]}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, [field]: e.target.value }))
                    }
                    placeholder={placeholder}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      color: "#ffffff",
                      fontSize: 14,
                      outline: "none",
                    }}
                  />
                </div>
              ))}

              <div>
                <label
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Message
                </label>

                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder="Tell me about your project..."
                  rows={5}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    color: "#ffffff",
                    fontSize: 14,
                    outline: "none",
                    resize: "vertical",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                disabled={status === "sending"}
                style={{
                  padding: "14px",
                  borderRadius: 8,
                  background: "#38BDF8",
                  color: "#08080C",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 1,
                  border: "none",
                  cursor: "pointer",
                  marginTop: 4,
                }}
              >
                {status === "sending"
                  ? "Sending..."
                  : "Send Message →"}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeader({ label, title, subtitle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
      <div style={{ fontFamily: "'Courier New', monospace", color: "#38BDF8", fontSize: 12, letterSpacing: 3, marginBottom: 12, textTransform: "uppercase" }}>{label}</div>
      <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#ffffff", margin: "0 0 12px", letterSpacing: -1 }}>{title}</h2>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.35)", margin: 0 }}>{subtitle}</p>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontFamily: "'Courier New', monospace", color: "rgba(255,255,255,0.2)", fontSize: 12 }}>{"<atiq.shahriar />"}</span>
      <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>Designed & Built by Atiq Shahriar · 2026</span>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <div style={{ background: "#08080C", minHeight: "100vh", color: "#ffffff", fontFamily: "'Inter', -apple-system, sans-serif", overflowX: "hidden" }}>
      <Cursor />
      <GridBg />
      <Noise />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
