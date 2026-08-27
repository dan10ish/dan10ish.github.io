import { promises as fs } from 'fs';
import path from 'path';
import { ThemeToggle } from './components/ThemeToggle';
import EmailCopyButton from './components/EmailCopyButton';
import VelarkoLogo from './components/velarko.svg';

interface Data {
  name: string;
  title: string[];
  about: string;
  website: string;
  contact: { platform: string; handle: string; url: string }[];
}

export default async function Home() {
  const file = await fs.readFile(path.join(process.cwd(), 'app/data.json'), 'utf8');
  const data: Data = JSON.parse(file);

  return (
    <main className="max-w-sm md:max-w-2xl mx-auto px-7 md:px-12 py-12 md:py-18 bg-background text-foreground min-h-screen">
      <div className="max-w-md md:max-w-none mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="font-normal text-foreground leading-tight" style={{ fontSize: 'var(--font-lg)' }}>
            {data.name}
          </h1>
          <ThemeToggle />
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-secondary leading-snug" style={{ fontSize: 'var(--font-sm)' }}>
            {data.title.join(' · ')}
          </p>
          {data.about && (
            <p className="text-secondary leading-snug" style={{ fontSize: 'var(--font-sm)' }}>
              {data.about}
            </p>
          )}
        </div>

        <p className="flex items-center gap-1.5 text-secondary" style={{ fontSize: 'var(--font-sm)' }}>
          <span>Currently @</span>
          <a
            href="https://velarko.com"
            target="_blank"
            rel="noopener noreferrer"
            className="velarko-logo"
            aria-label="Velarko"
          >
            <span className="velarko-logo-inner">
              <VelarkoLogo width={104} height={104} />
            </span>
          </a>
        </p>

        <nav aria-label="Social links" className="pt-2">
          <ul className="flex flex-col gap-1.5 list-none p-0 m-0 -ml-2.5">
            {data.contact.map((item, index) => {
              const isEmail = item.platform === 'Email';
              const email = isEmail ? item.url.replace('mailto:', '') : '';

              return (
                <li key={index} className="flex items-center">
                  <a
                    href={item.url}
                    target={isEmail ? undefined : '_blank'}
                    rel={isEmail ? undefined : 'noopener noreferrer'}
                    className={`social-link inline-flex items-center gap-1.5 font-normal leading-snug px-2.5 py-1 rounded-md ${
                      isEmail ? 'email-social-link' : ''
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
      </div>
    </main>
  );
}
