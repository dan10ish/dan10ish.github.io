import { getProjects } from "../lib/projects";
import { getAllBlogs } from "../lib/blogs";
import ContentWrapper from "../components/Content";

export default function Home() {
  const projects = getProjects();
  const blogs = getAllBlogs();
  return <ContentWrapper projects={projects} blogs={blogs} />;
}
