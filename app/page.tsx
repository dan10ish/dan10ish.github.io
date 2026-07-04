import Velarko from "./components/velarko";
import PageTransition from "./components/PageTransition";
import { data } from "./data";

export default function Home() {
  return (
    <PageTransition>
      <main className="page-main">
        <div className="col-intro">
          <header className="intro-block">
            <h1 className="text-[15px] font-medium leading-snug">
              {data.personal.name}
            </h1>
          </header>

          <p className="intro-block text-[15px] font-normal leading-snug text-secondary">
            {data.personal.title.join(" · ")}
          </p>

          <p className="intro-block flex items-center gap-1.5 text-[15px] font-normal leading-snug text-secondary">
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

          <p className="intro-block text-[15px] leading-relaxed text-secondary">
            {data.personal.about}
          </p>

          <nav aria-label="Social links">
            <ul className="space-y-0.5 list-none p-0 m-0 -ml-2.5">
              {data.social.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link inline-flex items-center gap-0.5 text-[15px] font-normal leading-snug px-2.5 py-1 rounded-md"
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
                  <span className="project-links">
                    <a
                      href={project.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-text-link project-text-link-code"
                    >
                      Code
                    </a>
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-text-link project-text-link-live"
                      >
                        Link
                      </a>
                    ) : (
                      <span className="project-text-link project-text-link-live project-text-link-disabled">
                        Link
                      </span>
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
