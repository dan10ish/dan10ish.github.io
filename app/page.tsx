import { promises as fs } from 'fs';
import { Github, Link, ArrowUpRight } from 'lucide-react';
import path from 'path';
import { memo } from 'react';

interface Data {
  name: string;
  bio: string;
  website: string;
  experience: { year: string; title: string; location: string }[];
  projects: { title: string; description?: string; live?: string; source?: string }[];
  education: { year: string; institution: string; degree: string }[];
  contact: { platform: string; handle: string; url: string }[];
}

const ProfileHeader = memo<{ data: Data }>(({ data }) => (
  <div style={{ marginBottom: 'var(--section-gap)' }}>
    <div className="flex items-center gap-4" style={{ marginBottom: 'var(--profile-gap)' }}>
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-base md:text-lg">
        {data.name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="flex-1">
        <h1 className="text-lg md:text-xl font-normal mb-1 text-foreground leading-tight">
          {data.name}
        </h1>
        <p className="text-sm text-secondary mb-2 leading-relaxed">
          Mechatronics Engineer in Mumbai
        </p>
      </div>
    </div>
    <div>
      <h2 className="text-sm font-bold text-heading" style={{ marginBottom: 'var(--heading-gap)' }}>
        About
      </h2>
      <p className="text-sm text-secondary leading-relaxed">{data.bio}</p>
    </div>
  </div>
));

const Section = memo<{ title: string; children: React.ReactNode; isLast?: boolean }>(({ title, children, isLast = false }) => (
  <div style={{ marginBottom: isLast ? '0' : 'var(--section-gap)' }}>
    <h2 className="text-sm font-bold text-heading" style={{ marginBottom: 'var(--heading-gap)' }}>
      {title}
    </h2>
    <div className="flex flex-col" style={{ gap: 'var(--item-gap)' }}>
      {children}
    </div>
  </div>
));

const WorkItem = memo<{ year: string; title: string; location?: string }>(({ year, title, location }) => (
  <div className="flex flex-col md:flex-row gap-3 md:gap-9">
    <div className="w-full md:w-28 flex-shrink-0">
      <p className="text-sm text-tertiary">{year}</p>
    </div>
    <div className="flex-1">
      <h3 className="text-sm font-normal text-foreground leading-relaxed mb-1">{title}</h3>
      {location && <p className="text-sm text-secondary">{location}</p>}
    </div>
  </div>
));

const ProjectItem = memo<{ title: string; description?: string; live?: string; source?: string }>(({ title, description, live, source }) => (
  <div>
    <div className="flex items-center justify-between gap-4 mb-2">
      <h3 className="text-sm font-normal text-foreground leading-relaxed flex-1">{title}</h3>
      {(live || source) && (
        <div className="flex items-center gap-3 flex-shrink-0">
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-secondary text-xs hover-pointer"
              aria-label="View live demo"
            >
              <Link size={12} />
              <span>Live</span>
            </a>
          )}
          {source && (
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-secondary text-xs hover-pointer"
              aria-label="View source code"
            >
              <Github size={12} />
              <span>Source</span>
            </a>
          )}
        </div>
      )}
    </div>
    {description && <p className="text-sm text-secondary">{description}</p>}
  </div>
));

const EducationItem = memo<{ year: string; institution: string; degree: string }>(({ year, institution, degree }) => (
  <div className="flex flex-col md:flex-row gap-3 md:gap-9">
    <div className="w-full md:w-28 flex-shrink-0">
      <p className="text-sm text-tertiary">{year}</p>
    </div>
    <div className="flex-1">
      <h3 className="text-sm font-normal text-foreground leading-relaxed mb-1">{institution}</h3>
      <p className="text-sm text-secondary">{degree}</p>
    </div>
  </div>
));

const ContactItem = memo<{ platform: string; handle: string; url: string }>(({ platform, handle, url }) => (
  <div className="flex flex-row gap-3 md:gap-9">
    <div className="w-20 md:w-28 flex-shrink-0">
      <p className="text-sm text-tertiary">{platform}</p>
    </div>
    <div className="flex-1">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-normal text-foreground hover-pointer group inline-flex items-center gap-1"
      >
        {handle}
        <ArrowUpRight size={12} className="opacity-0 group-hover-show" />
      </a>
    </div>
  </div>
));

ProfileHeader.displayName = 'ProfileHeader';
Section.displayName = 'Section';
WorkItem.displayName = 'WorkItem';
ProjectItem.displayName = 'ProjectItem';
EducationItem.displayName = 'EducationItem';
ContactItem.displayName = 'ContactItem';

export default async function Home() {
  const file = await fs.readFile(path.join(process.cwd(), 'app/data.json'), 'utf8');
  const data: Data = JSON.parse(file);

  return (
    <main className="max-w-sm md:max-w-2xl mx-auto px-7 md:px-12 py-10 md:py-18 text-sm bg-background text-foreground min-h-screen">
      <div className="max-w-md md:max-w-none mx-auto">
        <ProfileHeader data={data} />

        <Section title="Work Experience">
          {data.experience.map((item, index) => (
            <WorkItem key={index} year={item.year} title={item.title} location={item.location} />
          ))}
        </Section>

        <Section title="Projects">
          {data.projects.map((project, index) => (
            <ProjectItem
              key={index}
              title={project.title}
              description={project.description}
              live={project.live}
              source={project.source}
            />
          ))}
        </Section>

        <Section title="Education">
          {data.education.map((item, index) => (
            <EducationItem key={index} year={item.year} institution={item.institution} degree={item.degree} />
          ))}
        </Section>

        <Section title="Contact" isLast={true}>
          {data.contact.map((item, index) => (
            <ContactItem key={index} platform={item.platform} handle={item.handle} url={item.url} />
          ))}
        </Section>
      </div>
    </main>
  );
}
