import { getBlogPosts } from "../lib/posts";
import { getProjects } from "../lib/projects";
import ContentWrapper from "../components/Content";

export default function Home() {
  const posts = getBlogPosts();
  const projects = getProjects();
  return (
    <main>
      <ContentWrapper posts={posts} projects={projects} />
    </main>
  );
}
