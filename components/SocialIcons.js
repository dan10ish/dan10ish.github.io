import { memo } from "react";
import { Github, FileText, Mail } from "lucide-react";

const SocialIcons = memo(() => (
  <div className="social-icons">
    <a
      href="mailto:aaansaridan@gmail.com"
      className="social-icon"
      aria-label="Email"
    >
      <Mail strokeWidth={1.5} />
    </a>

    <a
      href="https://github.com/dan10ish"
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon"
      aria-label="GitHub"
    >
      <Github strokeWidth={1.5} />
    </a>

    <a
      href="https://linkedin.com/in/dan10ish"
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon"
      aria-label="LinkedIn"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        stroke="currentColor"
        stroke-width="1.2"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
      </svg>
    </a>

    <a
      href="https://leetcode.com/u/dan10ish/"
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon"
      aria-label="LeetCode"
    >
      <svg
        width="22"
        height="24"
        viewBox="0 0 22 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.6098 18.136L12.6968 22.049C12.3967 22.3505 12.04 22.5897 11.6472 22.7529C11.2544 22.9161 10.8332 23.0001 10.4078 23.0001C9.98245 23.0001 9.56128 22.9161 9.16847 22.7529C8.77567 22.5897 8.41897 22.3505 8.11886 22.049L2.39638 16.3268C2.09494 16.0267 1.85575 15.67 1.69254 15.2772C1.52933 14.8843 1.44531 14.4632 1.44531 14.0378C1.44531 13.6124 1.52933 13.1913 1.69254 12.7984C1.85575 12.4056 2.09494 12.0489 2.39638 11.7488L8.11886 6.02628C8.41897 5.72484 8.77567 5.48564 9.16847 5.32243C9.56128 5.15921 9.98245 5.0752 10.4078 5.0752C10.8332 5.0752 11.2544 5.15921 11.6472 5.32243C12.04 5.48564 12.3967 5.72484 12.6968 6.02628L16.9995 10.3289"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.11865 6.02615L13.1999 1"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.58496 14.0264H20.7075"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </a>

    <a
      href="https://dan10ish.read.cv"
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon"
      aria-label="ReadCV"
    >
      <FileText strokeWidth={1.5} />
    </a>
  </div>
));

SocialIcons.displayName = "SocialIcons";

export default SocialIcons;
