import { getBlogPosts } from "../lib/api";
import BlogList from "../components/BlogList";
import AboutMe from "../components/AboutMe";
import SocialIcons from "../components/SocialIcons";
import Library from "../components/Library";
import ProjectsSection from "../components/ProjectsSection";
import PicturesSection from "../components/PicturesSection";
import fs from "fs";
import path from "path";
import ScrollToTop from "../components/ScrollToTop";

export default function Home() {
  const posts = getBlogPosts();

  const imageDirectory = path.join(process.cwd(), "public", "images");
  const imageFilenames = fs.readdirSync(imageDirectory);

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
      <PicturesSection images={imageFilenames} />
      <ScrollToTop />
    </main>
  );
}
