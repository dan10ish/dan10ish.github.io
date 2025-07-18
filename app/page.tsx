import { promises as fs } from 'fs';
import { Github, Link, ArrowUpRight } from 'lucide-react';
import path from 'path';
import { memo } from 'react';

interface Data {
  name: string;
  bio: string[];
  current: { title: string }[];
  past: { title: string }[];
  projects: { title: string; live?: string; source?: string }[];
  contact: { name: string; url: string }[];
}

const Section = memo<{ title: string; children: React.ReactNode }>(({ title, children }) => (
  <div className="grid grid-cols-[80px_1fr] gap-x-6">
    <h2 className="font-semibold uppercase tracking-widest text-right">{title}</h2>
    <div>{children}</div>
  </div>
));

Section.displayName = 'Section';

export default async function Home() {
  const file = await fs.readFile(path.join(process.cwd(), 'app/data.json'), 'utf8');
  const data: Data = JSON.parse(file);

  return (
    <main className="font-sans p-8 md:p-12 max-w-3xl mx-auto text-sm">
      <div className="grid grid-cols-[80px_1fr] gap-x-6">
      <h2 className="font-semibold uppercase tracking-widest text-right">{data.name}</h2>
        <div className="font-medium">
          {data.bio.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <Section title="Current">
          <div className="space-y-1">
            {data.current.map((item, index) => (
              <p key={index} className="font-medium">
                {item.title}
              </p>
            ))}
          </div>
        </Section>

        <Section title="Past">
          <div className="space-y-1">
            {data.past.map((item, index) => (
              <p key={index} className="font-medium">
                {item.title}
              </p>
            ))}
          </div>
        </Section>

        <Section title="Projects">
          <div className="space-y-2">
            {data.projects.map((project, index) => (
              <div key={index} className="flex items-center space-x-4">
                <p className="font-medium flex-grow">{project.title}</p>
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 hover:text-blue-600 dark:hover:text-blue-300 p-1 -mt-1 mr-2 rounded-md"
                    aria-label={`View live demo of ${project.title}`}
                  >
                    <Link size={16} />
                  </a>
                ) : (
                  <span className="opacity-30 p-1 -mt-1 mr-2" aria-hidden="true">
                    <Link size={16} />
                  </span>
                )}
                {project.source ? (
                  <a
                    href={project.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 hover:text-blue-600 dark:hover:text-blue-300 p-1 -mt-1 -ml-1 rounded-md"
                    aria-label={`View source code of ${project.title} on GitHub`}
                  >
                    <Github size={16} />
                  </a>
                ) : (
                  <span className="opacity-30 p-1 -mt-1 -ml-1" aria-hidden="true">
                    <Github size={16} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Contact">
          <div className="space-y-1">
            {data.contact.map((item, index) => (
              <div key={index}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-blue-600 dark:hover:text-blue-300 group inline-flex items-center gap-1 transition-colors"
                  aria-label={`Contact via ${item.name}`}
                >
                  {item.name}
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
