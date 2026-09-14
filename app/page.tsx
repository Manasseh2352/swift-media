import PortfolioApp from "@/components/PortfolioApp";
import { getProjects } from "@/lib/projects-store";

export default async function Page() {
  const projects = await getProjects();
  return <PortfolioApp projects={projects} />;
}
