import { put, list, del } from "@vercel/blob";
import { seedProjects, type Project, type Category } from "@/data/projects";

const PROJECTS_PATH = "data/projects.json";

async function findProjectsBlobUrl(): Promise<string | null> {
  const { blobs } = await list({ prefix: PROJECTS_PATH });
  const match = blobs.find((b) => b.pathname === PROJECTS_PATH);
  return match ? match.url : null;
}

/** Reads the current project list. Safe to call with no storage configured. */
export async function getProjects(): Promise<Project[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return seedProjects;
  }

  try {
    const url = await findProjectsBlobUrl();
    if (!url) return seedProjects;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return seedProjects;

    return (await res.json()) as Project[];
  } catch (err) {
    console.error("Failed to load projects from Blob, falling back to seed data:", err);
    return seedProjects;
  }
}

async function saveProjects(projects: Project[]): Promise<void> {
  await put(PROJECTS_PATH, JSON.stringify(projects, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

function nextFrameLabel(category: Category, existing: Project[]): string {
  const count = existing.filter((p) => p.category === category).length + 1;
  const padded = String(count).padStart(2, "0");
  switch (category) {
    case "photography":
      return `FRM ${padded}`;
    case "videography":
      return `CLIP ${padded}`;
    case "design":
      return "DSG";
    case "branding":
      return "BRD";
  }
}

export async function addProject(input: {
  title: string;
  client: string;
  category: Category;
  mediaUrl: string;
  mediaType: "image" | "video";
}): Promise<Project[]> {
  const current = await getProjects();

  const project: Project = {
    id: crypto.randomUUID(),
    title: input.title,
    client: input.client,
    category: input.category,
    frame: nextFrameLabel(input.category, current),
    video: input.mediaType === "video",
    mediaUrl: input.mediaUrl,
  };

  const updated = [project, ...current];
  await saveProjects(updated);
  return updated;
}

export async function deleteProject(id: string): Promise<Project[]> {
  const current = await getProjects();
  const target = current.find((p) => p.id === id);
  const updated = current.filter((p) => p.id !== id);
  await saveProjects(updated);

  if (target?.mediaUrl) {
    try {
      await del(target.mediaUrl);
    } catch (err) {
      console.error("Failed to delete the underlying file from Blob:", err);
    }
  }

  return updated;
}
