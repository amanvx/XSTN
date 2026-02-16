// ============================================================
// XSTN SHARED UI COMPONENTS
// ============================================================

import { useState, useEffect, useRef } from "react";

// ─── CUSTOM CURSOR ────────────────────────────────────────
export const Cursor = () => {
  const dot  = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (dot.current)  { dot.current.style.left  = e.clientX + "px"; dot.current.style.top  = e.clientY + "px"; }
      if (ring.current) { ring.current.style.left = e.clientX + "px"; ring.current.style.top = e.clientY + "px"; }
    };
    const onEnter = () => { dot.current?.classList.add("cursor--hover"); ring.current?.classList.add("cursor-ring--hover"); };
    const onLeave = () => { dot.current?.classList.remove("cursor--hover"); ring.current?.classList.remove("cursor-ring--hover"); };
    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("button,a,[data-hover]").forEach(el => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });
    return () => { window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <>
      <div ref={dot}  className="cursor" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
};

// ─── PARTICLES ────────────────────────────────────────────
export const Particles = ({ count = 22 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 14}s`,
    duration: `${9 + Math.random() * 10}s`,
    size: `${1.5 + Math.random() * 3}px`,
    drift: `${(Math.random() - 0.5) * 160}px`,
    color: i % 3 === 0 ? "rgba(0,212,255,0.55)" : i % 3 === 1 ? "rgba(180,79,255,0.5)" : "rgba(0,255,159,0.4)",
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {particles.map((p) => (
        <div key={p.id} style={{
          position: "absolute", left: p.left, bottom: "-6px",
          width: p.size, height: p.size, borderRadius: "50%",
          background: p.color, boxShadow: `0 0 6px ${p.color}`,
          "--drift": p.drift,
          animation: `particleUp ${p.duration} ${p.delay} infinite linear`,
        }} />
      ))}
    </div>
  );
};

// ─── NAVBAR ───────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Home",           page: "home"     },
  { label: "About",          page: "about"    },
  { label: "Services",       page: "services" },
  { label: "Projects",       page: "projects" },
  { label: "Partner With Us",page: "partner"  },
  { label: "Join Network",   page: "join"     },
  { label: "Contact",        page: "contact"  },
];

export const Navbar = ({ activePage, setPage }) => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const go = (page) => { setPage(page); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      height: "var(--nav-height)",
      background: scrolled ? "rgba(3,7,18,0.94)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,212,255,0.1)" : "1px solid transparent",
      transition: "all 0.4s ease",
      display: "flex", alignItems: "center",
    }}>
      <div className="container" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* LOGO */}
        <div onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} data-hover>
          <svg width="30" height="30" viewBox="0 0 30 30">
            <polygon points="15,2 28,9 28,21 15,28 2,21 2,9"
              fill="url(#logoGrad)" style={{ filter: "drop-shadow(0 0 6px rgba(0,212,255,0.6))" }} />
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#b44fff" />
              </linearGradient>
            </defs>
            <text x="15" y="20" textAnchor="middle" fill="#000" fontFamily="Orbitron" fontWeight="900" fontSize="10">X</text>
          </svg>
          <span style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: 17, letterSpacing: 2 }}>
            <span style={{ color: "var(--neon-blue)" }}>XS</span><span>TN</span>
          </span>
        </div>

        {/* DESKTOP NAV */}
        <div className="hide-mobile" style={{ display: "flex", gap: 28 }}>
          {NAV_ITEMS.map((item) => (
            <span key={item.page} data-hover onClick={() => go(item.page)} style={{
              fontFamily: "Fira Code", fontSize: 12, fontWeight: 500,
              letterSpacing: "1.2px", textTransform: "uppercase",
              color: activePage === item.page ? "var(--neon-blue)" : "var(--text-muted)",
              cursor: "pointer", transition: "color 0.3s ease",
              borderBottom: activePage === item.page ? "1px solid var(--neon-blue)" : "1px solid transparent",
              paddingBottom: 2,
            }}
              onMouseEnter={e => { if (activePage !== item.page) e.target.style.color = "var(--text-primary)"; }}
              onMouseLeave={e => { if (activePage !== item.page) e.target.style.color = "var(--text-muted)"; }}>
              {item.label}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button className="btn btn-primary btn-sm hide-mobile" onClick={() => go("contact")} data-hover>
          Join Network
        </button>

        {/* HAMBURGER */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "1px solid rgba(0,212,255,0.25)",
          padding: "8px 10px", cursor: "pointer", flexDirection: "column", gap: 4,
        }} id="hamburger">
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: "block", width: 20, height: 1.5,
              background: "var(--neon-blue)",
              transition: "all 0.3s ease",
              transform: menuOpen && i === 0 ? "translateY(5.5px) rotate(45deg)" :
                         menuOpen && i === 2 ? "translateY(-5.5px) rotate(-45deg)" : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "rgba(3,7,18,0.98)", borderBottom: "1px solid rgba(0,212,255,0.15)",
          padding: "24px 28px", display: "flex", flexDirection: "column", gap: 4,
        }}>
          {NAV_ITEMS.map((item) => (
            <span key={item.page} onClick={() => go(item.page)} style={{
              fontFamily: "Fira Code", fontSize: 14, color: activePage === item.page ? "var(--neon-blue)" : "var(--text-muted)",
              cursor: "pointer", padding: "12px 0",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}>
              {activePage === item.page ? "▸ " : "  "}{item.label}
            </span>
          ))}
          <button className="btn btn-primary mt-16" onClick={() => go("join")}>Get a Proposal</button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) { #hamburger { display: flex !important; } }
      `}</style>
    </nav>
  );
};

