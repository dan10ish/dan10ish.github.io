import { getProjects } from "../lib/projects";
import ContentWrapper from "../components/Content";

export default function Home() {
  const projects = getProjects();
  return <ContentWrapper projects={projects} />;
}
