"use client";

import { getProjects } from "@/lib/projects";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";
import ButtonsContainer from "@/components/ButtonsContainer";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <main>
      <ProjectsSection showAll={true} />
      <div className="noFooter">
        <Footer />
      </div>
      <ButtonsContainer />
    </main>
  );
}
