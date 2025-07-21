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
  education: { year: string; institution: string; degree: string; location: string }[];
  contact: { platform: string; handle: string; url: string }[];
}

const ProfileHeader = memo<{ data: Data }>(({ data }) => (
  <div className="mb-8 md:mb-12">
    <div className="flex items-center gap-4 mb-6 md:mb-9">
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
      <h2 className="text-sm font-semibold mb-4 md:mb-6 text-heading">About</h2>
      <p className="text-sm text-secondary leading-relaxed">
        {data.bio}
      </p>
    </div>
  </div>
));

const Section = memo<{ title: string; children: React.ReactNode; className?: string }>(({ title, children, className = "" }) => (
  <div className={`mb-8 md:mb-12 ${className}`}>
    <h2 className="text-sm font-semibold mb-4 md:mb-6 text-heading">{title}</h2>
    <div className="space-y-6 md:space-y-0">
      {children}
    </div>
  </div>
));

const WorkItem = memo<{ 
  year: string; 
  title: string; 
  location?: string; 
  isFirst?: boolean;
}>(({ year, title, location, isFirst = false }) => (
  <div className={`flex flex-col md:flex-row gap-4 md:gap-9 ${!isFirst ? 'pt-6 md:pt-6' : ''}`}>
    <div className="w-full md:w-28 flex-shrink-0">
      <p className="text-sm text-tertiary">{year}</p>
    </div>
    <div className="flex-1 pb-0 md:pb-3">
      <div className="mb-2">
        <h3 className="text-sm font-normal text-foreground leading-relaxed">
          {title}
        </h3>
      </div>
      {location && (
        <p className="text-sm text-secondary mb-2">{location}</p>
      )}
    </div>
  </div>
));

const ProjectItem = memo<{ 
  title: string; 
  description?: string;
  live?: string;
  source?: string;
  isFirst?: boolean;
}>(({ title, description, live, source, isFirst = false }) => (
  <div className={`flex flex-col md:flex-row gap-4 md:gap-9 ${!isFirst ? 'pt-6 md:pt-6' : ''}`}>
    <div className="w-full md:w-28 flex-shrink-0">
      <p className="text-sm text-tertiary">{title}</p>
    </div>
    <div className="flex-1 pb-0 md:pb-3">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex-1">
          {description && (
            <p className="text-sm text-secondary mb-3">{description}</p>
          )}
        </div>
        {(live || source) && (
          <div className="flex items-center gap-4 flex-shrink-0">
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-secondary hover:text-link-hover text-xs"
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
                className="flex items-center gap-1.5 text-secondary hover:text-link-hover text-xs"
                aria-label="View source code"
              >
                <Github size={12} />
                <span>Source</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
));

const EducationItem = memo<{ 
  year: string; 
  institution: string; 
  degree: string;
  location: string; 
  isFirst?: boolean;
}>(({ year, institution, degree, location, isFirst = false }) => (
  <div className={`flex flex-col md:flex-row gap-4 md:gap-9 ${!isFirst ? 'pt-6 md:pt-6' : ''}`}>
    <div className="w-full md:w-28 flex-shrink-0">
      <p className="text-sm text-tertiary">{year}</p>
    </div>
    <div className="flex-1 pb-0 md:pb-3">
      <div className="mb-2">
        <h3 className="text-sm font-normal text-foreground leading-relaxed mb-1">
          {institution}
        </h3>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <p className="text-sm text-secondary">{degree}</p>
          <p className="text-sm text-secondary md:text-right">{location}</p>
        </div>
      </div>
    </div>
  </div>
));

const ContactItem = memo<{ platform: string; handle: string; url: string; isFirst?: boolean }>(({ platform, handle, url, isFirst = false }) => (
  <div className={`flex flex-row gap-4 md:gap-9 ${!isFirst ? 'py-2 md:py-2' : 'pb-2 md:pb-2'}`}>
    <div className="w-20 md:w-28 flex-shrink-0">
      <p className="text-sm text-tertiary">{platform}</p>
    </div>
    <div className="flex-1">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-normal text-foreground hover:text-link-hover group inline-flex items-center gap-1"
      >
        {handle}
        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100" />
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
    <main className="max-w-sm md:max-w-2xl mx-auto px-6 md:px-12 py-6 md:py-18 font-sans text-sm bg-background text-foreground min-h-screen">
      <div className="max-w-md md:max-w-none mx-auto">
        <ProfileHeader data={data} />

        <Section title="Work Experience">
          {data.experience.map((item, index) => (
            <WorkItem
              key={index}
              year={item.year}
              title={item.title}
              location={item.location}
              isFirst={index === 0}
            />
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
              isFirst={index === 0}
            />
          ))}
        </Section>

        <Section title="Education">
          {data.education.map((item, index) => (
            <EducationItem
              key={index}
              year={item.year}
              institution={item.institution}
              degree={item.degree}
              location={item.location}
              isFirst={index === 0}
            />
          ))}
        </Section>

        <Section title="Contact" className="mb-6">
          {data.contact.map((item, index) => (
            <ContactItem
              key={index}
              platform={item.platform}
              handle={item.handle}
              url={item.url}
              isFirst={index === 0}
            />
          ))}
        </Section>
      </div>
    </main>
  );
}
