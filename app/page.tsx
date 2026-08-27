import { promises as fs } from 'fs';
import path from 'path';
import { memo } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import EmailCopyButton from './components/EmailCopyButton';


interface Data {
  name: string;
  bio: string;
  website: string;
  experience: { year: string; title: string; location: string }[];
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
      <ThemeToggle />
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

ProfileHeader.displayName = 'ProfileHeader';
Section.displayName = 'Section';
WorkItem.displayName = 'WorkItem';
EducationItem.displayName = 'EducationItem';

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


        <Section title="Education">
          {data.education.map((item, index) => (
            <EducationItem key={index} year={item.year} institution={item.institution} degree={item.degree} />
          ))}
        </Section>

        <Section title="Contact" isLast={true}>
          <nav aria-label="Social links">
            <ul className="flex flex-col gap-1.5 list-none p-0 m-0 -ml-2.5">
              {data.contact.map((item, index) => {
                const isEmail = item.platform === "Email";
                const email = isEmail ? item.url.replace("mailto:", "") : "";

                return (
                  <li key={index} className="flex items-center">
                    <a
                      href={item.url}
                      target={isEmail ? undefined : "_blank"}
                      rel={isEmail ? undefined : "noopener noreferrer"}
                      className={`social-link inline-flex items-center gap-1.5 font-normal leading-snug px-2.5 py-1 rounded-md ${
                        isEmail ? "email-social-link" : ""
                      }`}
                      style={{ fontSize: 'var(--font-sm)' }}
                    >
                      {isEmail ? (
                        item.platform
                      ) : (
                        <span className="social-text">
                          <span className="social-name">{item.platform}</span>
                          <span className="social-username">@{item.handle}</span>
                        </span>
                      )}
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="social-chevron shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </a>
                    {isEmail && <EmailCopyButton email={email} />}
                  </li>
                );
              })}
            </ul>
          </nav>
        </Section>

        
      </div>
    </main>
  );
}
