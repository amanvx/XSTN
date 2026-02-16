// ============================================================
// ABOUT PAGE — PDF content: Who We Are, Vision, Mission,
// Founder Message, Team
// ============================================================

import { useTeam } from "../hooks/useApi";
import { Section, RadialGlow, CardSkeleton, ErrorState } from "../components/UI";

export function AboutPage({ setPage }) {
  const { data: team, loading, error, refetch } = useTeam();

  const coreValues = [
    { icon: "◉", title: "Structured Execution", desc: "Every project follows a defined governance framework with sprint reviews and full documentation at each milestone.", color: "var(--neon-blue)" },
    { icon: "⬡", title: "Zero Compromise",      desc: "We maintain uncompromising quality standards across every deliverable — code quality, design precision, and deadline adherence.", color: "var(--neon-purple)" },
    { icon: "◈", title: "Future-First Stack",   desc: "We build with technologies that scale — not just what works today, but what performs at enterprise load tomorrow.", color: "var(--neon-green)" },
    { icon: "⬟", title: "Performance-Driven",   desc: "Every team member is selected and evaluated on execution quality. Accountability and delivery are core to our culture.", color: "var(--neon-blue)" },
  ];

  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>

      {/* HERO */}
      <Section className="grid-bg" style={{ overflow: "hidden" }}>
        <RadialGlow color="rgba(180,79,255,0.06)" size={600} top="20%" left="60%" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <span className="section-label animate-fadeInUp">// who we are</span>
            <h1 className="animate-fadeInUp delay-100" style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "clamp(2rem,5vw,3.6rem)", lineHeight: 1.1, marginBottom: 24 }}>
              Who <span className="glow-blue">We Are</span>
            </h1>
            <p className="animate-fadeInUp delay-200" style={{ color: "var(--text-muted)", lineHeight: 1.9, fontSize: 15, marginBottom: 16 }}>
              XSTN is a performance-driven technology execution network structured to deliver scalable digital products across industries.
            </p>
            <p className="animate-fadeInUp delay-300" style={{ color: "var(--text-muted)", lineHeight: 1.9, fontSize: 15 }}>
              We operate at the intersection of structured project governance and modern engineering — combining agile execution with enterprise-grade quality standards.
            </p>
          </div>
        </div>
      </Section>

      {/* VISION & MISSION */}
      <Section>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }} className="two-col">
            {[
              { label: "Vision",  icon: "◎", color: "var(--neon-blue)",   text: "To build a next-generation tech execution ecosystem that empowers structured development teams to deliver world-class digital solutions at scale." },
              { label: "Mission", icon: "◉", color: "var(--neon-purple)", text: "Deliver structured, scalable, and high-impact digital systems — combining execution discipline with modern engineering practices to ensure consistent, measurable outcomes." },
            ].map((item, i) => (
              <div key={i} className="glass card" style={{ padding: 44 }}>
                <div style={{ fontSize: 34, color: item.color, marginBottom: 16, filter: `drop-shadow(0 0 12px ${item.color})` }}>{item.icon}</div>
                <h2 style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 19, marginBottom: 14, color: item.color }}>{item.label}</h2>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.9, fontSize: 14 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FOUNDER MESSAGE */}
      <Section style={{ background: "rgba(0,212,255,0.01)" }}>
        <div className="container">
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <div className="section-header" style={{ marginBottom: 36 }}>
              <span className="section-label">// founder message</span>
            </div>
            <div className="glass" style={{ padding: "48px 52px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "linear-gradient(180deg, var(--neon-blue), var(--neon-purple))" }} />
              <div style={{ fontSize: 72, color: "var(--neon-blue)", opacity: 0.1, fontFamily: "Georgia", lineHeight: 1, position: "absolute", top: 12, right: 32 }}>"</div>
              <p style={{ color: "var(--text-primary)", lineHeight: 2, fontSize: 15.5, marginBottom: 32, fontStyle: "italic", position: "relative", zIndex: 1 }}>
                "XSTN was built to prove that structured execution, modern technology, and disciplined project management are not exclusive to large agencies. We built a network that operates with the same rigor — and delivers results that speak for themselves. Our model is our product."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 46, height: 46, background: "linear-gradient(135deg, var(--neon-blue), var(--neon-purple))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Orbitron", fontWeight: 900, color: "#000", fontSize: 18 }}>A</div>
                <div>
                  <div style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 13 }}>Arjun Mehta</div>
                  <div style={{ color: "var(--neon-blue)", fontSize: 11, fontFamily: "Fira Code", marginTop: 2 }}>Founder & CEO, XSTN | Xplorevo Pvt Ltd</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CORE VALUES */}
      <Section>
        <div className="container">
          <div className="section-header">
            <span className="section-label">// core values</span>
            <h2 className="section-title">What Drives <span className="glow-blue">Our Work</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            {coreValues.map((v, i) => (
              <div key={i} className="glass card" style={{ padding: 32 }}>
                <div style={{ fontSize: 28, color: v.color, marginBottom: 16, filter: `drop-shadow(0 0 8px ${v.color})` }}>{v.icon}</div>
                <h3 style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 13, marginBottom: 10, color: v.color }}>{v.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.75 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* TEAM */}
      <Section style={{ background: "rgba(180,79,255,0.01)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">// execution team</span>
            <h2 className="section-title">The People <span className="glow-blue">Behind XSTN</span></h2>
          </div>
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 20 }}>
              {Array(6).fill(0).map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 20 }}>
              {team?.map((m, i) => (
                <div key={m.id} className="glass card" style={{ padding: 28, textAlign: "center", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${m.color}, transparent)` }} />
                  <div style={{ width: 64, height: 64, background: `linear-gradient(135deg, ${m.color}20, ${m.color}40)`, border: `1px solid ${m.color}40`, borderRadius: "50%", margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Orbitron", fontWeight: 900, fontSize: 22, color: m.color }}>{m.avatar}</div>
                  <h3 style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 12, marginBottom: 5 }}>{m.name}</h3>
                  <div style={{ color: m.color, fontSize: 11, fontFamily: "Fira Code", marginBottom: 14 }}>{m.role}</div>
                  <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
                    {m.skills.map(s => (
                      <span key={s} style={{ padding: "3px 8px", background: `${m.color}12`, border: `1px solid ${m.color}28`, color: m.color, fontSize: 10, fontFamily: "Fira Code" }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="container">
          <div className="glass" style={{ padding: "64px 52px", textAlign: "center" }}>
            <span className="section-label" style={{ marginBottom: 14 }}>// work with us</span>
            <h2 style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", marginBottom: 18 }}>
              Ready to <span className="glow-blue">Build Together?</span>
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.85, fontSize: 14.5 }}>
              Our optimized execution model delivers enterprise-grade solutions with efficient cost structures.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn btn-primary btn-lg" onClick={() => { setPage("contact"); window.scrollTo(0, 0); }} data-hover>Request Consultation →</button>
              <button className="btn btn-secondary btn-lg" onClick={() => { setPage("join"); window.scrollTo(0, 0); }} data-hover>Join the Network</button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
