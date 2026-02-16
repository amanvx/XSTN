# XSTN - Xplorevo Student Tech Network

> A modern, futuristic web agency portfolio showcasing student-driven tech solutions

Built with React 18, Vite 5, and a custom design system featuring neon aesthetics, particle effects, and enterprise-grade UI components. This portfolio demonstrates end-to-end digital solutions with real-time form validation, API integration, and responsive design.

## 💻 Tech Stack

### Core
- **React** 18.2.0 - UI library with hooks
- **Vite** 5.4.21 - Fast build tool with HMR
- **Axios** 1.6.0 - HTTP client for API requests

### Styling
- **Custom CSS** - Design system with CSS variables
- **Tailwind CSS** 3.3.0 - Utility-first CSS (optional)
- **Glassmorphism** - Modern UI aesthetic with backdrop filters

### State Management
- **React Hooks** - useState, useEffect, useRef, useCallback
- **Custom Hooks** - useFetch, useMutation, useForm
- **No Redux** - Component-level state management

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - Vendor prefixes
- **VS Code** - Recommended IDE

## 📁 Project Structure

```
xstn/
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── assets/
│       └── images/
│
├── src/
│   ├── services/
│   │   └── api.js                  # Backend API calls
│   │
│   ├── hooks/
│   │   ├── useApi.js               # Data fetching hooks
│   │   └── useForm.js              # Form state & validation
│   │
│   ├── components/
│   │   └── UI.jsx                  # 20+ Shared UI components
│   │
│   ├── pages/
│   │   ├── HomePage.jsx            # Hero, Stats, Services, Projects
│   │   ├── AboutPage.jsx           # Story, Vision, Timeline, Team
│   │   ├── ServicesPage.jsx        # Service cards, Process steps
│   │   ├── ProjectsPage.jsx        # Portfolio with filters
│   │   ├── JoinPage.jsx            # Developer application form
│   │   ├── PartnerPage.jsx         # Partnership inquiry form
│   │   └── ContactPage.jsx         # Project inquiry form
│   │
│   ├── styles/
│   │   └── global.css              # Design system & animations
│   │
│   └── App.jsx                     # Root component & routing
│
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## ✨ Features

- 🎨 **Futuristic Design System** - Neon colors, glassmorphism, particle effects
- 🎯 **7 Complete Pages** - Home, About, Services, Projects, Join, Partner, Contact
- 🪝 **Custom Hooks** - useFetch, useMutation, useForm with rules-based validation
- 📱 **Fully Responsive** - Mobile-first design with touch-friendly interactions
- ⚡ **High Performance** - Vite HMR, optimized rendering, lazy loading
- 🔄 **Mock Data Fallback** - Works without backend, automatic fallback to demo data
- ✅ **Form Validation** - Real-time field validation with custom rules
- 🎭 **20+ UI Components** - Reusable, consistent component library

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ and npm
- **Git** (optional)

### Installation

1. **Clone or download** the repository:
```bash
git clone <repository-url>
cd XSTN
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start development server**:
```bash
npm run dev
```

4. **Open your browser** at `http://localhost:3000` (or the displayed port)

> **Note**: The app works without a backend. API calls automatically fall back to mock data for demo purposes.

## 📦 Build

```bash
npm run build
```

Production-ready files will be in the `dist/` directory.

## 🎨 Design System

### Color Palette
```css
--neon-blue:    #00d4ff  /* Primary accent */
--neon-purple:  #b44fff  /* Secondary accent */
--neon-green:   #00ff9f  /* Success/highlight */
--dark:         #0a0e27  /* Background */
--darker:       #050812  /* Deeper background */
--text-primary: #e0e6ed  /* Main text */
--text-muted:   #8b92a7  /* Secondary text */
```

