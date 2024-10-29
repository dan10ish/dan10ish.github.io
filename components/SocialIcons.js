import { memo } from "react";

const SocialIcons = memo(() => (
  <div className="social-cards">
    <a
      href="mailto:aaansaridan@gmail.com"
      className="social-card"
      aria-label="Email"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    </a>

    <a
      href="https://x.com/dan10ish"
      target="_blank"
      rel="noopener noreferrer"
      className="social-card"
      aria-label="Twitter"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 22 25"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.3848 10.7287L11.4667 10.6714L11.3848 10.7287L12.275 12.0021L18.6059 21.0577C19.023 21.6542 18.5962 22.4733 17.8683 22.4733H17.259C16.9651 22.4733 16.6898 22.3299 16.5214 22.089L10.7564 13.8426L10.6744 13.8999L10.7564 13.8426L9.86614 12.5693L3.8825 4.0103C3.46544 3.41375 3.89224 2.59462 4.62011 2.59462H5.22938C5.52325 2.59462 5.79862 2.7381 5.967 2.97896L11.3848 10.7287ZM13.9718 10.2204L20.7782 2.30852C21.2537 1.75581 20.861 0.9 20.1319 0.9C19.8836 0.9 19.6476 1.00828 19.4856 1.19654L13.2829 8.40655C12.8978 8.85418 12.1933 8.81595 11.8589 8.32928L7.08193 1.37706C6.87674 1.07843 6.53765 0.9 6.17532 0.9H1.90043C1.01487 0.9 0.492315 1.89307 0.993826 2.62295L8.26781 13.2092C8.49916 13.5458 8.47472 13.9961 8.20829 14.3058L0.993884 22.6914C0.518369 23.2441 0.911055 24.1 1.64017 24.1C1.88851 24.1 2.12451 23.9917 2.28647 23.8035L8.89674 16.1196C9.28183 15.672 9.98637 15.7102 10.3208 16.1969L15.4235 23.623C15.6287 23.9216 15.9678 24.1 16.3301 24.1H20.605C21.4906 24.1 22.0132 23.1069 21.5117 22.3771L13.9123 11.317C13.681 10.9803 13.7054 10.53 13.9718 10.2204Z" />
      </svg>
    </a>

    <a
      href="https://github.com/dan10ish"
      target="_blank"
      rel="noopener noreferrer"
      className="social-card"
      aria-label="GitHub"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    </a>

    <a
      href="https://dan10ish.read.cv"
      target="_blank"
      rel="noopener noreferrer"
      className="social-card"
      aria-label="ReadCV"
    >
      <svg
        width="21"
        height="23"
        viewBox="0 0 21 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width="19"
          height="21"
          rx="3"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M5 6H15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5 10H15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5 14H12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </a>
  </div>
));

SocialIcons.displayName = "SocialIcons";

export default SocialIcons;
