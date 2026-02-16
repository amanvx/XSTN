// ============================================================
// XSTN API SERVICE LAYER
// All backend calls centralized here.
// Replace mock bodies with real axios calls when backend ready.
// ============================================================

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Real client (uncomment when backend ready):
// const client = axios.create({ baseURL: BASE_URL, timeout: 10000 });

// ── MOCK DATA (matches PDF content) ──────────────────────

export const MOCK_STATS = [
  { value: "50+",  label: "Projects Delivered",  color: "var(--neon-blue)"   },
  { value: "120+", label: "Network Developers",   color: "var(--neon-purple)" },
  { value: "35+",  label: "Satisfied Clients",    color: "var(--neon-green)"  },
  { value: "98%",  label: "On-Time Delivery",     color: "var(--neon-blue)"   },
];

export const MOCK_SERVICES = [
  {
    id: "web", icon: "⬡", color: "var(--neon-blue)",
    title: "Website Development",
    shortDesc: "Responsive, high-performance websites optimized for SEO, security, and scalability",
    fullDesc:  "We design and engineer responsive, high-performance websites optimized for SEO, security, and scalability.",
    stack: "React · Next.js · Node.js · PostgreSQL · Tailwind",
    features: ["UI/UX Design", "Frontend Development", "Backend Integration", "Admin Dashboard", "Deployment & Optimization", "SEO Configuration"],
  },
  {
    id: "webapp", icon: "◈", color: "var(--neon-purple)",
    title: "Custom Web Applications",
    shortDesc: "Full-stack enterprise web apps with complex logic and scalable architecture",
    fullDesc:  "End-to-end custom web application development with complex business logic, APIs, and scalable infrastructure.",
    stack: "Next.js · Node.js · MongoDB · Redis · AWS",
    features: ["System Architecture", "REST & GraphQL APIs", "Auth & Permissions", "Real-time Features", "Cloud Deployment", "Performance Tuning"],
  },
  {
    id: "ai", icon: "◉", color: "var(--neon-green)",
    title: "AI & Data Analytics Systems",
    shortDesc: "Intelligent automation, ML models, and data pipelines that drive business decisions",
    fullDesc:  "AI-powered systems, predictive analytics, and data pipelines that give your business a decisive edge.",
    stack: "Python · TensorFlow · OpenAI · FastAPI · PostgreSQL",
    features: ["ML Model Development", "NLP & Chatbot Integration", "Predictive Analytics", "Data Pipelines", "LLM Integration", "Dashboard & Reporting"],
  },
  {
    id: "saas", icon: "⬟", color: "var(--neon-blue)",
    title: "SaaS Platforms",
    shortDesc: "Multi-tenant SaaS products with subscription billing, dashboards, and role-based access",
    fullDesc:  "Complete SaaS platform development from architecture to deployment — built to scale from Day 1.",
    stack: "Next.js · Stripe · Docker · Kubernetes · AWS",
    features: ["Multi-tenant Architecture", "Subscription Billing", "Role-Based Access", "Analytics Dashboard", "API Marketplace", "99.9% Uptime SLA"],
  },
  {
    id: "admin", icon: "◈", color: "var(--neon-purple)",
    title: "Admin & Dashboard Systems",
    shortDesc: "Internal tools, ops dashboards, and control panels with real-time data and access control",
    fullDesc:  "Custom admin panels and operational dashboards that give you full visibility and control over your business.",
    stack: "React · Node.js · PostgreSQL · WebSocket · Redis",
    features: ["Real-time Data", "Advanced Filtering", "Role Management", "Export & Reporting", "Audit Logs", "Mobile Responsive"],
  },
  {
    id: "game", icon: "⬡", color: "var(--neon-green)",
    title: "Game & Interactive Platforms",
    shortDesc: "Engaging interactive experiences, game backends, and real-time multiplayer infrastructure",
    fullDesc:  "From browser-based games to full multiplayer backends — we build interactive platforms that scale.",
    stack: "Unity · WebGL · Node.js · Socket.io · Redis",
    features: ["Game Architecture", "Real-time Multiplayer", "Leaderboards & Analytics", "In-app Purchases", "Cloud Save", "Cross-platform Support"],
  },
  {
    id: "auto", icon: "◉", color: "var(--neon-blue)",
    title: "Automation & API Integration",
    shortDesc: "Workflow automation, third-party integrations, and API ecosystems that eliminate manual work",
    fullDesc:  "End-to-end workflow automation and API integration services that eliminate manual operations.",
    stack: "Node.js · Python · Zapier · REST · Webhooks",
    features: ["Workflow Automation", "Third-party Integrations", "API Development", "Webhook Systems", "Scheduled Jobs", "Error Monitoring"],
  },
];

