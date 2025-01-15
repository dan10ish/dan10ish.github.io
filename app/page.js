import dynamic from "next/dynamic";
import { getBlogPosts } from "../lib/posts";
import AboutMe from "../components/AboutMe";

const BlogList = dynamic(() => import("../components/BlogList"));
const ProjectsSection = dynamic(() => import("../components/ProjectsSection"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  const posts = getBlogPosts();

  return (
    <main>
      <div className="title-container">
        <div className="title-link">
          <a href="/">
            <h1>Danish</h1>
          </a>
        </div>
      </div>

      <div id="about">
        <AboutMe priority={true} />
      </div>
      <div id="blog">
        <BlogList posts={posts} />
      </div>
      <div id="projects">
        <ProjectsSection />
      </div>
      <Footer />
    </main>
  );
}
