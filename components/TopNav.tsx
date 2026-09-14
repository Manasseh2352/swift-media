import { IconMenu } from "./icons";
import type { View } from "./PortfolioApp";

interface TopNavProps {
  view: View;
  onSelect: (v: View) => void;
  onOpenDrawer: () => void;
}

const links: { id: View; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function TopNav({ view, onSelect, onOpenDrawer }: TopNavProps) {
  return (
    <header className="topnav">
      <button className="hamburger" onClick={onOpenDrawer} aria-label="Open menu">
        <IconMenu />
      </button>

      <nav className="topnav-links">
        {links.map((link) => (
          <button
            key={link.id}
            className={view === link.id ? "active" : ""}
            onClick={() => onSelect(link.id)}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <button className="topnav-cta" onClick={() => onSelect("contact")}>
        Start a project
      </button>
    </header>
  );
}
