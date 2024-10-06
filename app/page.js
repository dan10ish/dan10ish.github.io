import { getBlogPosts } from "../lib/api";
import BlogList from "../components/BlogList";
import AboutMe from "../components/AboutMe";
import SocialIcons from "../components/SocialIcons";
import Library from "../components/Library";
import ProjectsSection from "../components/ProjectsSection";

export default function Home() {
  const posts = getBlogPosts();

  return (
    <main>
      <div className="title-link">
        <a href="/">
          <h1>Danish</h1>
        </a>
      </div>
      <AboutMe />
      <SocialIcons />
      <ProjectsSection />
      <BlogList posts={posts} />
      <Library />
    </main>
  );
}
