import type { Category } from "@/data/projects";

export type Filter = Category | "all";

interface BottomNavProps {
  filter: Filter;
  onSelect: (f: Filter) => void;
}

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "photography", label: "Photography" },
  { id: "videography", label: "Videography" },
  { id: "design", label: "Design" },
  { id: "branding", label: "Branding" },
];

export default function BottomNav({ filter, onSelect }: BottomNavProps) {
  return (
    <nav className="bottomnav">
      {filters.map((f) => (
        <button
          key={f.id}
          className={filter === f.id ? "active" : ""}
          onClick={() => onSelect(f.id)}
        >
          {f.label}
        </button>
      ))}
    </nav>
  );
}
