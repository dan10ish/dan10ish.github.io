import Velarko from "./components/velarko";
import PageTransition from "./components/PageTransition";
import { data } from "./data";

export default function Home() {
  return (
    <PageTransition>
      <div className="px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-12">
        <div className="text-[16px] font-medium leading-snug mb-6">
          {data.personal.name}
        </div>

        <div className="space-y-2 mb-7">
          <div className="text-[14px] font-normal leading-snug text-secondary">
            {data.personal.title.join(" · ")}
          </div>

          <div className="flex items-center gap-1.5 text-[14px] font-normal leading-snug text-secondary">
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
          </div>
        </div>

        <div>
          <div className="space-y-1">
            {data.social.map((item, index) => (
              <div key={index}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-[14px] font-normal leading-snug hover:opacity-50 transition-opacity"
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
                    className="opacity-40"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
