'use client'

import { projects } from "../data";
import Projects from "./Projects";
import About from "./About";
import Notes from "./Notes";
import BusinessCard from "./BusinessCard";
import GitHubActivity from "./GitHubActivity";

export default function HomeClient() {
  return (
    <main className="space-y-10 pb-16 sm:pb-0">
      <section>
        <About />
      </section>

      <section>
        <BusinessCard />
      </section>

      <section>
        <h2 className="text-base font-bold mb-6">Notes</h2>
        <Notes />
      </section>

      <section>
        <h2 className="text-base font-bold mb-4">Projects</h2>
        <Projects projects={projects} />
      </section>

      <section>
        <GitHubActivity />
      </section>
    </main>
  );
}
