"use client";

import Link from "next/link";
import { Github } from "lucide-react";

const Header = () => {
  return (
    <header className="site-header">
      <Link href="/" className="site-title">
        Danish
      </Link>

      <div className="header-actions">
        <a
          href="https://github.com/dan10ish"
          target="_blank"
          rel="noopener noreferrer"
          className="header-icon header-icon-github"
          aria-label="Visit my GitHub profile"
        >
          <Github size={18} />
        </a>

        <a
          href="https://x.com/dan10ish"
          target="_blank"
          rel="noopener noreferrer"
          className="header-icon"
          aria-label="Visit my X profile"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 22 25"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="m11.385 10.729.082-.058-.082.058.89 1.273 6.33 9.056a.9.9 0 0 1-.737 1.415h-.609a.9.9 0 0 1-.738-.384l-5.765-8.246-.082.057.082-.057-.89-1.274L3.883 4.01a.9.9 0 0 1 .737-1.415h.61a.9.9 0 0 1 .737.384l5.418 7.75zm2.587-.509 6.806-7.911a.853.853 0 1 0-1.292-1.112l-6.203 7.21a.9.9 0 0 1-1.424-.078L7.082 1.377A1.1 1.1 0 0 0 6.175.9H1.9a1.1 1.1 0 0 0-.906 1.723l7.274 10.586a.9.9 0 0 1-.06 1.097L.994 22.69a.853.853 0 0 0 1.292 1.113l6.61-7.684a.9.9 0 0 1 1.425.077l5.103 7.426a1.1 1.1 0 0 0 .906.477h4.275a1.1 1.1 0 0 0 .907-1.723l-7.6-11.06a.9.9 0 0 1 .06-1.097z" />
          </svg>
        </a>
      </div>
    </header>
  );
};

export default Header;