export const MOCK_PROJECTS = [
  { id: "nexuspay",   title: "NexusPay",    category: "FinTech",    year: "2024", status: "Live", description: "Real-time payment processing platform with AI fraud detection. Handles 10K+ transactions/day with 99.98% uptime.", impact: "₹2Cr+ processed daily", tags: ["React", "Node.js", "ML", "MongoDB"],   color: "var(--neon-blue)",   client: "FinEdge Inc.",     duration: "4 months", team: 6 },
  { id: "healthos",   title: "HealthOS",    category: "HealthTech", year: "2024", status: "Live", description: "HIPAA-compliant patient management system deployed across 200+ hospitals. Reduced admin overhead by 60%.",         impact: "200+ hospitals live",   tags: ["Next.js", "PostgreSQL", "Docker"],  color: "var(--neon-purple)", client: "MedCore Systems",  duration: "6 months", team: 8 },
  { id: "eduforge",   title: "EduForge",   category: "EdTech",     year: "2023", status: "Live", description: "AI-adaptive learning platform personalizing curriculum for 50K+ students. 40% improvement in learning outcomes.",   impact: "50K+ active learners",  tags: ["Python", "React", "TensorFlow"],   color: "var(--neon-green)",  client: "LearnNow",         duration: "5 months", team: 7 },
  { id: "shopmatrix", title: "ShopMatrix", category: "E-Commerce", year: "2024", status: "Live", description: "Multi-vendor marketplace with AI recommendation engine. 99.9% uptime SLA and mobile-first design.",               impact: "₹50L+ monthly GMV",     tags: ["Next.js", "Stripe", "Redis"],      color: "var(--neon-blue)",   client: "RetailX Group",    duration: "3 months", team: 5 },
  { id: "taskflow",   title: "TaskFlow AI",category: "SaaS",       year: "2024", status: "Beta", description: "AI project management that auto-assigns tasks, predicts bottlenecks, and reduces project delays by 35%.",           impact: "35% faster delivery",   tags: ["React", "FastAPI", "OpenAI"],     color: "var(--neon-purple)", client: "Internal",         duration: "Ongoing",  team: 4 },
  { id: "visioniq",   title: "VisionIQ",   category: "AI/ML",      year: "2023", status: "Live", description: "Computer vision QC platform for manufacturing. 98.7% defect detection accuracy, replacing manual inspection.",      impact: "98.7% detection rate",  tags: ["Python", "PyTorch", "OpenCV"],    color: "var(--neon-green)",  client: "ManufacturePro",   duration: "4 months", team: 5 },
];

export const MOCK_TEAM = [
  { id: 1, name: "Arjun Mehta",  role: "Founder & CEO",      avatar: "A", skills: ["React", "System Design", "Strategy"],   color: "var(--neon-blue)"   },
  { id: 2, name: "Priya Sharma", role: "Lead ML Engineer",   avatar: "P", skills: ["Python", "TensorFlow", "Data Science"], color: "var(--neon-purple)" },
  { id: 3, name: "Ravi Kumar",   role: "Design Lead",        avatar: "R", skills: ["Figma", "UI/UX", "Framer"],             color: "var(--neon-green)"  },
  { id: 4, name: "Sneha Patel",  role: "Backend Architect",  avatar: "S", skills: ["Node.js", "PostgreSQL", "AWS"],         color: "var(--neon-blue)"   },
  { id: 5, name: "Karan Singh",  role: "Mobile Developer",   avatar: "K", skills: ["Flutter", "Swift", "Firebase"],         color: "var(--neon-purple)" },
  { id: 6, name: "Aisha Nair",   role: "DevOps Engineer",    avatar: "A", skills: ["Kubernetes", "Docker", "Terraform"],    color: "var(--neon-green)"  },
];

export const MOCK_TESTIMONIALS = [
  { name: "Rajesh Kumar",    company: "RetailX Group",    type: "E-Commerce Platform", quote: "XSTN delivered our web platform with excellent structure and speed. Their project clarity and execution discipline exceeded expectations.", initials: "RK" },
  { name: "Meera Iyer",      company: "MedCore Systems",  type: "Healthcare Software",  quote: "The HealthOS system transformed our hospital operations. XSTN's structured milestone delivery gave us complete confidence throughout the project.", initials: "MI" },
  { name: "Siddharth Joshi", company: "FinEdge Inc.",     type: "FinTech Platform",     quote: "Exceptional technical depth and communication. They built a payment system that handles peak loads flawlessly. Highly recommend XSTN.", initials: "SJ" },
];

// ── API OBJECT ────────────────────────────────────────────
export const api = {

  // GET /api/stats
  async getStats() {
    await sleep(500);
    return { success: true, data: MOCK_STATS };
  },

  // GET /api/services
  async getServices() {
    await sleep(600);
    return { success: true, data: MOCK_SERVICES };
  },

  // GET /api/projects
  async getProjects() {
    await sleep(700);
    return { success: true, data: MOCK_PROJECTS };
  },

  // GET /api/team
  async getTeam() {
    await sleep(500);
    return { success: true, data: MOCK_TEAM };
  },

  // GET /api/testimonials
  async getTestimonials() {
    await sleep(400);
    return { success: true, data: MOCK_TESTIMONIALS };
  },

  // POST /api/contact
  async submitContactInquiry(data) {
    await sleep(1100);
    return {
      success: true,
      data: { ticketId: "TKT-" + Math.random().toString(36).slice(2, 8).toUpperCase() },
    };
  },

  // POST /api/applications/developer
  async submitDeveloperApplication(data) {
    await sleep(1200);
    return {
      success: true,
      data: { id: "APP-" + Math.random().toString(36).slice(2, 8).toUpperCase(), status: "pending" },
    };
  },

  // POST /api/partnerships
  async submitPartnershipRequest(data) {
    await sleep(1000);
    return {
      success: true,
      data: { id: "PTR-" + Math.random().toString(36).slice(2, 8).toUpperCase() },
    };
  },
};
