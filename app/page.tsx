import SocialLinks from "./components/SocialLinks";
import { personalInfo, experience } from "./data";
import { getSortedWritingsData } from "../lib/writings";
import { ThemeToggle } from "./components/ThemeToggle";
import HomeWritingsSection from "./components/HomeWritingsSection";

export default function Home() {
  const writings = getSortedWritingsData();

  return (
    <div className="h-fit max-w-2xl mx-auto">
      <main className="space-y-6">
        <section className="space-y-0">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-bold header-text">
              {personalInfo.name}
            </h1>
            <ThemeToggle />
          </div>
        </section>

        <section>
          <h1 className="text-base opacity-70">About</h1>
          <p className="text-base">{personalInfo.about}</p>
          <div className="!mt-4">
            {experience.map((exp, index) => (
              <div key={index} className="flex gap-2 w-full items-baseline justify-between">
                <span className="text-base">{exp.company}</span>
                <span className="text-secondary !text-[0.82rem] flex-shrink-0">
                  {exp.startYear} → {exp.endYear || <span className="animated-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SocialLinks
            github={personalInfo.socials.github}
            email={personalInfo.socials.email}
            x={personalInfo.socials.x}
            instagram={personalInfo.socials.instagram}
            linkedin={personalInfo.socials.linkedin}
            snapchat={personalInfo.socials.snapchat}
          />
        </section>

        <HomeWritingsSection writings={writings} />
      </main>
    </div>
  );
}
