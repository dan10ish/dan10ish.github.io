import Link from "next/link";
import SocialLinks from "./components/SocialLinks";
import { personalInfo, projects, workExperience } from "./data";
import { getSortedWritingsData } from "../lib/writings";
import { formatDate } from "../lib/utils";
import ProjectListClient from "./components/ProjectListClient";
import { ThemeToggle } from "./components/ThemeToggle";

export default function Home() {
  const writings = getSortedWritingsData();

  return (
    <div className="h-fit max-w-2xl mx-auto">
      <main className="space-y-6">
        <section className="space-y-0">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-bold header-text">
              {personalInfo.name}
            </h1>
            <ThemeToggle />
          </div>
        </section>

        <section>
          <h1 className="text-base opacity-70">About</h1>
          <p className="text-base">{personalInfo.about}</p>
        </section>

        <section>
          <SocialLinks
            github={personalInfo.socials.github}
            email={personalInfo.socials.email}
            x={personalInfo.socials.x}
            instagram={personalInfo.socials.instagram}
            linkedin={personalInfo.socials.linkedin}
          />
        </section>

        {writings.length > 0 && (
          <section>
            <h1 className="text-base opacity-70">Writings</h1>
            <div className="mt-1">
              {writings.map(({ slug, title, date }) => (
                <Link
                  href={`/writings/${slug}`}
                  key={slug}
                  className="block group writing-link !mb-1"
                >
                  <div className="flex gap-2 w-full items-baseline justify-between">
                    <span className="text-primary font-medium touch-underline group-hover:text-[var(--link-blue)] truncate">
                      {title}
                    </span>
                    <span className="text-secondary !text-[0.82rem] flex-shrink-0">
                      {formatDate(date)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section>
          <h1 className="text-base opacity-70">Work</h1>
          {workExperience.map((job, index) => (
            <div key={index} className="mt-1">
              <div className="flex gap-2 w-full items-baseline justify-between">
                <div>
                  <span className="text-secondary !text-[0.82rem] flex-shrink-0">
                    {job.role}
                  </span>
                  <span className="text-secondary !text-[0.82rem] flex-shrink-0"> @ </span>
                  <span className="text-base font-medium">
                    {job.company}
                  </span>
                </div>
                <span className="text-secondary !text-[0.82rem] flex-shrink-0">
                  {job.year}
                </span>
              </div>
            </div>
          ))}
        </section>

        <ProjectListClient initialProjects={projects} />
      </main>
    </div>
  );
}
