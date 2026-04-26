import { projects } from "../data";
import Projects from "./Projects";
import About from "./About";
import Notes from "./Notes";
import GitHubActivitySection from "./GitHubActivitySection";
import { GitHubProfileBadge } from "./ProfileSocialBadges";

export default function HomeClient() {
  return (
    <main className="space-y-10 pb-16 sm:pb-0">
      <section>
        <About />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-base font-bold">Projects</h2>
          <GitHubProfileBadge />
        </div>
        <Projects projects={projects} />
      </section>

      <section>
        <h2 className="text-base font-bold mb-6">Notes</h2>
        <Notes />
      </section>

      <section>
        <GitHubActivitySection />
      </section>
    </main>
  );
}