### Typography Stack
- **Headings**: [Orbitron](https://fonts.google.com/specimen/Orbitron) - Bold, futuristic, sci-fi aesthetic
- **Body Text**: [Poppins](https://fonts.google.com/specimen/Poppins) - Clean, modern, highly readable
- **Code/Mono**: [Fira Code](https://fonts.google.com/specimen/Fira+Code) - Monospace with ligatures

### Animations
- `fadeInUp` - Fade in with upward slide
- `float` - Gentle floating motion
- `rotate` - Continuous 360° rotation
- `shimmer` - Skeleton loading effect
- `pulse` - Pulsing glow effect
- `bounce` - Bouncing animation
- `scaleIn` - Scale from 0 to 1 with fade

### Components

#### UI Components (`src/components/UI.jsx`)
- `Cursor` - Custom mouse cursor
- `Particles` - Animated background particles
- `Navbar` - Navigation bar
- `Footer` - Footer component
- `Skeleton` / `CardSkeleton` - Loading states
- `Spinner` / `PageLoader` - Loading indicators
- `ErrorState` / `EmptyState` - Empty/error views
- `SuccessScreen` - Success message display
- `FilterBar` - Category/filter selector
- `TechPill` - Technology badge
- `RadialGlow` - Glowing container
- `StatCard` - Statistics display
- `GlowDivider` - Decorative divider
- `Button` - Reusable button (primary, secondary, ghost)
- `Input` / `Textarea` - Form inputs with validation
- `Card` - Generic card component
- `Badge` - Live/Beta badges

### Layout System
- **Container**: Max-width 1280px, responsive padding
- **Grid**: CSS Grid with auto-fit columns
- **Glassmorphism**: `backdrop-filter: blur(10px)` with semi-transparent backgrounds
- **Spacing**: Consistent 8px base unit
- **Border Radius**: 4px subtle, 8px moderate, 16px prominent

## 🪝 Custom Hooks

### `useFetch(fetchFn, deps)`
Generic data fetching hook with automatic loading/error states.

```jsx
const { data, loading, error, refetch } = useProjects()

if (loading) return <Spinner />
if (error) return <ErrorState message={error} onRetry={refetch} />
return <div>{data.map(...)}</div>
```

**Available Data Hooks:**
- `useProjects()` - Fetch all projects with categories
- `useServices()` - Fetch all services with details
- `useTeam()` - Fetch team members
- `useStats()` - Fetch statistics (projects, clients, years, etc.)

### `useMutation(mutateFn)`
Handles form submissions and mutations with success/error states.

```jsx
const { mutate, loading, success, error, response, reset } = useApplyDeveloper()

const handleSubmit = async () => {
  await mutate(formData)
}
```

**Available Mutation Hooks:**
- `useApplyDeveloper()` - Submit developer application
- `useContactInquiry()` - Submit contact/project inquiry
- `usePartnerRequest()` - Submit partnership request
- `useNewsletterSub()` - Subscribe to newsletter

### `useForm(initialValues, rules)`
Form state management with rules-based validation.

```jsx
const { values, errors, touched, handleChange, validate, reset } = useForm(
  { name: '', email: '' },
  {
    name: (val) => !val ? 'Name is required' : val.length < 2 ? 'Too short' : null,
    email: (val) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? 'Invalid email' : null,
  }
)

// In JSX
<input value={values.name} onChange={handleChange} name="name" />
{touched.name && errors.name && <span>{errors.name}</span>}
```

**Features:**
- Auto-clears errors on change
- Tracks touched fields
- Manual `validate()` trigger
- Programmatic `setValue(name, value)` and `setValues(obj)`

## 📡 API Integration

All API calls are centralized in `src/services/api.js` using Axios.

### Configuration

Set backend URL via environment variable:
```bash
# .env
VITE_API_URL=http://localhost:5000
```

**Default**: `http://localhost:5000` if not specified.

### API Methods

**Data Fetching** (GET endpoints):
```javascript
api.getProjects()         // GET /api/projects
api.getProjectById(id)    // GET /api/projects/:id
api.getServices()         // GET /api/services
api.getTeam()             // GET /api/team
api.getStats()            // GET /api/stats
```

**Mutations** (POST endpoints):
```javascript
api.submitDeveloperApplication(formData)   // POST /api/apply-developer
api.submitContactInquiry(formData)         // POST /api/contact-inquiry
api.submitPartnershipRequest(formData)     // POST /api/partnership-request
api.subscribeNewsletter(email)             // POST /api/newsletter-subscribe
```

### Response Format

All API methods return:
```javascript
{
  success: boolean,
  data?: any,
  error?: string
}
```

### Mock Data Fallback

**No backend required!** When API calls fail (e.g., backend not running), the service automatically returns mock data:

- **Projects**: 3 sample projects (FinTech, HealthTech, EdTech)
- **Services**: 4 services (Web Dev, Mobile, AI/ML, UI/UX) with full details
- **Stats**: 4 statistics (50+ projects, 30+ clients, 5+ years, 100+ team)
- **Team**: Empty array (populate via backend)
- **Mutations**: Return confirmation IDs (DEV-*, TKT-*, PRT-*, SUB-*)

This allows frontend development and demos without backend dependency.

## 📄 Pages Overview

### 🏠 HomePage
**Route**: `/` (default)
- Hero section with animated title and CTA
- Tech stack ticker (floating tech badges)
- Statistics band (projects, clients, years, team size)
- Services preview cards (top 3)
- Featured projects showcase
- Call-to-action section

### ℹ️ AboutPage
**Route**: `/about`
- Company story and founding narrative
- Vision & mission statements
- Historical timeline (key milestones)
- Founder/leadership profiles
- Team member grid with roles
- Company values and principles

### 🛠️ ServicesPage
**Route**: `/services`
- Expandable service cards (Web, Mobile, AI/ML, UI/UX)
- Full service descriptions on expand
- Tech stack display per service
- Features/deliverables list
- 6-step process workflow (Discovery → Support)
- Custom solution CTA

### 💼 ProjectsPage
**Route**: `/projects`
- Portfolio grid with rich project cards
- 7 category filters (All, FinTech, HealthTech, EdTech, E-Commerce, SaaS, AI/ML)
- Project metadata: client, duration, team size, year
- Status badges (LIVE, BETA)
- Technology pills (color-coded)
- Gradient color accents per category
- Loading skeletons and error states

### 👥 JoinPage
**Route**: `/join`
- Developer recruitment page
- 6 perks cards (Real Projects, Mentorship, Certificate, Network, Stipend, PPO)
- Acceptance statistics (28% rate, 3-5d response, Free)
- Application form: name, email, college, role (dropdown), skills, GitHub, LinkedIn, message
- Real-time validation with error display
- Success screen with confirmation ID

### 🤝 PartnerPage
**Route**: `/partner`
- Partnership inquiry page
- 4 partnership types: Tech Partner, Hiring Partner, Academic Partner, Referral Partner
- Form: company, name, email, website, type (dropdown), details (textarea)
- Field validation (company, name ≥2 chars, email regex, type, details ≥20 chars)
- Success screen with request ID

### 📧 ContactPage
**Route**: `/contact`
- Project inquiry form
- Contact info panel (Email, Discord, LinkedIn, GitHub)
- Response SLA matrix (General <24h, Quotes <48h, Partnership <48h)
- Form: name, email, company, service (dropdown), budget (dropdown), message (textarea)
- Budget ranges: < ₹50K, ₹50K-₹2L, ₹2L-₹5L, ₹5L-₹10L, ₹10L+, Let's Discuss
- Service options: Web Dev, Mobile, AI/ML, UI/UX, Cloud, Cybersecurity, Other
- Success screen with ticket ID

## 🛠️ Development

### Available Scripts

```bash
npm run dev       # Start Vite dev server with HMR (Hot Module Replacement)
npm run build     # Build optimized production bundle
npm run preview   # Preview production build locally
npm run lint      # Run ESLint checks on source files
```

### Environment Variables

Create a `.env` file in project root (optional):
```env
VITE_API_URL=http://localhost:5000
```

**Note**: If omitted, defaults to `http://localhost:5000`.

### Navigation System

The app uses **state-based navigation** (not react-router-dom):
- `activePage` state in `App.jsx` controls which page renders
- `setPage(pageName)` prop passed to all pages and Navbar
- Valid pages: `'home'`, `'about'`, `'services'`, `'projects'`, `'join'`, `'partner'`, `'contact'`

```jsx
// Example navigation
<button onClick={() => setPage('projects')}>View Projects</button>
```

### Adding a New Page

1. Create component in `src/pages/NewPage.jsx`
2. Import in `src/App.jsx`
3. Add case to `renderPage()` switch statement
4. Add navigation link in `src/components/UI.jsx` (Navbar)
5. Update this README

## 📱 Responsive Design

- **Mobile-First Approach**: Base styles for mobile, progressive enhancement for larger screens
- **Breakpoints**:
  - `640px` - Small tablets
  - `768px` - Tablets (portrait)
  - `1024px` - Tablets (landscape) / Small laptops
  - `1280px` - Desktop (container max-width)
- **Touch-Friendly**: Large tap targets (44px min), swipe gestures, no hover dependencies
- **Hide-Mobile Class**: `.hide-mobile { display: none }` on small screens
- **Optimized Performance**: Lazy loading, debounced scroll, optimized animations

## 🧪 Testing

**Manual Testing Checklist**:
- ✅ All pages load without errors
- ✅ Navigation works between all pages
- ✅ Forms validate correctly
- ✅ Form submissions show success states
- ✅ Loading states display during data fetch
- ✅ Error states show with retry buttons
- ✅ Mobile menu toggles correctly
- ✅ Responsive layout works on all screen sizes
- ✅ Particles and cursor effects render
- ✅ Mock data fallback works without backend

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Outputs to `dist/` directory.

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag 'dist' folder to Netlify dashboard
```

### Environment Variables (Production)

Set in hosting platform:
- `VITE_API_URL` - Backend API URL (e.g., `https://api.xstn.com`)

If backend is not ready, the app will use mock data automatically.

## 🤝 Contributing

We welcome contributions from the community!

### Getting Started

1. **Fork** the repository
2. **Clone** your fork: `git clone <your-fork-url>`
3. **Create a branch**: `git checkout -b feature/your-feature-name`
4. **Make changes** and commit: `git commit -m "Add: your feature description"`
5. **Push** to your fork: `git push origin feature/your-feature-name`
6. **Open a Pull Request** on GitHub

### Contribution Guidelines

- Follow existing code style and patterns
- Use semantic commit messages (`Add:`, `Fix:`, `Update:`, `Refactor:`)
- Test your changes across different screen sizes
- Update documentation if adding new features
- Ensure no console errors or warnings

### Code Style

- **Components**: PascalCase (`HomePage.jsx`)
- **Functions**: camelCase (`handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **CSS Classes**: kebab-case (`.btn-primary`)
- **Indentation**: 2 spaces
- **Quotes**: Double quotes for JSX, single for JS

## 🐛 Reporting Issues

Found a bug? Have a feature request?

1. Check existing [Issues](https://github.com/your-org/xstn/issues)
2. Create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Browser/device information

## 📝 Roadmap

### Upcoming Features
- [ ] Backend API implementation (Node.js/Express)
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication system
- [ ] Admin dashboard for content management
- [ ] Blog/articles section
- [ ] Email notifications for form submissions
- [ ] Analytics dashboard
- [ ] Dark/Light theme toggle
- [ ] Internationalization (i18n)
- [ ] SEO optimization

### Known Issues
- Console warnings from React DevTools (non-breaking)
- Connection errors when backend is not running (expected, mock fallback works)
- Missing CSS animations: `particleUp`, `countUp` (referenced but not defined)

## 📜 Additional Documentation

- **[API.md](./docs/API.md)** - Detailed API documentation
- **[COMPONENTS.md](./docs/COMPONENTS.md)** - UI components guide
- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Deployment instructions
- **[CONTRIBUTING.md](./docs/CONTRIBUTING.md)** - Contribution guidelines

## � License

Copyright © 2026 XSTN - Xplorevo Student Tech Network. All rights reserved.

This project is proprietary software. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited.

## 📧 Contact & Support

**Website**: [https://xstn.tech](https://xstn.tech)

**Email**: contact@xstn.tech

**Discord**: Join our community server

**LinkedIn**: [XSTN Organization](https://linkedin.com/company/xstn)

**GitHub**: [github.com/xstn](https://github.com/xstn)

For project inquiries, partnership opportunities, or developer applications, visit our [Contact Page](http://localhost:3000/contact).

---

<div align="center">

**Built with ❤️ by the XSTN Team**

*Empowering student developers to build enterprise-grade solutions*

[![React](https://img.shields.io/badge/React-18.2.0-61dafb?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.21-646cff?style=flat&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat)](.)

</div>
