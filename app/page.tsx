import { promises as fs } from 'fs';
import { Github, Link } from 'lucide-react';
import path from 'path';

interface Data {
  name: string;
  bio: string[];
  current: { title: string }[];
  past: { title: string; meta?: string }[];
  projects: { title: string; live?: string; source?: string }[];
  contact: { name: string; url: string }[];
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="grid grid-cols-[150px_1fr] gap-x-8">
    <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 text-right">{title}</h2>
    <div>{children}</div>
  </div>
);

const PastEntry: React.FC<{ title: string; meta?: string }> = ({ title, meta }) => (
  <div className="flex items-baseline gap-x-2">
    <p className="font-medium">{title}</p>
    {meta && <p className="text-xs text-gray-500">{meta}</p>}
  </div>
);

export default async function Home() {
  const file = await fs.readFile(path.join(process.cwd(), 'data.json'), 'utf8');
  const data: Data = JSON.parse(file);

  return (
    <main className="font-mono p-16 max-w-3xl">
      <div className="grid grid-cols-[150px_1fr] gap-x-8">
        <h1 className="text-lg font-bold text-right">{data.name}</h1>
        <div>
          {data.bio.map((line, index) => (
            <p key={index} className="text-sm">
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-16 space-y-8">
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
              <PastEntry key={index} title={item.title} meta={item.meta} />
            ))}
          </div>
        </Section>

        <Section title="Select Projects">
          <div className="space-y-2">
            {data.projects.map((project, index) => (
              <div key={index} className="flex items-center space-x-4">
                <p className="font-medium flex-grow">{project.title}</p>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={!project.live ? 'opacity-30 pointer-events-none' : 'hover:opacity-70 transition-opacity'}
                  aria-disabled={!project.live}
                >
                  <Link size={16} />
                </a>
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={!project.source ? 'opacity-30 pointer-events-none' : 'hover:opacity-70 transition-opacity'}
                  aria-disabled={!project.source}
                >
                  <Github size={16} />
                </a>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Contact">
          <div className="space-y-1">
            {data.contact.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-medium hover:opacity-70 transition-opacity"
              >
                {item.name}
              </a>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
