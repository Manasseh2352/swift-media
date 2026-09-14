import { getProjects } from "@/lib/projects-store";
import { categoryLabels } from "@/data/projects";
import UploadForm from "@/components/admin/UploadForm";
import { deleteProject, logout } from "./actions";

export const metadata = { title: "Admin — SwiftMedia" };

export default async function AdminPage() {
  const projects = await getProjects();

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <div className="hero-eyebrow">SwiftMedia admin</div>
          <h1>Manage work</h1>
        </div>
        <form action={logout}>
          <button className="topnav-cta" type="submit">
            Log out
          </button>
        </form>
      </header>

      <section className="admin-section">
        <h2>Add a project</h2>
        <UploadForm />
      </section>

      <section className="admin-section">
        <h2>Existing work ({projects.length})</h2>
        {projects.length === 0 ? (
          <p className="desc">Nothing uploaded yet.</p>
        ) : (
          <ul className="admin-list">
            {projects.map((project) => (
              <li key={project.id} className="admin-list-item">
                <div>
                  <div className="card-cat">{categoryLabels[project.category]}</div>
                  <div className="card-title">{project.title}</div>
                  <div className="card-client">{project.client}</div>
                </div>
                <form action={deleteProject.bind(null, project.id)}>
                  <button className="admin-delete" type="submit">
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
