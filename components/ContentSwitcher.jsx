"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Globe, Github } from "lucide-react";

const ContentSwitcher = ({ posts, projects }) => {
  const [selectedOption, setSelectedOption] = useState("writings");
  const [mounted, setMounted] = useState(false);
  const [viewsData, setViewsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedOption = localStorage.getItem("selectedOption");
    if (savedOption) {
      setSelectedOption(savedOption);
    }
    setMounted(true);

    const fetchViews = async () => {
      try {
        const viewsPromises = posts.map(async (post) => {
          const { data } = await supabase
            .from("page_stats")
            .select("views")
            .eq("id", `post-${post.slug}`)
            .single();
          return { slug: post.slug, views: data?.views };
        });

        const views = await Promise.all(viewsPromises);
        const viewsMap = views.reduce(
          (acc, { slug, views }) => ({
            ...acc,
            [slug]: views,
          }),
          {},
        );

        setViewsData(viewsMap);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching views:", error);
        setLoading(false);
      }
    };

    fetchViews();
  }, [posts]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("selectedOption", selectedOption);
    }
  }, [selectedOption, mounted]);

  return (
    <div
      className="content-wrapper"
      style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.2s ease" }}
    >
      <div className="option-switcher">
        <button
          onClick={() => setSelectedOption("writings")}
          className={`option-btn ${selectedOption === "writings" ? "active" : ""}`}
        >
          Writings
        </button>
        <button
          onClick={() => setSelectedOption("projects")}
          className={`option-btn ${selectedOption === "projects" ? "active" : ""}`}
        >
          Projects
        </button>
      </div>

      <div className="content-area">
        {selectedOption === "writings" && (
          <div className="mono-list">
            <div className="list-header">
              <span>date</span>
              <span>title</span>
              <span className="views">views</span>
            </div>
            {posts.map((post) => (
              <Link
                href={`/post/${post.slug}`}
                key={post.slug}
                className="list-row"
              >
                <span className="date">{post.year}</span>
                <span className="title title-blog">{post.title}</span>
                <span className="views">
                  {loading || viewsData[post.slug] === undefined ? (
                    <span className="infinity-symbol">∞</span>
                  ) : (
                    viewsData[post.slug]
                  )}
                </span>
              </Link>
            ))}
          </div>
        )}

        {selectedOption === "projects" && (
          <div className="mono-list project-list">
            <div className="list-header">
              <span>title</span>
              <span className="actions">links</span>
              <span className="tags">tags</span>
            </div>
            {projects.map((project) => (
              <div key={project.title} className="list-row">
                <span className="title">{project.title}</span>
                <span className="actions">
                  <a
                    href={project.sourceLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`action-link github ${!project.sourceLink ? "disabled" : ""}`}
                    onClick={(e) => !project.sourceLink && e.preventDefault()}
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={project.projectLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`action-link globe ${!project.projectLink ? "disabled" : ""}`}
                    onClick={(e) => !project.projectLink && e.preventDefault()}
                  >
                    <Globe size={20} />
                  </a>
                </span>
                <span className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentSwitcher;
