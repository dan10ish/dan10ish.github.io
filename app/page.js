import { getBlogPosts } from "../lib/posts";
import { getProjects } from "../lib/projects";
import Content from "../components/Content";
import Footer from "@/components/Footer";

export default function Home() {
  const posts = getBlogPosts();
  const projects = getProjects();

  return (
    <main>
      <Content posts={posts} projects={projects} />
      <Footer />
    </main>
  );
}
