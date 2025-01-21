"use client";

import Link from "next/link";
import { Github, Mail } from "lucide-react";

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
            xmlns="http://www.w3.org/2000/svg"
            width="1200"
            height="1227"
            viewBox="0 0 1200 1227"
            fill="currentColor"
          >
            <path d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z" />
          </svg>
        </a>

        <a
          href="mailto:aansaridan@gmail.com"
          className="header-icon email-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect via email"
        >
          <Mail size={20} />
        </a>
      </div>
    </header>
  );
};

export default Header;
