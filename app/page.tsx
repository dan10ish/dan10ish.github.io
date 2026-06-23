import VelarkoLogo from "./components/velarko-logo";
import PageTransition from "./components/PageTransition";
import { data } from "./data";

export default function Home() {
  return (
    <PageTransition>
      <div className="px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-12">
        <div className="space-y-8">
          <div className="block w-full text-left text-[17px] leading-snug font-semibold tracking-tight">
            {data.personal.name}
          </div>

          <div className="block w-full text-left text-[14px] leading-snug font-medium tracking-tight text-secondary">
            {data.personal.title.join(" · ")}
          </div>

          <div className="flex items-center gap-2 text-[14px] leading-snug font-medium tracking-tight text-secondary">
            <span>Currently @</span>
            <a
              href="https://velarko.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-6 h-6 transition-transform duration-200 ease-out hover:scale-110"
              style={{ willChange: "transform" }}
              aria-label="Velarko"
            >
              <VelarkoLogo size={24} />
            </a>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-medium text-secondary tracking-widest uppercase">Socials</div>
            <div className="space-y-1.5">
              {data.social.map((item, index) => (
                <div key={index} className="block w-full text-left">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-[15px] leading-snug font-medium tracking-tight hover:opacity-50 transition-opacity"
                  >
                    {item.name}
                    <svg
                      width="13"
                      height="13"
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
      </div>
    </PageTransition>
  );
}
