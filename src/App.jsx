// ============================================================
// XSTN APP ROOT — State-based routing (no react-router)
// Nav: Home, About, Services, Projects, Partner With Us,
//      Join Network, Contact  (per PDF content spec)
// ============================================================

import { useState } from "react";
import { Cursor, Particles, Navbar, Footer } from "./components/UI";
import { HomePage }    from "./pages/HomePage";
import { AboutPage }   from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { JoinPage }    from "./pages/JoinPage";
import { PartnerPage } from "./pages/PartnerPage";
import { ContactPage } from "./pages/ContactPage";

const PAGES = {
  home:     HomePage,
  about:    AboutPage,
  services: ServicesPage,
  projects: ProjectsPage,
  join:     JoinPage,
  partner:  PartnerPage,
  contact:  ContactPage,
};

export default function App() {
  const [activePage, setActivePage] = useState("home");

  const setPage = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const PageComponent = PAGES[activePage] || HomePage;

  return (
    <>
      <Cursor />
      <Particles />
      <div style={{ position: "relative", zIndex: 1, animation: "fadeIn 0.4s ease both" }}>
        <Navbar activePage={activePage} setPage={setPage} />
        <main style={{ minHeight: "100vh" }}>
          <PageComponent setPage={setPage} />
        </main>
        <Footer setPage={setPage} />
      </div>
    </>
  );
}
