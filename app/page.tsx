import Velarko from "./components/velarko";
import PageTransition from "./components/PageTransition";
import { data } from "./data";

export default function Home() {
  return (
    <PageTransition>
      <main className="page-main">
        <div className="col-intro">
          <header className="mb-8">
            <h1 className="text-[16px] font-medium leading-snug">
              {data.personal.name}
            </h1>
          </header>

          <section className="space-y-2 mb-10" aria-label="About">
            <p className="text-[16px] font-normal leading-snug text-secondary">
              {data.personal.title.join(" · ")}
            </p>

            <p className="flex items-center gap-1.5 text-[16px] font-normal leading-snug text-secondary">
              <span>Currently @</span>
              <a
                href="https://velarko.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-[26px] h-[26px] transition-transform duration-200 ease-out hover:scale-110"
                style={{ willChange: "transform" }}
                aria-label="Velarko"
              >
                <Velarko size={26} />
              </a>
            </p>

            <p className="text-[15px] leading-relaxed text-secondary">
              {data.personal.about}
            </p>
          </section>

          <section className="mb-10" aria-label="Work">
            <h2 className="section-label">Work</h2>
            <ul className="space-y-1 list-none p-0 m-0">
              {data.experience.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between text-[15px]"
                >
                  <span className="text-foreground">{item.company}</span>
                  <span className="text-secondary tabular-nums text-[14px]">
                    {item.year}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <nav aria-label="Social links">
            <ul className="space-y-0.5 list-none p-0 m-0 -ml-2.5">
              {data.social.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link inline-flex items-center gap-0.5 text-[16px] font-normal leading-snug px-2.5 py-1 rounded-md"
                  >
                    {item.name}
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
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="col-projects">
          <section aria-label="Projects">
            <h2 className="section-label">Projects</h2>
            <ul className="list-none p-0 m-0">
              {data.projects.map((project, i) => (
                <li key={i} className="project-row">
                  <span className="project-title">{project.title}</span>
                  <span className="project-tag">{project.tag}</span>
                  <span className="project-links">
                    <a
                      href={project.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      aria-label={`${project.title} source`}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label={`${project.title} live`}
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 17L17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                      </a>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
