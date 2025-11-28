"use client";
import Menu from "./components/Menu";
import { data } from "./data";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-12">
      <Menu />
      <div className="space-y-8">
        <div className="block w-full text-left text-[22px] md:text-[24px] leading-[1.1] font-semibold tracking-tight">
          {data.personal.name}
        </div>

        <div className="block w-full text-left text-[22px] md:text-[24px] leading-[1.1] font-semibold tracking-tight">
          {data.personal.title.join(" | ")}
        </div>

        <div className="space-y-2">
          <div className="text-[16px] md:text-[20px] leading-[1.1] font-medium text-secondary tracking-tight">Experience</div>
          <div className="space-y-2">
            {data.experience.map((item, index) => (
              <div
                key={index}
                className="block w-full text-left text-[22px] md:text-[24px] leading-[1.1] font-semibold tracking-tight"
              >
                {item.company} ({item.year})
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[16px] md:text-[20px] leading-[1.1] font-medium text-secondary tracking-tight">Socials</div>
          <div className="space-y-2">
            {data.social.map((item, index) => (
              <div
                key={index}
                className="block w-full text-left text-[22px] md:text-[24px] leading-[1.1] font-semibold tracking-tight"
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-50 transition-opacity"
                >
                  {item.name}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="text-[18px] md:text-[22px] leading-[1.1] font-semibold tracking-tight text-primary pt-4">
          <Link href="/finds" className="hover:opacity-80 transition-opacity bg-[var(--border)] px-3.5 py-2 rounded-lg">
            Finds
          </Link>
        </div>
      </div>
    </div>
  );
}
