import { data } from "./data";

export default function Home() {
  return (
    <div className="px-6 pt-6 pb-12">
      <div className="space-y-8">
        <div className="block w-full text-left text-[22px] md:text-[28px] leading-[1.1] font-semibold tracking-tight">
          {data.personal.name}
        </div>

        <div className="block w-full text-left text-[22px] md:text-[28px] leading-[1.1] font-semibold tracking-tight">
          {data.personal.title.join(" | ")}
        </div>

        <div className="space-y-2">
          <div className="text-[16px] md:text-[20px] leading-[1.1] font-medium text-secondary tracking-tight">Experience</div>
          <div className="space-y-2">
            {data.experience.map((item, index) => (
              <div
                key={index}
                className="block w-full text-left text-[22px] md:text-[28px] leading-[1.1] font-semibold tracking-tight"
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
              className="block w-full text-left text-[22px] md:text-[28px] leading-[1.1] font-semibold tracking-tight"
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
      </div>
    </div>
  );
}
