"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import BottomNav, { Filter } from "./BottomNav";
import HomeView from "./HomeView";
import AboutView from "./AboutView";
import ContactView from "./ContactView";
import type { Project } from "@/data/projects";

export type View = "home" | "about" | "contact";

interface PortfolioAppProps {
  projects: Project[];
}

export default function PortfolioApp({ projects }: PortfolioAppProps) {
  const [view, setView] = useState<View>("home");
  const [filter, setFilter] = useState<Filter>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // close the drawer on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setDrawerOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function handleFilterSelect(f: Filter) {
    setFilter(f);
    setView("home");
  }

  function handleViewSelect(v: View) {
    setView(v);
    setDrawerOpen(false);
  }

  return (
    <div className="app">
      <Sidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      {drawerOpen && <div className="backdrop" onClick={() => setDrawerOpen(false)} />}

      <div className="main">
        <TopNav view={view} onSelect={handleViewSelect} onOpenDrawer={() => setDrawerOpen(true)} />

        <div className="content">
          {view === "home" && <HomeView filter={filter} projects={projects} />}
          {view === "about" && <AboutView />}
          {view === "contact" && <ContactView />}
        </div>

        {view === "home" && <BottomNav filter={filter} onSelect={handleFilterSelect} />}
      </div>
    </div>
  );
}
