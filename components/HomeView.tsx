import Image from "next/image";
import { categoryLabels, type Project } from "@/data/projects";
import type { Filter } from "./BottomNav";
import { IconPlayBadge } from "./icons";

interface HomeViewProps {
  filter: Filter;
  projects: Project[];
}

export default function HomeView({ filter, projects }: HomeViewProps) {
  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="view active">
      <div className="hero">
        <div className="hero-eyebrow">Design · Photography · Film</div>
        <h1>We make things worth a second look.</h1>
        <p>
          Everything below is real work from the studio — filter by craft using the bar
          at the bottom of the screen.
        </p>
      </div>

      <div className="grid-heading">
        <h2>Selected work</h2>
        <span className="grid-count">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </span>
      </div>

      <div className="grid">
        {visible.map((project) => (
          <article className="card" key={project.id}>
            <div className={`card-visual v-${project.category}`}>
              {project.mediaUrl &&
                (project.video ? (
                  <video
                    className="card-media"
                    src={project.mediaUrl}
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                ) : (
                  <Image
                    className="card-media"
                    src={project.mediaUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 880px) 50vw, 33vw"
                  />
                ))}
              <span className="frame-no">{project.frame}</span>
              {project.video && (
                <span className="play-badge">
                  <IconPlayBadge />
                </span>
              )}
            </div>
            <div className="card-body">
              <div className="card-cat">{categoryLabels[project.category]}</div>
              <div className="card-title">{project.title}</div>
              <div className="card-client">{project.client}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
