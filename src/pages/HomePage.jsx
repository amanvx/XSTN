// ============================================================
// HOME PAGE
// ============================================================

import { useState, useEffect, useRef } from "react";
import { useStats, useServices, useProjects } from "../hooks/useApi";
import {
  PageLoader, ErrorState, Section, StatCard, TechPill,
  RadialGlow, CardSkeleton,
} from "../components/UI";

// Typewriter hook
function useTypewriter(words, speed = 90, pause = 1600) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const word = words[wordIdx];
    let i = 0, forward = true;
    const tick = setInterval(() => {
      if (forward) {
        setDisplay(word.slice(0, ++i));
        if (i === word.length) { forward = false; clearInterval(tick); setTimeout(() => setWordIdx(p => (p + 1) % words.length), pause); }
      }
    }, speed);
    return () => clearInterval(tick);
  }, [wordIdx]);
  return display;
}

// Intersection observer hook for animation-on-scroll
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── HERO ─────────────────────────────────────────────────
const Hero = ({ setPage }) => {
  const typed = useTypewriter(["Innovate", "Execute", "Disrupt", "Build", "Scale"]);
  const techLine = ["React", "Node.js", "Python", "Flutter", "AWS", "Docker"];

  return (
    <section className="section grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 100, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
      <RadialGlow color="rgba(0,212,255,0.055)" size={900} top="10%" left="50%" />
      <RadialGlow color="rgba(180,79,255,0.05)" size={500} top="50%" right="-100px" />
      <RadialGlow color="rgba(0,255,159,0.03)" size={400} bottom="0" left="-80px" />

      <div className="container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>

          {/* LEFT */}
          <div>
            <div className="tag animate-fadeInUp mb-24" style={{ display: "inline-flex" }}>
              <span style={{ animation: "blink 1.4s infinite", color: "var(--neon-green)" }}>●</span>
              Student-Driven Tech Execution
            </div>

            <h1 className="animate-fadeInUp delay-100" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "clamp(2.4rem,4.8vw,4rem)", lineHeight: 1.1, letterSpacing: -1, marginBottom: 8 }}>
              We Build.<br />
              We{" "}
              <span className="glow-blue">{typed}</span>
              <span style={{ animation: "blink 1s infinite", color: "var(--neon-blue)" }}>_</span>
            </h1>
            <h1 className="animate-fadeInUp delay-200" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "clamp(2.4rem,4.8vw,4rem)", lineHeight: 1.1, letterSpacing: -1, color: "var(--text-muted)", marginBottom: 28 }}>
              We <span className="glow-purple">Deliver.</span>
            </h1>

            <p className="animate-fadeInUp delay-300" style={{ color: "var(--text-muted)", lineHeight: 1.85, maxWidth: 460, marginBottom: 40, fontSize: 15.5 }}>
              XSTN is the Xplorevo Student Tech Network — a student-powered IT company delivering enterprise-grade digital solutions with cutting-edge technology and real-world execution.
            </p>

            <div className="animate-fadeInUp delay-400" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="btn btn-primary btn-lg" onClick={() => { setPage("services"); window.scrollTo(0,0); }} data-hover>
                Explore Services →
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => { setPage("projects"); window.scrollTo(0,0); }} data-hover>
                View Projects
              </button>
            </div>

            <div className="animate-fadeInUp delay-500" style={{ display: "flex", gap: 20, marginTop: 44, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontFamily: "Fira Code", fontSize: 10, color: "var(--text-muted)", letterSpacing: 2, textTransform: "uppercase" }}>Stack:</span>
              {techLine.map(t => (
                <span key={t} style={{ fontFamily: "Fira Code", fontSize: 12, color: "var(--text-muted)", borderBottom: "1px solid rgba(0,212,255,0.28)", paddingBottom: 2 }}>{t}</span>
              ))}
            </div>
          </div>

          {/* RIGHT — Hero Visual */}
          <div className="hide-mobile animate-fadeInRight" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", height: 420 }}>
            <OrbitRings />
          </div>
        </div>
      </div>
    </section>
  );
};

