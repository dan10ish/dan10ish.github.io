import { getBlogPosts } from "../lib/posts";
import { getProjects } from "../lib/projects";
import ContentSwitcher from "../components/ContentSwitcher";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  const posts = getBlogPosts();
  const projects = getProjects();

  return (
    <main>
      <Header />
      <ContentSwitcher posts={posts} projects={projects} />
      <Footer />
    </main>
  );
}
