import VelarkoLogo from "./components/velarko.svg";
import EmailCopyButton from "./components/EmailCopyButton";
import PageTransition from "./components/PageTransition";
import ProjectsGrid from "./components/ProjectsGrid";
import { data } from "./data";

export default function Home() {
  return (
    <PageTransition>
      <main className="max-w-[800px] px-6 md:px-10 lg:px-12 py-12">
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-6">
            <header>
              <h1 className="text-[14px] font-medium leading-snug">
                {data.personal.name}
              </h1>
            </header>

            <div className="flex flex-col gap-6">
              <p className="text-[14px] font-normal leading-snug text-secondary">
                {data.personal.title.join(" · ")}
              </p>
              {data.personal.about && (
                <p className="text-[14px] font-normal leading-snug text-secondary">
                  {data.personal.about}
                </p>
              )}
            </div>

            <p className="flex items-center gap-1.5 text-[14px] font-normal leading-snug text-secondary">
              <span>Currently @</span>
              <a
                href="https://velarko.com"
                target="_blank"
                rel="noopener noreferrer"
                className="velarko-logo inline-flex items-center justify-center w-[26px] h-[26px]"
                aria-label="Velarko"
              >
                <VelarkoLogo width={26} height={26} />
              </a>
            </p>
          </div>

          <ProjectsGrid projects={data.projects} />

          <nav aria-label="Social links">
            <ul className="flex flex-col gap-1.5 list-none p-0 m-0 -ml-2.5">
              {data.social.map((item, index) => {
                const isEmail = item.name === "Email";
                const email = isEmail ? item.url.replace("mailto:", "") : "";

                return (
                  <li key={index} className="flex items-center">
                    <a
                      href={item.url}
                      target={isEmail ? undefined : "_blank"}
                      rel={isEmail ? undefined : "noopener noreferrer"}
                      className={`social-link inline-flex items-center gap-1.5 text-[14px] font-normal leading-snug px-2.5 py-1 rounded-md ${
                        isEmail ? "email-social-link" : ""
                      }`}
                    >
                      {isEmail ? (
                        item.name
                      ) : (
                        <span className="social-text">
                          <span className="social-name">{item.name}</span>
                          <span className="social-username">@{item.username}</span>
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
    </PageTransition>
  );
}