// ─── FOOTER ───────────────────────────────────────────────
export const Footer = ({ setPage }) => {
  const go = (page) => { setPage(page); window.scrollTo({ top: 0 }); };
  const year = new Date().getFullYear();

  const cols = [
    { title: "Platform", color: "var(--neon-blue)", links: [
      { label: "Home", page: "home" }, { label: "About Us", page: "about" },
      { label: "Services", page: "services" }, { label: "Projects", page: "projects" },
    ]},
    { title: "Community", color: "var(--neon-purple)", links: [
      { label: "Join XSTN", page: "join" }, { label: "Partner With Us", page: "partner" },
      { label: "Contact", page: "contact" },
    ]},
  ];

  const stack = ["React.js","Next.js","Node.js","Python","Flutter","AWS","PostgreSQL","MongoDB","Docker","TensorFlow"];

  return (
    <footer style={{ borderTop: "1px solid rgba(0,212,255,0.08)", paddingTop: 64, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 60%, rgba(0,212,255,0.015))", pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <svg width="28" height="28" viewBox="0 0 30 30">
                <polygon points="15,2 28,9 28,21 15,28 2,21 2,9" fill="url(#footLogoGrad)" />
                <defs>
                  <linearGradient id="footLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d4ff" /><stop offset="100%" stopColor="#b44fff" />
                  </linearGradient>
                </defs>
                <text x="15" y="20" textAnchor="middle" fill="#000" fontFamily="Orbitron" fontWeight="900" fontSize="10">X</text>
              </svg>
              <span style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: 16 }}>
                <span style={{ color: "var(--neon-blue)" }}>XS</span><span>TN</span>
              </span>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.9, maxWidth: 260, marginBottom: 24 }}>
              Xplorevo Student Tech Network — student-powered execution delivering enterprise-grade digital solutions worldwide.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {["GH", "LI", "TW", "DS"].map((s) => (
                <div key={s} data-hover style={{
                  width: 32, height: 32, border: "1px solid rgba(0,212,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "Fira Code", fontSize: 10, color: "var(--text-muted)",
                  cursor: "pointer", transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--neon-blue)"; e.currentTarget.style.color = "var(--neon-blue)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.2)"; e.currentTarget.style.color = "var(--text-muted)"; }}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {cols.map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 12, color: col.color, marginBottom: 20, letterSpacing: 1 }}>
                {col.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map(l => (
                  <span key={l.page} onClick={() => go(l.page)} data-hover style={{
                    fontFamily: "Fira Code", fontSize: 13, color: "var(--text-muted)",
                    cursor: "pointer", transition: "color 0.25s",
                  }}
                    onMouseEnter={e => e.target.style.color = "var(--text-primary)"}
                    onMouseLeave={e => e.target.style.color = "var(--text-muted)"}>
                    {l.label}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Stack */}
          <div>
            <div style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 12, color: "var(--neon-green)", marginBottom: 20, letterSpacing: 1 }}>
              Tech Stack
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {stack.map(t => (
                <span key={t} style={{
                  fontFamily: "Fira Code", fontSize: 10, color: "var(--text-muted)",
                  padding: "2px 8px", border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="divider" style={{ marginBottom: 28 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, paddingBottom: 32 }}>
          <span style={{ fontFamily: "Fira Code", fontSize: 12, color: "var(--text-muted)" }}>
            © {year} XSTN – Xplorevo Student Tech Network. All rights reserved.
          </span>
          <span style={{ fontFamily: "Fira Code", fontSize: 12, color: "var(--neon-blue)", opacity: 0.7 }}>
            Built by students. Powered by passion.
          </span>
        </div>
      </div>
    </footer>
  );
};

// ─── SKELETON ─────────────────────────────────────────────
export const Skeleton = ({ width = "100%", height = 20, style = {} }) => (
  <div className="skeleton" style={{ width, height, ...style }} />
);

export const CardSkeleton = () => (
  <div className="glass" style={{ padding: 28 }}>
    <Skeleton height={16} width="60%" style={{ marginBottom: 16 }} />
    <Skeleton height={24} style={{ marginBottom: 12 }} />
    <Skeleton height={14} style={{ marginBottom: 8 }} />
    <Skeleton height={14} width="80%" style={{ marginBottom: 20 }} />
    <div style={{ display: "flex", gap: 8 }}>
      <Skeleton height={22} width={60} />
      <Skeleton height={22} width={60} />
      <Skeleton height={22} width={60} />
    </div>
  </div>
);

// ─── LOADING SPINNER ──────────────────────────────────────
export const Spinner = ({ size = 32, color = "var(--neon-blue)" }) => (
  <div style={{
    width: size, height: size,
    border: `2px solid rgba(255,255,255,0.05)`,
    borderTop: `2px solid ${color}`,
    borderRadius: "50%",
    animation: "rotate 0.8s linear infinite",
  }} />
);

export const PageLoader = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 16 }}>
    <Spinner size={40} />
    <span style={{ fontFamily: "Fira Code", fontSize: 12, color: "var(--text-muted)", letterSpacing: 2 }}>
      LOADING...
    </span>
  </div>
);

// ─── ERROR STATE ──────────────────────────────────────────
export const ErrorState = ({ message = "Something went wrong.", onRetry }) => (
  <div style={{ textAlign: "center", padding: "60px 20px" }}>
    <div style={{ fontSize: 40, marginBottom: 16, color: "#ff4d6d" }}>◈</div>
    <p style={{ color: "#ff6b87", marginBottom: 20, fontFamily: "Fira Code", fontSize: 14 }}>{message}</p>
    {onRetry && (
      <button className="btn btn-ghost" onClick={onRetry}>↺ Retry</button>
    )}
  </div>
);

// ─── EMPTY STATE ──────────────────────────────────────────
export const EmptyState = ({ message = "No results found." }) => (
  <div style={{ textAlign: "center", padding: "60px 20px" }}>
    <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.3 }}>◉</div>
    <p style={{ color: "var(--text-muted)", fontFamily: "Fira Code", fontSize: 14 }}>{message}</p>
  </div>
);

// ─── SUCCESS SCREEN ───────────────────────────────────────
export const SuccessScreen = ({ title, subtitle, detail, onReset }) => (
  <div style={{ textAlign: "center", padding: "80px 20px", animation: "scaleIn 0.5s ease both" }}>
    <div style={{ fontSize: 64, color: "var(--neon-green)", marginBottom: 24, animation: "float 3s ease-in-out infinite" }}>◉</div>
    <h2 style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "clamp(1.6rem,4vw,2.4rem)", color: "var(--neon-green)", marginBottom: 14, textShadow: "0 0 24px rgba(0,255,159,0.6)" }}>
      {title}
    </h2>
    <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 480, margin: "0 auto 20px", lineHeight: 1.8 }}>{subtitle}</p>
    {detail && (
      <div className="glass" style={{ display: "inline-block", padding: "10px 24px", marginBottom: 32 }}>
        <span style={{ fontFamily: "Fira Code", fontSize: 12, color: "var(--neon-blue)" }}>{detail}</span>
      </div>
    )}
    {onReset && (
      <div style={{ marginTop: 8 }}>
        <button className="btn btn-ghost" onClick={onReset}>← Go Back</button>
      </div>
    )}
  </div>
);

