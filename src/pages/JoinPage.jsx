// ============================================================
// JOIN NETWORK PAGE — PDF: Professional tone, no "student club"
// Sections: Application Process, Selection Criteria,
//           Execution Model, Code of Conduct
// ============================================================

import { useDeveloperApp } from "../hooks/useApi";
import { useForm } from "../hooks/useForm";
import { Section, RadialGlow, SuccessScreen, Spinner } from "../components/UI";

const ROLES = [
  "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "Mobile Developer", "AI/ML Engineer", "UI/UX Designer",
  "DevOps Engineer", "Cybersecurity Analyst",
];

const CRITERIA = [
  { icon: "◉", title: "Application Process",  color: "var(--neon-blue)",   desc: "Submit your profile with GitHub/portfolio, skills assessment, and a brief on what you want to build. We review every application personally." },
  { icon: "⬡", title: "Selection Criteria",   color: "var(--neon-purple)", desc: "We onboard developers who demonstrate technical competence, professional communication, and commitment to delivery standards." },
  { icon: "◈", title: "Execution Model",       color: "var(--neon-green)",  desc: "Accepted members are placed into structured project teams with defined roles, sprint schedules, and code review workflows." },
  { icon: "⬟", title: "Code of Conduct",       color: "var(--neon-blue)",   desc: "Every network member operates under our professional standards — deadline commitment, quality ownership, and transparent communication." },
];

export function JoinPage() {
  const { mutate, loading, error, success, response, reset: resetMutation } = useDeveloperApp();
  const { values, errors, handleChange, validate, reset } = useForm(
    { name: "", email: "", college: "", role: "", skills: "", github: "", linkedin: "", message: "" },
    {
      name:    v => v.length < 2 ? "Full name is required." : null,
      email:   v => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Enter a valid email address." : null,
      role:    v => !v ? "Please select your specialization." : null,
      skills:  v => !v.trim() ? "List your primary skills." : null,
      message: v => v.length < 30 ? "Tell us more about yourself (min 30 chars)." : null,
    }
  );

  const handleSubmit = async (e) => { e.preventDefault(); if (!validate()) return; await mutate(values); };

  const handleReset = () => { reset(); resetMutation(); };

  if (success) return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "80vh", display: "flex", alignItems: "center" }}>
      <div className="container">
        <SuccessScreen
          title="Application Received"
          subtitle={`Thank you, ${values.name}. Your profile is under review. We'll respond within 3–5 business days with next steps.`}
          detail={`✓ Application ID: ${response?.data?.id}`}
          onReset={handleReset}
        />
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      <Section className="grid-bg" style={{ overflow: "hidden" }}>
        <RadialGlow color="rgba(0,212,255,0.05)" size={700} top="5%" left="50%" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>

          <div className="section-header">
            <span className="section-label animate-fadeInUp">// join the execution network</span>
            <h1 className="section-title animate-fadeInUp delay-100" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", marginBottom: 18 }}>
              Join the <span className="glow-blue">Network</span>
            </h1>
            <p className="section-subtitle animate-fadeInUp delay-200">
              We onboard performance-driven developers into structured execution teams where they gain real project exposure under supervised workflows.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.7fr", gap: 44, alignItems: "start" }} className="two-col">

            {/* LEFT — Criteria + Stats */}
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
                {CRITERIA.map((c, i) => (
                  <div key={i} className="glass" style={{ padding: "20px 22px" }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 18, color: c.color, flexShrink: 0, marginTop: 1 }}>{c.icon}</span>
                      <div>
                        <div style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 12.5, marginBottom: 6, color: c.color }}>{c.title}</div>
                        <div style={{ color: "var(--text-muted)", fontSize: 12.5, lineHeight: 1.7 }}>{c.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="glass" style={{ padding: 18 }}>
                <div style={{ fontFamily: "Fira Code", fontSize: 9, color: "var(--neon-blue)", letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>Selection Metrics</div>
                <div style={{ display: "flex", gap: 16 }}>
                  {[{ v: "28%", l: "Acceptance" }, { v: "3–5d", l: "Response" }, { v: "Free", l: "Application" }].map(s => (
                    <div key={s.l} style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: 16, color: "var(--neon-blue)" }}>{s.v}</div>
                      <div style={{ fontFamily: "Fira Code", fontSize: 9, color: "var(--text-muted)", marginTop: 2 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="glass" style={{ padding: 40 }}>
              <h3 style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 16, marginBottom: 28 }}>Developer Application</h3>
              {error && <div className="alert alert-error" style={{ marginBottom: 18 }}>⚠ {error}</div>}
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  {[
                    { name: "name",    placeholder: "Full Name",                 type: "text"  },
                    { name: "email",   placeholder: "Email Address",             type: "email" },
                    { name: "college", placeholder: "Institution / University",  type: "text"  },
                    { name: "skills",  placeholder: "Core Skills (e.g. React, Node)", type: "text" },
                  ].map(f => (
                    <div key={f.name} className="input-group">
                      <input className={`input ${errors[f.name] ? "input--error" : ""}`} type={f.type} name={f.name} placeholder={f.placeholder} value={values[f.name]} onChange={handleChange} />
                      {errors[f.name] && <span className="input-error-msg">{errors[f.name]}</span>}
                    </div>
                  ))}
                </div>

                <div className="input-group" style={{ marginBottom: 14 }}>
                  <select className={`input ${errors.role ? "input--error" : ""}`} name="role" value={values.role} onChange={handleChange}>
                    <option value="">Select Specialization</option>
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  {errors.role && <span className="input-error-msg">{errors.role}</span>}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <input className="input" type="url" name="github"   placeholder="GitHub URL (optional)"   value={values.github}   onChange={handleChange} />
                  <input className="input" type="url" name="linkedin" placeholder="LinkedIn URL (optional)" value={values.linkedin} onChange={handleChange} />
                </div>

                <div className="input-group" style={{ marginBottom: 20 }}>
                  <textarea
                    className={`input ${errors.message ? "input--error" : ""}`}
                    name="message"
                    placeholder="Tell us about your technical background, past projects, and what kind of work you want to do at XSTN..."
                    rows={5}
                    value={values.message}
                    onChange={handleChange}
                  />
                  {errors.message && <span className="input-error-msg">{errors.message}</span>}
                </div>

                <div className="glass" style={{ padding: "10px 14px", marginBottom: 18, borderLeft: "2px solid var(--neon-blue)", fontSize: 12, color: "var(--text-muted)", fontFamily: "Fira Code" }}>
                  📎 Share your GitHub or portfolio link — we evaluate work directly.
                </div>

                <button className="btn btn-primary btn-full btn-lg" type="submit" disabled={loading} data-hover>
                  {loading ? <><Spinner size={15} /> Submitting...</> : "Submit Application →"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