const OrbitRings = () => (
  <div style={{ position: "relative", width: 380, height: 380 }}>
    {/* Outer ring */}
    <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(0,212,255,0.12)", borderRadius: "50%", animation: "rotate 22s linear infinite" }}>
      {[0,1,2,3].map(i => {
        const angle = (i * 90 * Math.PI) / 180;
        return <div key={i} style={{
          position: "absolute", width: 10, height: 10,
          background: "var(--neon-blue)", borderRadius: "50%",
          top: `${50 - 48.5 * Math.cos(angle)}%`, left: `${50 + 48.5 * Math.sin(angle)}%`,
          transform: "translate(-50%,-50%)", boxShadow: "0 0 12px rgba(0,212,255,0.8)",
        }} />;
      })}
    </div>
    {/* Middle ring */}
    <div style={{ position: "absolute", inset: 48, border: "1px solid rgba(180,79,255,0.15)", borderRadius: "50%", animation: "rotateRev 15s linear infinite" }}>
      {[0,1,2].map(i => {
        const angle = (i * 120 * Math.PI) / 180;
        return <div key={i} style={{
          position: "absolute", width: 8, height: 8,
          background: "var(--neon-purple)", borderRadius: "50%",
          top: `${50 - 48.5 * Math.cos(angle)}%`, left: `${50 + 48.5 * Math.sin(angle)}%`,
          transform: "translate(-50%,-50%)", boxShadow: "0 0 10px rgba(180,79,255,0.8)",
        }} />;
      })}
    </div>
    {/* Inner ring */}
    <div style={{ position: "absolute", inset: 96, border: "1px solid rgba(0,255,159,0.12)", borderRadius: "50%", animation: "rotate 10s linear infinite" }}>
      {[0,1].map(i => {
        const angle = (i * 180 * Math.PI) / 180;
        return <div key={i} style={{
          position: "absolute", width: 6, height: 6,
          background: "var(--neon-green)", borderRadius: "50%",
          top: `${50 - 48.5 * Math.cos(angle)}%`, left: `${50 + 48.5 * Math.sin(angle)}%`,
          transform: "translate(-50%,-50%)", boxShadow: "0 0 8px rgba(0,255,159,0.8)",
        }} />;
      })}
    </div>
    {/* Center */}
    <div className="animate-pulseGlow" style={{
      position: "absolute", inset: 136,
      background: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(180,79,255,0.1))",
      borderRadius: "50%", border: "1px solid rgba(0,212,255,0.3)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: 22, color: "var(--neon-blue)", textShadow: "0 0 24px rgba(0,212,255,0.9)" }}>XSTN</span>
    </div>
    {/* Floating labels */}
    {[
      { label: "React.js",  top: "4%",  left: "-8%" },
      { label: "Python AI", top: "4%",  right: "-8%", left: undefined },
      { label: "Node.js",   bottom: "10%", left: "-12%", top: undefined },
      { label: "Flutter",   bottom: "10%", right: "-8%", left: undefined, top: undefined },
    ].map((t, i) => (
      <div key={i} className="glass" style={{
        position: "absolute", ...t, padding: "6px 14px",
        fontSize: 11, fontFamily: "Fira Code", color: "var(--neon-blue)",
        animation: `float ${3 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.3}s`,
        whiteSpace: "nowrap",
      }}>
        {t.label}
      </div>
    ))}
  </div>
);

// ─── STATS BAND ───────────────────────────────────────────
const StatsBand = () => {
  const { data, loading, error } = useStats();
  const [ref, visible] = useInView(0.3);

  return (
    <div ref={ref} style={{ padding: "52px 0", background: "rgba(0,212,255,0.015)", borderTop: "1px solid rgba(0,212,255,0.07)", borderBottom: "1px solid rgba(0,212,255,0.07)" }}>
      <div className="container">
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
            {[0,1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 64, borderRadius: 4 }} />)}
          </div>
        ) : error ? (
          <ErrorState message={error} />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", gap: 32 }}>
            {data?.map((s, i) => (
              visible && <StatCard key={i} value={s.value} label={s.label} color={s.color} delay={i * 0.12} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── SERVICES PREVIEW ─────────────────────────────────────
const ServicesPreview = ({ setPage }) => {
  const { data, loading, error, refetch } = useServices();
  const [ref, visible] = useInView(0.1);

  return (
    <Section>
      <div className="container">
        <div className="section-header">
          <span className="section-label">// what we do</span>
          <h2 className="section-title">Our <span className="glow-blue">Services</span></h2>
          <p className="section-subtitle">End-to-end digital solutions delivered with enterprise-grade quality and student-driven innovation.</p>
        </div>
        <div ref={ref} className="grid-auto-2">
          {loading ? Array(6).fill(0).map((_, i) => <CardSkeleton key={i} />) :
           error   ? <div style={{ gridColumn: "1/-1" }}><ErrorState message={error} onRetry={refetch} /></div> :
           data?.slice(0, 6).map((s, i) => (
            <div key={s.id} className="glass card card-accent-top" style={{
              padding: 32, overflow: "hidden", position: "relative",
              animation: visible ? `fadeInUp 0.6s ease ${i * 0.08}s both` : "none",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
              <div style={{ fontSize: 28, color: s.color, marginBottom: 16, filter: `drop-shadow(0 0 8px ${s.color})` }}>{s.icon}</div>
              <h3 style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 15, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 13.5, lineHeight: 1.75, marginBottom: 16 }}>{s.shortDesc}</p>
              <span style={{ fontFamily: "Fira Code", fontSize: 10, color: s.color, opacity: 0.65 }}>{s.stack.split(" · ").slice(0,3).join(" · ")}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button className="btn btn-primary" onClick={() => { setPage("services"); window.scrollTo(0,0); }} data-hover>
            View All Services →
          </button>
        </div>
      </div>
    </Section>
  );
};

// ─── PROJECTS PREVIEW ─────────────────────────────────────
const ProjectsPreview = ({ setPage }) => {
  const { data, loading, error, refetch } = useProjects();
  const [ref, visible] = useInView(0.1);

  return (
    <Section style={{ background: "rgba(180,79,255,0.01)" }}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">// what we've built</span>
          <h2 className="section-title">Featured <span className="glow-purple">Projects</span></h2>
          <p className="section-subtitle">Real products. Real clients. Real impact. A glimpse at our portfolio.</p>
        </div>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 24 }}>
          {loading ? Array(3).fill(0).map((_, i) => <CardSkeleton key={i} />) :
           error   ? <div style={{ gridColumn: "1/-1" }}><ErrorState message={error} onRetry={refetch} /></div> :
           data?.slice(0, 3).map((p, i) => (
            <div key={p.id} className="glass card" style={{
              overflow: "hidden",
              animation: visible ? `fadeInUp 0.6s ease ${i * 0.12}s both` : "none",
            }}>
              <div style={{ height: 4, background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
              <div style={{ padding: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontFamily: "Fira Code", fontSize: 10, color: p.color, letterSpacing: 2 }}>[{p.category}]</span>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontFamily: "Fira Code", fontSize: 10, color: "var(--text-muted)" }}>{p.year}</span>
                    <span className={`badge ${p.status === "Live" ? "badge-live" : "badge-beta"}`}>
                      {p.status === "Live" ? "● LIVE" : "◐ BETA"}
                    </span>
                  </div>
                </div>
                <h3 style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 20, marginBottom: 12 }}>{p.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: 13.5, lineHeight: 1.75, marginBottom: 20 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {p.tags.map(t => <TechPill key={t} label={t} color={p.color} />)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button className="btn btn-secondary" onClick={() => { setPage("projects"); window.scrollTo(0,0); }} data-hover>
            Explore All Projects →
          </button>
        </div>
      </div>
    </Section>
  );
};

// ─── CTA SECTION ──────────────────────────────────────────
const CTASection = ({ setPage }) => (
  <Section>
    <div className="container">
      <div className="glass" style={{ padding: "80px 60px", textAlign: "center", position: "relative", overflow: "hidden", animation: "borderFlow 3s infinite" }}>
        <RadialGlow color="rgba(0,212,255,0.04)" size={700} top="50%" left="50%" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <span className="section-label" style={{ marginBottom: 16 }}>// ready to launch?</span>
          <h2 className="section-title" style={{ marginBottom: 18 }}>Have a Project in Mind?</h2>
          <p style={{ color: "var(--text-muted)", maxWidth: 500, margin: "0 auto 44px", lineHeight: 1.85, fontSize: 15.5 }}>
            Let's transform your idea into a world-class digital product. Our team is ready to execute from day one.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary btn-lg" onClick={() => { setPage("contact"); window.scrollTo(0,0); }} data-hover>
              Start a Project →
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => { setPage("join"); window.scrollTo(0,0); }} data-hover>
              Join the Network
            </button>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

// ─── WHY XSTN ─────────────────────────────────────────────
const WhySection = () => {
  const reasons = [
    { icon: "◉", title: "Real Projects", desc: "Every student works on live client deliverables — not toy projects.", color: "var(--neon-blue)" },
    { icon: "⬡", title: "Vetted Talent", desc: "Our network undergoes rigorous technical screening before joining.", color: "var(--neon-purple)" },
    { icon: "◈", title: "Fast Turnaround", desc: "Agile-first execution with weekly sprints and transparent updates.", color: "var(--neon-green)" },
    { icon: "⬟", title: "Cost-Effective", desc: "Enterprise quality at a fraction of the cost — fair for both sides.", color: "var(--neon-blue)" },
  ];
  const [ref, visible] = useInView(0.15);

  return (
    <Section style={{ background: "rgba(0,212,255,0.01)" }}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">// why choose us</span>
          <h2 className="section-title">Why <span className="glow-blue">XSTN?</span></h2>
        </div>
        <div ref={ref} className="grid-auto-2" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
          {reasons.map((r, i) => (
            <div key={i} className="glass card" style={{ padding: 36, animation: visible ? `fadeInUp 0.55s ease ${i * 0.1}s both` : "none" }}>
              <div style={{ fontSize: 32, color: r.color, marginBottom: 18, filter: `drop-shadow(0 0 10px ${r.color})` }}>{r.icon}</div>
              <h3 style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 15, marginBottom: 12, color: r.color }}>{r.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.75 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

// ─── HOME PAGE EXPORT ─────────────────────────────────────

// ── PDF Section 2: About Snapshot ─────────────────────────
const AboutSnapshot = ({ setPage }) => (
  <Section>
    <div className="container">
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center" }} className="two-col">
        <div>
          <span className="section-label" style={{ display:"block", marginBottom:14 }}>// about xstn</span>
          <h2 className="section-title">A Structured Tech<br/><span className="glow-blue">Execution Network</span></h2>
          <p style={{ color:"var(--text-muted)", lineHeight:1.9, marginBottom:16, fontSize:14.5 }}>XSTN (Xplorevo Student Tech Network) is a structured technology execution company focused on delivering scalable digital solutions.</p>
          <p style={{ color:"var(--text-muted)", lineHeight:1.9, marginBottom:20, fontSize:14.5 }}>We operate through a performance-driven execution model combining modern technology stacks, project governance, and agile workflows to ensure consistent delivery quality.</p>
          <div className="glass" style={{ padding:"20px 24px", borderLeft:"3px solid var(--neon-blue)", marginBottom:28 }}>
            <p style={{ fontFamily:"Orbitron", fontWeight:700, fontSize:14, color:"var(--text-primary)", lineHeight:1.6 }}>We don't just build websites.<br/><span className="glow-blue">We build systems that scale.</span></p>
          </div>
          <button className="btn btn-primary" onClick={() => { setPage("about"); window.scrollTo(0,0); }} data-hover>Our Story →</button>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {[{icon:"◎",title:"Vision",desc:"To build a next-generation tech execution ecosystem that delivers enterprise-grade digital products at scale.",color:"var(--neon-blue)"},{icon:"◉",title:"Mission",desc:"Deliver structured, scalable, and high-impact digital systems that transform how businesses operate.",color:"var(--neon-purple)"}].map((item,i)=>(
            <div key={i} className="glass card" style={{ padding:32 }}>
              <div style={{ display:"flex", gap:16, alignItems:"flex-start" }}>
                <div style={{ fontSize:28, color:item.color, flexShrink:0, filter:`drop-shadow(0 0 8px ${item.color})` }}>{item.icon}</div>
                <div><h3 style={{ fontFamily:"Orbitron", fontWeight:700, fontSize:14, color:item.color, marginBottom:8 }}>{item.title}</h3><p style={{ color:"var(--text-muted)", fontSize:13.5, lineHeight:1.75 }}>{item.desc}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

// ── PDF Section 3: What We Build ──────────────────────────
const WHAT_WE_BUILD = [
  { icon:"⬡", title:"Enterprise Websites",          desc:"High-performance, SEO-optimized sites built to represent your brand at scale." },
  { icon:"◈", title:"Custom Web Applications",      desc:"Full-stack applications engineered for complex business logic and high traffic." },
  { icon:"◉", title:"AI & Data Analytics Systems",  desc:"Intelligent systems and ML models that automate decisions and surface insights." },
  { icon:"⬟", title:"SaaS Platforms",               desc:"Multi-tenant SaaS products with billing, dashboards, and role-based access." },
  { icon:"◈", title:"Admin & Dashboard Systems",    desc:"Internal ops tools and control panels with real-time data and audit trails." },
  { icon:"⬡", title:"Game & Interactive Platforms", desc:"Engaging interactive experiences and game backends at any scale." },
  { icon:"◉", title:"Automation & API Integrations",desc:"Workflow automation and API ecosystems that eliminate manual operations." },
];
const WhatWeBuild = ({ setPage }) => (
  <Section style={{ background:"rgba(0,212,255,0.01)" }}>
    <div className="container">
      <div className="section-header"><span className="section-label">// solutions</span><h2 className="section-title">Solutions We <span className="glow-blue">Deliver</span></h2><p className="section-subtitle">Every solution is engineered with scalability, security, and performance at its core.</p></div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))", gap:18 }}>
        {WHAT_WE_BUILD.map((w,i)=>(
          <div key={i} className="glass card" style={{ padding:26, display:"flex", gap:14, alignItems:"flex-start" }}>
            <div style={{ fontSize:20, color:"var(--neon-blue)", flexShrink:0, marginTop:2 }}>{w.icon}</div>
            <div><div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7 }}><span style={{ color:"var(--neon-green)", fontSize:11 }}>✔</span><h3 style={{ fontFamily:"Orbitron", fontWeight:700, fontSize:12.5 }}>{w.title}</h3></div><p style={{ color:"var(--text-muted)", fontSize:12.5, lineHeight:1.7 }}>{w.desc}</p></div>
          </div>
        ))}
      </div>
      <div style={{ textAlign:"center", marginTop:40 }}><button className="btn btn-primary" onClick={() => { setPage("services"); window.scrollTo(0,0); }} data-hover>View All Services →</button></div>
    </div>
  </Section>
);

// ── PDF Section 4: Why Businesses Choose XSTN ─────────────
const WHY_TRUST = [
  { icon:"◉", title:"Structured Project Management",    desc:"Every project follows a defined governance framework with sprint reviews and documentation." },
  { icon:"⬡", title:"Defined Milestone-Based Delivery", desc:"Clear deliverable checkpoints with sign-off at every phase — no surprise changes." },
  { icon:"◈", title:"Modern Tech Stack",                desc:"React, Next.js, Node.js, AI integrations — we build with what actually scales." },
  { icon:"⬟", title:"Transparent Communication",        desc:"Dedicated project channels, weekly updates, and full access to progress dashboards." },
  { icon:"◉", title:"Performance Optimization Focus",   desc:"Every deployment is profiled, load-tested, and optimized before go-live." },
  { icon:"◈", title:"Long-Term Scalability Planning",   desc:"Architecture decisions made for where you're going, not just where you are." },
];
const WhyTrustXSTN = () => (
  <Section>
    <div className="container">
      <div className="section-header"><span className="section-label">// why xstn</span><h2 className="section-title">Why Businesses <span className="glow-purple">Choose XSTN</span></h2></div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:18, marginBottom:44 }}>
        {WHY_TRUST.map((w,i)=>(
          <div key={i} className="glass card" style={{ padding:26 }}>
            <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
              <span style={{ color:"var(--neon-green)", fontSize:14, flexShrink:0, marginTop:2 }}>✔</span>
              <div><h3 style={{ fontFamily:"Orbitron", fontWeight:700, fontSize:12.5, marginBottom:7 }}>{w.title}</h3><p style={{ color:"var(--text-muted)", fontSize:13, lineHeight:1.7 }}>{w.desc}</p></div>
            </div>
          </div>
        ))}
      </div>
      <div className="glass" style={{ padding:"22px 32px", textAlign:"center", borderLeft:"3px solid var(--neon-green)" }}>
        <p style={{ fontFamily:"Orbitron", fontWeight:700, fontSize:14, color:"var(--text-primary)" }}>We combine <span className="glow-green">execution discipline</span> with <span className="glow-blue">innovation speed.</span></p>
      </div>
    </div>
  </Section>
);

// ── PDF Section 5: Execution Advantage (Comparison Table) ─
const COMPARISON = [
  { agency:"High overhead costs",           xstn:"Lean execution structure"      },
  { agency:"Slow communication cycles",     xstn:"Fast response cycles"          },
  { agency:"Rigid development",             xstn:"Agile sprint model"            },
  { agency:"Expensive long-term contracts", xstn:"Flexible scalable engagement"  },
];
const ExecutionAdvantage = () => (
  <Section style={{ background:"rgba(180,79,255,0.01)" }}>
    <div className="container">
      <div className="section-header"><span className="section-label">// our edge</span><h2 className="section-title">Our Execution <span className="glow-blue">Advantage</span></h2></div>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div className="glass" style={{ overflow:"hidden" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
            {["Market Agencies","XSTN"].map((h,i)=>(
              <div key={i} style={{ padding:"16px 28px", background:i===0?"rgba(255,255,255,0.03)":"rgba(0,212,255,0.08)", borderBottom:`2px solid ${i===0?"rgba(255,255,255,0.08)":"var(--neon-blue)"}`, textAlign:"center" }}>
                <span style={{ fontFamily:"Orbitron", fontWeight:700, fontSize:13, color:i===0?"var(--text-muted)":"var(--neon-blue)" }}>{h}</span>
              </div>
            ))}
          </div>
          {COMPARISON.map((row,i)=>(
            <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ padding:"18px 28px", display:"flex", alignItems:"center", gap:10 }}><span style={{ color:"#ff4d6d", fontSize:11 }}>✗</span><span style={{ color:"var(--text-muted)", fontSize:13.5 }}>{row.agency}</span></div>
              <div style={{ padding:"18px 28px", display:"flex", alignItems:"center", gap:10, background:"rgba(0,212,255,0.03)" }}><span style={{ color:"var(--neon-green)", fontSize:11 }}>✔</span><span style={{ color:"var(--text-primary)", fontSize:13.5, fontWeight:500 }}>{row.xstn}</span></div>
            </div>
          ))}
        </div>
        <p style={{ color:"var(--text-muted)", fontSize:13.5, lineHeight:1.8, marginTop:24, textAlign:"center" }}>Our operational efficiency allows us to deliver enterprise-level quality with optimized cost structures — without compromising performance or scalability.</p>
      </div>
    </div>
  </Section>
);

// ── PDF Section 7: Testimonials ────────────────────────────
const MOCK_TESTIMONIALS_HOME = [
  { name:"Rajesh Kumar",    company:"RetailX Group",   type:"E-Commerce Platform", quote:"XSTN delivered our web platform with excellent structure and speed. Their project clarity and execution discipline exceeded expectations.", initials:"RK" },
  { name:"Meera Iyer",      company:"MedCore Systems", type:"Healthcare Software",  quote:"The HealthOS system transformed our hospital operations. XSTN's structured milestone delivery gave us complete confidence throughout.", initials:"MI" },
  { name:"Siddharth Joshi", company:"FinEdge Inc.",    type:"FinTech Platform",     quote:"Exceptional technical depth and communication. They built a payment system that handles peak loads flawlessly. Highly recommend XSTN.", initials:"SJ" },
];
const Testimonials = () => (
  <Section>
    <div className="container">
      <div className="section-header"><span className="section-label">// client feedback</span><h2 className="section-title">What Our Clients <span className="glow-purple">Say</span></h2></div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:22 }}>
        {MOCK_TESTIMONIALS_HOME.map((t,i)=>(
          <div key={i} className="glass card" style={{ padding:36, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,var(--neon-blue),transparent)" }}/>
            <div style={{ fontSize:48, color:"var(--neon-blue)", opacity:.08, fontFamily:"Georgia", lineHeight:1, position:"absolute", top:12, right:20 }}>"</div>
            <p style={{ color:"var(--text-secondary)", fontSize:14, lineHeight:1.85, marginBottom:24, fontStyle:"italic" }}>"{t.quote}"</p>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:44, height:44, background:"linear-gradient(135deg,var(--neon-blue),var(--neon-purple))", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Orbitron", fontWeight:900, color:"#000", fontSize:14 }}>{t.initials}</div>
              <div><div style={{ fontFamily:"Orbitron", fontWeight:700, fontSize:12 }}>{t.name}</div><div style={{ color:"var(--neon-blue)", fontSize:11, fontFamily:"Fira Code", marginTop:2 }}>{t.company}</div><div style={{ color:"var(--text-muted)", fontSize:10, fontFamily:"Fira Code" }}>{t.type}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

// ── PDF Section 8: Community CTA (professional tone) ──────
const CommunityCTA = ({ setPage }) => (
  <Section style={{ background:"rgba(0,212,255,0.01)" }}>
    <div className="container">
      <div className="glass" style={{ padding:"64px 52px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center" }} className="two-col">
        <div>
          <span className="section-label" style={{ display:"block", marginBottom:14 }}>// join the network</span>
          <h2 style={{ fontFamily:"Orbitron", fontWeight:900, fontSize:"clamp(1.6rem,3.5vw,2.4rem)", marginBottom:16 }}>Join the <span className="glow-blue">Network</span></h2>
          <p style={{ color:"var(--text-muted)", lineHeight:1.85, fontSize:14.5, marginBottom:28 }}>We collaborate with developers, designers, and innovators who want to build real-world technology solutions. Professional onboarding. Structured workflows. Real impact.</p>
          <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
            <button className="btn btn-primary" onClick={() => { setPage("join"); window.scrollTo(0,0); }} data-hover>Join as Developer</button>
            <button className="btn btn-secondary" onClick={() => { setPage("join"); window.scrollTo(0,0); }} data-hover>Explore Internship Program</button>
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {[{i:"◉",t:"Real Project Exposure",d:"Work on live client projects under supervised workflows"},{i:"⬡",t:"Structured Onboarding",d:"Defined selection process with performance-based progression"},{i:"◈",t:"Professional Development",d:"Mentorship, code reviews, and industry-standard practices"}].map((item,i)=>(
            <div key={i} className="glass" style={{ padding:"16px 20px", display:"flex", gap:12 }}>
              <span style={{ fontSize:18, color:"var(--neon-blue)", flexShrink:0 }}>{item.i}</span>
              <div><div style={{ fontWeight:600, fontSize:13, marginBottom:3 }}>{item.t}</div><div style={{ color:"var(--text-muted)", fontSize:12.5 }}>{item.d}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

// ── PDF Section 9: Final CTA ───────────────────────────────
const FinalCTA = ({ setPage }) => (
  <Section>
    <div className="container">
      <div className="glass" style={{ padding:"80px 52px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", width:600, height:600, background:"radial-gradient(circle,rgba(0,212,255,0.04),transparent 70%)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }}/>
        <div style={{ position:"relative", zIndex:1 }}>
          <span className="section-label" style={{ display:"block", marginBottom:14 }}>// let's build</span>
          <h2 style={{ fontFamily:"Orbitron", fontWeight:900, fontSize:"clamp(1.8rem,4vw,3rem)", marginBottom:18 }}>Let's Build Your Next<br/><span className="glow-blue">Digital Product</span></h2>
          <p style={{ color:"var(--text-muted)", maxWidth:500, margin:"0 auto 40px", lineHeight:1.85, fontSize:15 }}>Our optimized execution model allows us to deliver enterprise-grade solutions with efficient cost structures.</p>
          <button className="btn btn-primary btn-lg" onClick={() => { setPage("contact"); window.scrollTo(0,0); }} data-hover>Request Consultation →</button>
        </div>
      </div>
    </div>
  </Section>
);

// ── MAIN EXPORT (all 9 PDF sections) ──────────────────────
export function HomePage({ setPage }) {
  return (
    <>
      <Hero setPage={setPage} />
      <StatsBand />
      <AboutSnapshot setPage={setPage} />
      <WhatWeBuild setPage={setPage} />
      <WhyTrustXSTN />
      <ExecutionAdvantage />
      <ServicesPreview setPage={setPage} />
      <ProjectsPreview setPage={setPage} />
      <Testimonials />
      <CommunityCTA setPage={setPage} />
      <FinalCTA setPage={setPage} />
    </>
  );
}
