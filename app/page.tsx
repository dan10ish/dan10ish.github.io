import Link from "next/link";
import SocialLinks from "./components/SocialLinks";
import { personalInfo, projects } from "./data";
import { getSortedWritingsData } from "../lib/writings";
import { formatDate } from "../lib/utils";
import ProjectListClient from "./components/ProjectListClient";

export default function Home() {
  const writings = getSortedWritingsData();

  return (
    <div className="h-fit max-w-2xl mx-auto">
      <main className="space-y-6">
        <section className="space-y-0">
          <h1 className="text-base font-bold header-text">
            {personalInfo.name}
          </h1>
        </section>

        <section>
          <p className="text-base">{personalInfo.about}</p>
          <div className="!pt-4 space-y-4">
            <div className="mt-1 flex flex-wrap gap-2">
              {personalInfo.skills.map((skill) => (
                <div
                  key={skill}
                  className="text-[0.88em] bg-[var(--code-bg)] text-[var(--primary)] !px-1.5 !py-0.5 rounded-md whitespace-nowrap"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2">
            <p className="!text-[0.85rem]">
              Get in touch:
            </p>
            <SocialLinks
              github={personalInfo.socials.github}
              email={personalInfo.socials.email}
              x={personalInfo.socials.x}
              instagram={personalInfo.socials.instagram}
              linkedin={personalInfo.socials.linkedin}
            />
          </div>
        </section>

        {writings.length > 0 && (
          <section>
            <h1 className="text-base opacity-70">Writings</h1>
            <div className="mt-1">
              {writings.map(({ slug, title, date }) => (
                <Link
                  href={`/writings/${slug}`}
                  key={slug}
                  className="block group writing-link !mb-1 hover:bg-[var(--code-bg)] rounded-md !px-2 !-mx-2"
                >
                  <div className="flex gap-4 w-full items-baseline">
                    <span className="text-secondary !text-[0.82rem] flex-shrink-0">
                      {formatDate(date)}
                    </span>
                    <span className="font-semibold text-secondary truncate">
                      {title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <ProjectListClient initialProjects={projects} />
      </main>
    </div>
  );
}
