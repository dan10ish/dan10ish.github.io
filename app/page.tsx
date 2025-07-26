import { promises as fs } from "fs";
import path from "path";
import { ArrowUpRight } from "lucide-react";
import { Section, ProjectsSection } from "./components/InteractiveSections";

interface Data {
  name: string;
  bio: string[];
  current: { title: string }[];
  past: { title: string }[];
  education?: { title: string }[];
  projects: { title: string; live?: string; source?: string }[];
  contact: { name: string; url: string }[];
  interests?: string[];
}

export default async function Home() {
  const file = await fs.readFile(
    path.join(process.cwd(), "app/data.json"),
    "utf8"
  );
  const data: Data = JSON.parse(file);

  return (
    <main
      className="font-sans p-8 md:p-12 max-w-3xl mx-auto pb-12"
      style={{ fontSize: "var(--font-size)" }}
    >
      <div className="grid grid-cols-[80px_1fr] gap-x-6">
        <h2
          className="uppercase tracking-widest text-right"
          style={{
            fontWeight: "var(--left-font)",
            fontSize: "var(--font-size)",
          }}
        >
          {data.name}
        </h2>
        <div
          style={{
            fontWeight: "var(--right-font)",
            fontSize: "var(--font-size)",
          }}
        >
          {data.bio.map((line, index) => (
            <p key={index} style={{ fontSize: "var(--font-size)" }}>
              {line}
            </p>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-[80px_1fr] gap-x-6 mt-6">
        <h2 className="font-semibold uppercase tracking-widest text-right">
          INTERESTS
        </h2>
        <div
          style={{
            fontWeight: "var(--right-font)",
            fontSize: "var(--font-size)",
          }}
        >
          {data.interests &&
            data.interests.map((interest, index) => (
              <p key={index} style={{ fontSize: "var(--font-size)" }}>
                {interest}
              </p>
            ))}
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <Section title="Current">
          <div className="space-y-1">
            {data.current.map((item, index) => (
              <p
                key={index}
                style={{
                  fontWeight: "var(--right-font)",
                  fontSize: "var(--font-size)",
                }}
              >
                {item.title}
              </p>
            ))}
          </div>
        </Section>

        <Section title="Past">
          <div className="space-y-1">
            {data.past.map((item, index) => (
              <p
                key={index}
                style={{
                  fontWeight: "var(--right-font)",
                  fontSize: "var(--font-size)",
                }}
              >
                {item.title}
              </p>
            ))}
          </div>
        </Section>
        {data.education && data.education.length > 0 && (
          <Section title="Education">
            <div className="space-y-1">
              {data.education.map((item, index) => (
                <p
                  key={index}
                  style={{
                    fontWeight: "var(--right-font)",
                    fontSize: "var(--font-size)",
                  }}
                >
                  {item.title}
                </p>
              ))}
            </div>
          </Section>
        )}

        <ProjectsSection projects={data.projects} />

        <Section title="Contact">
          <div className="space-y-1">
            {data.contact.map((item, index) => (
              <div key={index}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-300 group inline-flex items-center gap-1 transition-colors"
                  style={{
                    fontWeight: "var(--right-font)",
                    fontSize: "var(--font-size)",
                  }}
                  aria-label={`Contact via ${item.name}`}
                >
                  {item.name}
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
