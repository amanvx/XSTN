// ============================================================
// CONTACT PAGE — PDF fields: Name, Company, Project Type,
// Budget Range, Timeline, Message
// + WhatsApp integration + Corporate Email + India location
// ============================================================

import { useContactInquiry } from "../hooks/useApi";
import { useForm } from "../hooks/useForm";
import { Section, RadialGlow, SuccessScreen, Spinner } from "../components/UI";

export function ContactPage() {
  const { mutate, loading, error, success, response, reset: resetMutation } = useContactInquiry();
  const { values, errors, handleChange, validate, reset } = useForm(
    { name: "", company: "", email: "", projectType: "", budget: "", timeline: "", message: "" },
    {
      name:    v => v.length < 2 ? "Your name is required." : null,
      email:   v => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Enter a valid email address." : null,
      message: v => v.length < 20 ? "Please describe your project (min 20 chars)." : null,
    }
  );

  const handleSubmit = async (e) => { e.preventDefault(); if (!validate()) return; await mutate(values); };
  const handleReset = () => { reset(); resetMutation(); };

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "91XXXXXXXXXX";

  if (success) return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "80vh", display: "flex", alignItems: "center" }}>
      <div className="container">
        <SuccessScreen
          title="Inquiry Received"
          subtitle={`Thank you, ${values.name}. We'll review your project and respond within 24 hours with a structured approach and proposal.`}
          detail={`✓ Ticket: ${response?.data?.ticketId}`}
          onReset={handleReset}
        />
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      <Section className="grid-bg">
        <RadialGlow color="rgba(0,212,255,0.05)" size={700} top="10%" left="50%" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>

          <div className="section-header">
            <span className="section-label animate-fadeInUp">// get in touch</span>
            <h1 className="section-title animate-fadeInUp delay-100" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", marginBottom: 18 }}>
              Let's Build Your Next <span className="glow-blue">Digital Product</span>
            </h1>
            <p className="section-subtitle animate-fadeInUp delay-200">
              Tell us about your project. We'll respond with a structured approach, timeline estimate, and proposal within 24 hours.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 44, alignItems: "start" }} className="two-col">

            {/* LEFT — Contact details */}
            <div>
              <h3 style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 14, marginBottom: 20 }}>Contact Details</h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {[
                  { icon: "◉", label: "Corporate Email", value: "hello@xstn.io",              color: "var(--neon-blue)"   },
                  { icon: "⬡", label: "WhatsApp",        value: "+91 XXXXX XXXXX",             color: "var(--neon-green)"  },
                  { icon: "◈", label: "LinkedIn",        value: "linkedin.com/company/xstn",  color: "var(--neon-purple)" },
                  { icon: "⬟", label: "Location",        value: "India",                      color: "var(--neon-blue)"   },
                ].map((c, i) => (
                  <div key={i} className="glass" style={{ padding: "15px 18px", display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 16, color: c.color, flexShrink: 0 }}>{c.icon}</span>
                    <div>
                      <div style={{ fontFamily: "Fira Code", fontSize: 9, color: "var(--text-muted)", letterSpacing: 1.5, marginBottom: 2, textTransform: "uppercase" }}>{c.label}</div>
                      <div style={{ fontFamily: "Fira Code", fontSize: 11.5, color: c.color }}>{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Response SLA */}
              <div className="glass" style={{ padding: 20, marginBottom: 16 }}>
                <div style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 11, marginBottom: 10, color: "var(--neon-green)" }}>● Response SLA</div>
                {[["Project Proposals", "< 24 hrs"], ["General Inquiries", "< 24 hrs"], ["Partnership Req.", "< 48 hrs"]].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 12 }}>
                    <span style={{ color: "var(--text-muted)" }}>{label}</span>
                    <span style={{ fontFamily: "Fira Code", color: "var(--neon-green)", fontSize: 10 }}>{val}</span>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", background: "rgba(0,255,159,0.06)", border: "1px solid rgba(0,255,159,0.25)", textDecoration: "none", transition: "all 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--neon-green)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(0,255,159,0.25)"}
              >
                <span style={{ fontSize: 20 }}>💬</span>
                <div>
                  <div style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 11, color: "var(--neon-green)" }}>WhatsApp Us</div>
                  <div style={{ fontFamily: "Fira Code", fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>Quick response guaranteed</div>
                </div>
              </a>
            </div>

            {/* FORM */}
            <div className="glass" style={{ padding: 44 }}>
              <h3 style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 16, marginBottom: 28 }}>
                Project <span className="glow-blue">Inquiry</span>
              </h3>
              {error && <div className="alert alert-error" style={{ marginBottom: 18 }}>⚠ {error}</div>}
              <form onSubmit={handleSubmit} noValidate>

                {/* Name + Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div className="input-group">
                    <input className={`input ${errors.name ? "input--error" : ""}`} type="text" name="name" placeholder="Your Name" value={values.name} onChange={handleChange} />
                    {errors.name && <span className="input-error-msg">{errors.name}</span>}
                  </div>
                  <div className="input-group">
                    <input className={`input ${errors.email ? "input--error" : ""}`} type="email" name="email" placeholder="Email Address" value={values.email} onChange={handleChange} />
                    {errors.email && <span className="input-error-msg">{errors.email}</span>}
                  </div>
                </div>

                {/* Company */}
                <div className="input-group" style={{ marginBottom: 14 }}>
                  <input className="input" type="text" name="company" placeholder="Company / Startup (optional)" value={values.company} onChange={handleChange} />
                </div>

                {/* Project Type + Budget + Timeline */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <select className="input" name="projectType" value={values.projectType} onChange={handleChange}>
                    <option value="">Project Type</option>
                    {["Website", "Web Application", "Mobile App", "AI/ML System", "SaaS Platform", "Admin Dashboard", "API Integration", "Other"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <select className="input" name="budget" value={values.budget} onChange={handleChange}>
                    <option value="">Budget Range</option>
                    {["< ₹50K", "₹50K–₹2L", "₹2L–₹5L", "₹5L–₹10L", "₹10L+", "Let's Discuss"].map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <select className="input" name="timeline" value={values.timeline} onChange={handleChange}>
                    <option value="">Timeline</option>
                    {["< 1 Month", "1–2 Months", "2–3 Months", "3–6 Months", "6+ Months", "Flexible"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div className="input-group" style={{ marginBottom: 28 }}>
                  <textarea
                    className={`input ${errors.message ? "input--error" : ""}`}
                    name="message"
                    placeholder="Describe your project — goals, key features, current challenges, and any technical requirements..."
                    rows={6}
                    value={values.message}
                    onChange={handleChange}
                  />
                  {errors.message && <span className="input-error-msg">{errors.message}</span>}
                </div>

                <button className="btn btn-primary btn-full btn-lg" type="submit" disabled={loading} data-hover>
                  {loading ? <><Spinner size={15} /> Sending...</> : "Request Consultation →"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
