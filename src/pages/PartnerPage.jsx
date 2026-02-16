// ============================================================
// PARTNER PAGE — PDF: "Strategic Collaboration Opportunities"
// Types: Referral Partners, Internship Providers,
//        Technology Collaborators
// No internal % exposed — structured revenue model messaging
// ============================================================

import { usePartnerRequest } from "../hooks/useApi";
import { useForm } from "../hooks/useForm";
import { Section, RadialGlow, SuccessScreen, Spinner } from "../components/UI";

const PARTNER_TYPES = [
  { icon: "◉", title: "Referral Partners",       color: "var(--neon-blue)",   desc: "Refer qualified clients to XSTN and earn a structured commission on successful project delivery. Our referral model is transparent and performance-based." },
  { icon: "⬡", title: "Internship Providers",    color: "var(--neon-purple)", desc: "Offer structured internship placements to XSTN network members. We prepare developers with real project experience before they join your team." },
  { icon: "◈", title: "Technology Collaborators",color: "var(--neon-green)",  desc: "Integrate your platform, tools, or APIs into XSTN's project ecosystem. Build mutual product value through structured technical collaboration." },
];

export function PartnerPage({ setPage }) {
  const { mutate, loading, error, success, response, reset: resetMutation } = usePartnerRequest();
  const { values, errors, handleChange, validate, reset } = useForm(
    { company: "", name: "", email: "", type: "", website: "", details: "" },
    {
      company: v => !v.trim() ? "Company name is required." : null,
      name:    v => v.length < 2 ? "Your name is required." : null,
      email:   v => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Enter a valid business email." : null,
      type:    v => !v ? "Please select a partnership type." : null,
      details: v => v.length < 20 ? "Please describe the opportunity (min 20 chars)." : null,
    }
  );

  const handleSubmit = async (e) => { e.preventDefault(); if (!validate()) return; await mutate(values); };
  const handleReset = () => { reset(); resetMutation(); };

  if (success) return (
    <div style={{ paddingTop: "var(--nav-height)", minHeight: "80vh", display: "flex", alignItems: "center" }}>
      <div className="container">
        <SuccessScreen
          title="Request Received!"
          subtitle={`Thank you, ${values.name}. Our partnerships team will contact you within 48 hours to discuss strategic collaboration opportunities.`}
          detail={`✓ Reference ID: ${response?.data?.id}`}
          onReset={handleReset}
        />
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      <Section className="grid-bg">
        <RadialGlow color="rgba(180,79,255,0.05)" size={700} top="10%" left="50%" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>

          <div className="section-header">
            <span className="section-label animate-fadeInUp">// collaborate</span>
            <h1 className="section-title animate-fadeInUp delay-100" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", marginBottom: 18 }}>
              Strategic Collaboration <span className="glow-purple">Opportunities</span>
            </h1>
            <p className="section-subtitle animate-fadeInUp delay-200">
              We build structured partnerships with organizations that share our commitment to quality execution and long-term scalability.
            </p>
          </div>

          {/* PARTNER TYPE CARDS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, marginBottom: 56 }}>
            {PARTNER_TYPES.map((p, i) => (
              <div key={i} className="glass card" style={{ padding: 32 }}>
                <div style={{ fontSize: 28, color: p.color, marginBottom: 16, filter: `drop-shadow(0 0 8px ${p.color})` }}>{p.icon}</div>
                <h3 style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 14, marginBottom: 12, color: p.color }}>{p.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.75 }}>{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Revenue model — structured message, no internal % */}
          <div className="glass" style={{ padding: "28px 36px", marginBottom: 56, borderLeft: "3px solid var(--neon-blue)" }}>
            <h3 style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 14, color: "var(--neon-blue)", marginBottom: 10 }}>Structured Revenue Model</h3>
            <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.8 }}>
              Our optimized execution model allows us to deliver enterprise-grade solutions with efficient cost structures. Partnership arrangements are tailored to create mutual value — structured, transparent, and performance-aligned. Contact us to discuss the specifics.
            </p>
          </div>

          {/* FORM */}
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div className="glass" style={{ padding: 52 }}>
              <h3 style={{ fontFamily: "Orbitron", fontWeight: 700, fontSize: 18, marginBottom: 32, textAlign: "center" }}>
                Partnership <span className="glow-purple">Inquiry</span>
              </h3>
              {error && <div className="alert alert-error" style={{ marginBottom: 24 }}>⚠ {error}</div>}
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  {[
                    { name: "company", placeholder: "Company / Organization", type: "text"  },
                    { name: "name",    placeholder: "Your Full Name",          type: "text"  },
                    { name: "email",   placeholder: "Business Email",          type: "email" },
                    { name: "website", placeholder: "Website URL (optional)",  type: "url"   },
                  ].map(f => (
                    <div key={f.name} className="input-group">
                      <input className={`input ${errors[f.name] ? "input--error" : ""}`} type={f.type} name={f.name} placeholder={f.placeholder} value={values[f.name]} onChange={handleChange} />
                      {errors[f.name] && <span className="input-error-msg">{errors[f.name]}</span>}
                    </div>
                  ))}
                </div>
                <div className="input-group" style={{ marginBottom: 16 }}>
                  <select className={`input ${errors.type ? "input--error" : ""}`} name="type" value={values.type} onChange={handleChange}>
                    <option value="">Select Partnership Type</option>
                    {PARTNER_TYPES.map(p => <option key={p.title} value={p.title}>{p.title}</option>)}
                  </select>
                  {errors.type && <span className="input-error-msg">{errors.type}</span>}
                </div>
                <div className="input-group" style={{ marginBottom: 28 }}>
                  <textarea
                    className={`input ${errors.details ? "input--error" : ""}`}
                    name="details"
                    placeholder="Describe the collaboration opportunity — what you want to achieve and how XSTN fits your strategy..."
                    rows={5}
                    value={values.details}
                    onChange={handleChange}
                  />
                  {errors.details && <span className="input-error-msg">{errors.details}</span>}
                </div>
                <button className="btn btn-secondary btn-full btn-lg" type="submit" disabled={loading} data-hover>
                  {loading ? <><Spinner size={16} color="var(--neon-purple)" /> Submitting...</> : "Submit Inquiry →"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
