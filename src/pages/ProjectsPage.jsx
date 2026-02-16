// ============================================================
// PROJECTS PAGE — Selected Work with category filter
// ============================================================

import { useState } from "react";
import { useProjects } from "../hooks/useApi";
import { Section, RadialGlow, CardSkeleton, ErrorState, FilterBar } from "../components/UI";

const CATEGORIES = ["All", "FinTech", "HealthTech", "EdTech", "E-Commerce", "SaaS", "AI/ML"];

export function ProjectsPage({ setPage }) {
  const { data, loading, error, refetch } = useProjects();
  const [filter, setFilter] = useState("All");

  const filtered = !data ? [] : filter === "All" ? data : data.filter(p => p.category === filter);

  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      <Section className="grid-bg">
        <RadialGlow color="rgba(180,79,255,0.05)" size={700} top="10%" left="50%" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>

          <div className="section-header" style={{ marginBottom: 44 }}>
            <span className="section-label animate-fadeInUp">// selected work</span>
            <h1 className="section-title animate-fadeInUp delay-100" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", marginBottom: 18 }}>
              Selected <span className="glow-blue">Work</span>
            </h1>
            <p className="section-subtitle animate-fadeInUp delay-200">
              Delivered with defined milestones, measurable outcomes, and full technical documentation.
            </p>
          </div>

          {/* FILTERS */}
          <div style={{ marginBottom: 44 }}>
            <FilterBar options={CATEGORIES} active={filter} onChange={setFilter} />
          </div>

          {/* GRID */}
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 22 }}>
              {Array(6).fill(0).map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 22 }}>
              {filtered.length === 0 ? (
                <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "var(--text-muted)", fontFamily: "Fira Code", fontSize: 13 }}>
                  No {filter} projects found.
                </div>
              ) : filtered.map((p, i) => (
                <div key={p.id} className="glass card" style={{ overflow: "hidden", animation: `fadeInUp 0.5s ease ${i * 0.06}s both` }}>
                  <div style={{ height: 4, background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
                  <div style={{ padding: 30 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ fontFamily: "Fira Code", fontSize: 10, color: p.color, letterSpacing: 2 }}>[{p.category}]</span>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontFamily: "Fira Code", fontSize: 10, color: "var(--text-muted)" }}>{p.year}</span>
                        <span className={`badge ${p.status === "Live" ? "badge-live" : "badge-beta"}`}>
                          {p.status === "Live" ? "● LIVE" : "◐ BETA"}
                        </span>
                      </div>
                    </div>
                    <h3 style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 19, marginBottom: 10 }}>{p.title}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.75, marginBottom: 14 }}>{p.description}</p>

                    {/* Impact */}
                    <div className="glass" style={{ padding: "8px 14px", marginBottom: 16, display: "inline-flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: "var(--neon-green)", fontSize: 11 }}>▸</span>
                      <span style={{ fontFamily: "Fira Code", fontSize: 11, color: "var(--neon-green)" }}>{p.impact}</span>
                    </div>

                    {/* Tags */}
                    <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 16 }}>
                      {p.tags.map(t => (
                        <span key={t} style={{ padding: "3px 10px", background: `${p.color}12`, border: `1px solid ${p.color}28`, color: p.color, fontSize: 10, fontFamily: "Fira Code" }}>{t}</span>
                      ))}
                    </div>

                    {/* Meta */}
                    <div style={{ display: "flex", gap: 20, paddingTop: 14, borderTop: `1px solid ${p.color}15` }}>
                      {[{ l: "Client", v: p.client }, { l: "Duration", v: p.duration }, { l: "Team", v: `${p.team} devs` }].map(d => (
                        <div key={d.l}>
                          <div style={{ fontFamily: "Fira Code", fontSize: 9, color: "var(--text-muted)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>{d.l}</div>
                          <div style={{ fontFamily: "Fira Code", fontSize: 11, color: p.color }}>{d.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: 60 }}>
            <p style={{ color: "var(--text-muted)", marginBottom: 18, fontSize: 14 }}>Ready to be our next case study?</p>
            <button className="btn btn-primary btn-lg" onClick={() => { setPage("contact"); window.scrollTo(0, 0); }} data-hover>
              Request a Proposal →
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
}