// ─── SECTION WRAPPER ──────────────────────────────────────
export const Section = ({ children, className = "", id, bg, style = {} }) => (
  <section id={id} className={`section ${className}`} style={{ background: bg, ...style }}>
    {children}
  </section>
);

// ─── STAT CARD ────────────────────────────────────────────
export const StatCard = ({ value, label, color, delay = 0 }) => (
  <div style={{ textAlign: "center", animation: `countUp 0.6s ease ${delay}s both` }}>
    <div style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "clamp(2rem,4vw,2.8rem)", color, textShadow: `0 0 20px ${color}` }}>
      {value}
    </div>
    <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 6, letterSpacing: 0.5 }}>{label}</div>
  </div>
);

// ─── FILTER BAR ───────────────────────────────────────────
export const FilterBar = ({ options, active, onChange }) => (
  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
    {options.map((opt) => (
      <button key={opt} onClick={() => onChange(opt)} data-hover style={{
        padding: "8px 18px",
        fontFamily: "Fira Code", fontSize: 11, letterSpacing: 1, textTransform: "uppercase",
        cursor: "pointer", transition: "all 0.25s ease",
        background: active === opt ? "var(--neon-blue)" : "transparent",
        border: `1px solid ${active === opt ? "var(--neon-blue)" : "rgba(0,212,255,0.2)"}`,
        color: active === opt ? "#000" : "var(--text-muted)",
        clipPath: "polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%)",
      }}>
        {opt}
      </button>
    ))}
  </div>
);

