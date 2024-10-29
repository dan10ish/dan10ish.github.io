import { getBlogPosts } from "../lib/api";
import BlogList from "../components/BlogList";
import AboutMe from "../components/AboutMe";
import SocialIcons from "../components/SocialIcons";
import ProjectsSection from "../components/ProjectsSection";
import Footer from "@/components/Footer";

export default function Home() {
  const posts = getBlogPosts();

  return (
    <main>
      <div className="title-link">
        <a href="/">
          <h1>Danish</h1>
        </a>
      </div>
      <div id="about">
        <AboutMe />
      </div>
      <div id="social">
        <SocialIcons />
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
