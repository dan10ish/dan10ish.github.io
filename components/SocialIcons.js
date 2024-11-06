import { memo } from "react";
import { Github, FileText, Mail, Linkedin } from "lucide-react";

const SocialIcons = memo(() => (
  <div className="social-icons">
    Elsewhere :
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
      <Linkedin strokeWidth={1.5} />
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