// ─── TECH STACK PILL ──────────────────────────────────────
export const TechPill = ({ label, color = "var(--neon-blue)" }) => (
  <span style={{
    padding: "3px 10px",
    background: `${color}12`,
    border: `1px solid ${color}28`,
    color, fontSize: 11,
    fontFamily: "Fira Code",
  }}>
    {label}
  </span>
);

// ─── GLOW DIVIDER ─────────────────────────────────────────
export const GlowDivider = ({ color = "var(--neon-blue)" }) => (
  <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${color}44, transparent)` }} />
);

// ─── RADIAL GLOW BG ───────────────────────────────────────
export const RadialGlow = ({ color = "rgba(0,212,255,0.06)", size = 700, top, left, right, bottom }) => (
  <div style={{
    position: "absolute", width: size, height: size, pointerEvents: "none",
    background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
    top, left, right, bottom,
    transform: left === "50%" ? "translateX(-50%)" : undefined,
    zIndex: 0,
  }} />
);

export default {
  Cursor,
  Particles,
  Navbar,
  Footer,
  Skeleton,
  CardSkeleton,
  Spinner,
  PageLoader,
  ErrorState,
  EmptyState,
  SuccessScreen,
  Section,
  StatCard,
  FilterBar,
  TechPill,
  GlowDivider,
  RadialGlow,
};
