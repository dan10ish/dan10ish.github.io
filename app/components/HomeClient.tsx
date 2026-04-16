'use client'

import { projects } from "../data";
import Projects from "./Projects";
import About from "./About";

export default function HomeClient() {
  return (
    <div className="h-fit max-w-2xl mx-auto">
      <main className="space-y-10 pb-16! sm:pb-0!">
        <section>
          <About />
        </section>

        <section>
          <h2 className="text-base! font-bold! mb-4! header-text">Projects</h2>
          <Projects projects={projects} />
        </section>
      </main>
    </div>
  );
}
