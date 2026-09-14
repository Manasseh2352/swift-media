export type Category = "photography" | "videography" | "design" | "branding";

export interface Project {
  id: string;
  title: string;
  client: string;
  category: Category;
  frame: string; // small tag shown on the card visual, e.g. "FRM 01" or "CLIP 02"
  video?: boolean;
  mediaUrl?: string; // set once an admin uploads a real image or video; falls back to a CSS placeholder when absent
}

// Shown until an admin uploads real work — keeps the site looking complete
// out of the box, with no storage set up yet.
export const seedProjects: Project[] = [
  {
    id: "p1",
    title: "Concrete & Light",
    client: "Editorial series, self-initiated",
    category: "photography",
    frame: "FRM 01",
  },
  {
    id: "p2",
    title: "Nia Market Portraits",
    client: "Nia Market Co-op",
    category: "photography",
    frame: "FRM 02",
  },
  {
    id: "p3",
    title: "Product Line, Harmattan",
    client: "Harmattan Skincare",
    category: "photography",
    frame: "FRM 03",
  },
  {
    id: "p4",
    title: "Launch Film — Orbit App",
    client: "Orbit Technologies",
    category: "videography",
    frame: "02:14",
    video: true,
  },
  {
    id: "p5",
    title: "Wedding Highlight, T & D",
    client: "Private client",
    category: "videography",
    frame: "04:02",
    video: true,
  },
  {
    id: "p6",
    title: "Behind the Counter",
    client: "Nia Market Co-op",
    category: "videography",
    frame: "01:38",
    video: true,
  },
  {
    id: "p7",
    title: "Menu & Signage System",
    client: "Kaya Kitchen",
    category: "design",
    frame: "DSG",
  },
  {
    id: "p8",
    title: "Annual Report Layout",
    client: "Riverside Foundation",
    category: "design",
    frame: "DSG",
  },
  {
    id: "p9",
    title: "Identity & Logo Suite",
    client: "Orbit Technologies",
    category: "branding",
    frame: "BRD",
  },
];

export const categoryLabels: Record<Category, string> = {
  photography: "Photography",
  videography: "Videography",
  design: "Design",
  branding: "Branding",
};
