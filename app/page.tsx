"use client";
import Menu from "./components/menu";
import { data } from "./data";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <div className="px-8 pt-8 pb-12 md:px-10 md:pt-10 md:pb-12">
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
                  className="transition-opacity inline-flex items-center gap-1 group"
                >
                  <span className="group-hover:opacity-70 transition-opacity">{item.name}</span>
                  <ArrowUpRight className="w-5 h-5 text-secondary group-hover:text-[var(--link-blue)] transition-colors" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="text-[20px] md:text-[22px] leading-[1.1] font-semibold tracking-tight text-primary pt-4">
          <Link href="/finds" className="bg-[var(--border)] hover:ring-[var(--link-blue)] hover:ring-1 hover:text-[var(--link-blue)] transition-opacity px-3.5 py-2 rounded-xl transition-all duration-200">
            Finds
          </Link>
        </div>
      </div>
    </div>
  );
}
