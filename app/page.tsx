import Link from 'next/link'
import ProjectLink from './components/ProjectLink';
import SocialLinks from './components/SocialLinks';
import { personalInfo, projects } from './data';
import { getSortedWritingsData } from '../lib/writings';
import { formatDate } from '../lib/utils';

export default function Home() {
  const writings = getSortedWritingsData();

  return (
    <div className="h-fit max-w-2xl mx-auto">
      <main className="space-y-6">
        <section className="space-y-0">
          <h1 className="text-base font-bold header-text">{personalInfo.name}</h1>
        </section>

        <section>
          <p className="text-base">
            {personalInfo.about}
          </p>
        </section>

        <section>
          <div className="flex items-center gap-2">
            <div className="text-[0.9rem] mb-0 flex items-center">get in touch:</div>
            <SocialLinks 
              github={personalInfo.socials.github}
              email={personalInfo.socials.email}
              x={personalInfo.socials.x}
              instagram={personalInfo.socials.instagram}
            />
          </div>
        </section>

        {writings.length > 0 && (
          <section>
            <h1 className="text-base opacity-70">writings</h1>
            <div className="mt-1 space-y-1">
              {writings.map(({ slug, title, date }) => (
                <Link href={`/writings/${slug}`} key={slug} className="block group">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-primary group-hover:underline truncate">
                      {title}
                    </span>
                    <span className="text-secondary text-sm flex-shrink-0 ml-2">
                      {formatDate(date)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section>
          <h1 className="text-base opacity-70">projects</h1>
          <div className="mt-1 project-list">
            {projects.map((project, index) => (
              <ProjectLink
                key={index}
                name={project.name}
                sourceCode={project.sourceCode}
                liveDemo={project.liveDemo}
              />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
