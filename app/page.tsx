import Velarko from "./components/velarko";
import PageTransition from "./components/PageTransition";
import { data } from "./data";

export default function Home() {
  return (
    <PageTransition>
      <main className="px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-12 max-w-xl">
        <article>
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
        </article>
      </main>
    </PageTransition>
  );
}
