import { promises as fs } from 'fs';
import { Github, Link, ArrowUpRight } from 'lucide-react';
import path from 'path';
import { memo } from 'react';
import Image from 'next/image';

interface Data {
  name: string;
  bio: string;
  website: string;
  experience: { year: string; title: string; location: string }[];
  projects: { title: string; tag: string; live?: string; source?: string }[];
  education: { year: string; institution: string; degree: string }[];
  contact: { platform: string; handle: string; url: string }[];
}

const ProfileHeader = memo<{ data: Data }>(({ data }) => (
  <div style={{ marginBottom: 'var(--section-gap)' }}>
    <div className="flex items-center gap-4" style={{ marginBottom: 'var(--profile-gap)' }}>
      <div className="flex-1">
        <h1 className="font-normal mb-1 text-foreground leading-tight" style={{ fontSize: 'var(--font-lg)' }}>
          {data.name}
        </h1>
      </div>
    </div>
    <div>
      <h2 className="font-bold text-heading" style={{ marginBottom: 'var(--heading-gap)', fontSize: 'var(--font-heading)' }}>
        About
      </h2>
      <p className="text-secondary leading-relaxed" style={{ fontSize: 'var(--font-sm)' }}>{data.bio}</p>
    </div>
  </div>
));

const Section = memo<{ title: string; children: React.ReactNode; isLast?: boolean; gap?: string }>(({ title, children, isLast = false, gap }) => (
  <div style={{ marginBottom: isLast ? '0' : 'var(--section-gap)' }}>
    <h2 className="font-bold text-heading" style={{ marginBottom: 'var(--heading-gap)', fontSize: 'var(--font-heading)' }}>
      {title}
    </h2>
    <div className="flex flex-col" style={{ gap: gap || 'var(--item-gap)' }}>
      {children}
    </div>
  </div>
));

const WorkItem = memo<{ year: string; title: string; location?: string }>(({ year, title, location }) => (
  <div className="flex flex-row gap-3 md:gap-9">
    <div className="w-28 flex-shrink-0">
      <p className="text-tertiary" style={{ fontSize: 'var(--font-sm)' }}>{year}</p>
    </div>
    <div className="flex-1">
      <h3 className="font-normal text-foreground leading-relaxed mb-1" style={{ fontSize: 'var(--font-sm)' }}>{title}</h3>
      {location && <p className="text-secondary" style={{ fontSize: 'var(--font-sm)' }}>{location}</p>}
    </div>
  </div>
));

const ProjectItem = memo<{ title: string; tag: string; live?: string; source?: string }>(({ title, tag, live, source }) => (
  <div className="flex flex-row gap-3 md:gap-9 items-center">
    <div className="flex-1">
      <h3 className="font-normal text-foreground leading-relaxed" style={{ fontSize: 'var(--font-sm)' }}>{title}</h3>
    </div>
    <div className="flex items-center gap-4 md:gap-5 flex-shrink-0">
      <div className="w-20 flex justify-center">
        <span className="inline-block px-2 py-1 bg-[rgb(var(--surface))] text-secondary rounded-lg" style={{ fontSize: 'var(--font-xs)' }}>
          {tag}
        </span>
      </div>
      {live ? (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-secondary hover-pointer hover:scale-110"
          style={{ fontSize: 'var(--font-xs)' }}
          aria-label="View live demo"
        >
          <Link size={17} />
        </a>
      ) : (
        <span className="flex items-center text-secondary opacity-40 select-none cursor-default" style={{ fontSize: 'var(--font-xs)' }}>
          <Link size={17} />
        </span>
      )}
      {source ? (
        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-secondary hover-pointer hover:scale-110"
          style={{ fontSize: 'var(--font-xs)' }}
          aria-label="View source code"
        >
          <Github size={17} />
        </a>
      ) : (
        <span className="flex items-center text-secondary opacity-40 select-none cursor-default" style={{ fontSize: 'var(--font-xs)' }}>
          <Github size={17} />
        </span>
      )}
    </div>
  </div>
));

const EducationItem = memo<{ year: string; institution: string; degree: string }>(({ year, institution, degree }) => (
  <div className="flex flex-row gap-3 md:gap-9">
    <div className="w-28 flex-shrink-0">
      <p className="text-tertiary" style={{ fontSize: 'var(--font-sm)' }}>{year}</p>
    </div>
    <div className="flex-1">
      <h3 className="font-normal text-foreground leading-relaxed mb-1" style={{ fontSize: 'var(--font-sm)' }}>{institution}</h3>
      <p className="text-secondary" style={{ fontSize: 'var(--font-sm)' }}>{degree}</p>
    </div>
  </div>
));

const ContactItem = memo<{ platform: string; handle: string; url: string }>(({ platform, handle, url }) => (
  <div className="flex flex-row gap-3 md:gap-9">
    <div className="w-28 flex-shrink-0">
      <p className="text-tertiary" style={{ fontSize: 'var(--font-sm)' }}>{platform}</p>
    </div>
    <div className="flex-1">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-normal text-foreground hover-pointer group inline-flex items-center gap-1"
        style={{ fontSize: 'var(--font-sm)' }}
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
    <main className="max-w-sm md:max-w-2xl mx-auto px-7 md:px-12 py-12  md:py-18 bg-background text-foreground min-h-screen">
      <div className="max-w-md md:max-w-none mx-auto">
        <ProfileHeader data={data} />

        <Section title="Work Experience">
          {data.experience.map((item, index) => (
            <WorkItem key={index} year={item.year} title={item.title} location={item.location} />
          ))}
        </Section>

        <Section title="Projects" gap="1.1rem">
          {data.projects.map((project, index) => (
            <ProjectItem
              key={index}
              title={project.title}
              tag={project.tag}
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
