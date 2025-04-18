import ProjectLink from './components/ProjectLink';
import SocialLinks from './components/SocialLinks';
import { personalInfo, projects } from './data';

export default function Home() {
  return (
    <div className="h-fit max-w-2xl mx-auto">
      <main className="space-y-6">
        {/* Header */}
        <section className="space-y-0">
          <h1 className="text-base font-bold header-text">{personalInfo.name}</h1>
          <p className="text-base opacity-70 mt-0">{personalInfo.location}</p>
        </section>

        {/* Bio */}
        <section>
          <p className="text-base">
            {personalInfo.profession}. {personalInfo.about}
          </p>
        </section>

        {/* Contact */}
        <section>
          <div className="flex items-center gap-2">
            <div className="text-[0.9rem] mb-0 flex items-center">get in touch:</div>
            <SocialLinks 
              github={personalInfo.socials.github}
              email={personalInfo.socials.email}
              x={personalInfo.socials.x}
              instagram={personalInfo.socials.instagram}
            />
          </div>
        </section>

        {/* Projects */}
        <section>
          <h1 className="text-base opacity-70">projects</h1>
          <div className="mt-1 project-list">
            {projects.map((project, index) => (
              <ProjectLink 
                key={index} 
                name={project.name}
                sourceCode={project.sourceCode}
                liveDemo={project.liveDemo}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
