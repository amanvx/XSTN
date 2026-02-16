// ============================================================
// SERVICES PAGE — PDF content: 7 solution types,
// process steps, execution advantage
// ============================================================

import { useState } from "react";
import { useServices } from "../hooks/useApi";
import { Section, RadialGlow, CardSkeleton, ErrorState, Spinner } from "../components/UI";

const PROCESS = [
  { step: "01", title: "Discovery & Scoping",     desc: "Deep-dive into requirements, business goals, technical constraints, and success metrics." },
  { step: "02", title: "Architecture Design",     desc: "System design, tech stack selection, and project roadmap with defined milestones." },
  { step: "03", title: "Agile Development",       desc: "Sprint-based execution with weekly demos, code reviews, and continuous deployment." },
  { step: "04", title: "QA & Security Testing",   desc: "Comprehensive unit, integration, performance, and OWASP security audits." },
  { step: "05", title: "Deployment & Handoff",    desc: "Production deployment, documentation, and full source code ownership transfer." },
  { step: "06", title: "Post-Launch Support",     desc: "Monitoring, bug fixes, and optional maintenance retainer packages." },
];

export function ServicesPage({ setPage }) {
  const { data: services, loading, error, refetch } = useServices();
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      <Section className="grid-bg" style={{ overflow: "hidden" }}>
        <RadialGlow color="rgba(0,212,255,0.05)" size={700} top="10%" left="50%" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>

          <div className="section-header" style={{ marginBottom: 56 }}>
            <span className="section-label animate-fadeInUp">// what we deliver</span>
            <h1 className="section-title animate-fadeInUp delay-100" style={{ fontSize: "clamp(2rem,5vw,3.4rem)", marginBottom: 18 }}>
              Solutions We <span className="glow-blue">Deliver</span>
            </h1>
            <p className="section-subtitle animate-fadeInUp delay-200">
              Every solution is engineered with scalability, security, and performance at its core.
            </p>
          </div>

          {/* SERVICE ACCORDION */}
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {Array(4).fill(0).map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {services?.map((s, i) => (
                <div key={s.id} className="glass" style={{ overflow: "hidden", transition: "all 0.3s" }}>
                  <div
                    onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                    style={{ padding: "26px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", gap: 20 }}
                    data-hover
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ width: 48, height: 48, background: `${s.color}12`, border: `1px solid ${s.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: s.color, flexShrink: 0 }}>{s.icon}</div>
                      <div>
                        <h2 style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 17, marginBottom: 3, color: s.color }}>{s.title}</h2>
                        <p style={{ color: "var(--text-muted)", fontSize: 13 }}>{s.shortDesc}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div className="hide-mobile" style={{ display: "flex", gap: 7, flexWrap: "wrap", maxWidth: 320 }}>
                        {s.stack.split(" · ").slice(0, 3).map(t => (
                          <span key={t} style={{ padding: "3px 10px", background: `${s.color}12`, border: `1px solid ${s.color}28`, color: s.color, fontSize: 10, fontFamily: "Fira Code" }}>{t}</span>
                        ))}
                      </div>
                      <div style={{ width: 26, height: 26, border: `1px solid ${s.color}40`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, flexShrink: 0, transition: "transform 0.3s", transform: expanded === s.id ? "rotate(45deg)" : "rotate(0deg)" }}>+</div>
                    </div>
                  </div>

                  {expanded === s.id && (
                    <div style={{ padding: "0 36px 30px", borderTop: `1px solid ${s.color}15`, animation: "fadeInUp 0.3s ease both" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, marginTop: 24 }} className="two-col">
                        <div>
                          <p style={{ color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 16, fontSize: 14 }}>{s.fullDesc}</p>
                          <div style={{ fontFamily: "Fira Code", fontSize: 10, color: s.color, opacity: 0.6, padding: "8px 0", borderTop: `1px solid ${s.color}18` }}>
                            STACK: {s.stack}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontFamily: "Orbitron", fontSize: 10, color: "var(--text-muted)", letterSpacing: 2, marginBottom: 14, textTransform: "uppercase" }}>What's included</div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
                            {s.features.map((f, j) => (
                              <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 12.5, color: "var(--text-muted)" }}>
                                <span style={{ color: s.color, flexShrink: 0, fontSize: 9, marginTop: 3 }}>▸</span>{f}
                              </div>
                            ))}
                          </div>
                          <button className="btn btn-primary btn-sm" style={{ marginTop: 18 }} onClick={() => { setPage("contact"); window.scrollTo(0, 0); }} data-hover>
                            Get a Proposal →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: 28, fontSize: 13.5 }}>
            Every solution is engineered with scalability, security, and performance at its core.
          </p>
        </div>
      </Section>

      {/* PROCESS */}
      <Section style={{ background: "rgba(180,79,255,0.01)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">// our workflow</span>
            <h2 className="section-title">How We <span className="glow-purple">Execute</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
            {PROCESS.map((p, i) => (
              <div key={i} className="glass card" style={{ padding: "24px 28px", display: "flex", gap: 18, alignItems: "flex-start" }}>
                <div style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: 24, color: "var(--neon-blue)", opacity: 0.18, lineHeight: 1, flexShrink: 0 }}>{p.step}</div>
                <div>
                  <h3 style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 12.5, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 12.5, lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CUSTOM CTA */}
      <Section>
        <div className="container">
          <div className="glass" style={{ padding: "56px 52px", textAlign: "center" }}>
            <span className="section-label" style={{ marginBottom: 14 }}>// custom solutions</span>
            <h2 style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "clamp(1.5rem,3vw,2.2rem)", marginBottom: 16 }}>
              Need a <span className="glow-blue">Custom Solution?</span>
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.85, fontSize: 14.5 }}>
              Our optimized execution model allows us to deliver enterprise-grade solutions with efficient cost structures — built exactly to your requirements.
            </p>
            <button className="btn btn-primary btn-lg" onClick={() => { setPage("contact"); window.scrollTo(0, 0); }} data-hover>
              Request Consultation →
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
}
