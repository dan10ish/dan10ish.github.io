import { Github } from "lucide-react";

export default function NotFound() {
  return (
    <div className="error-container">
      <div className="error-content">
        <div className="ghost-face">
          <div className="meta" />
          <div className="meta" />
        </div>
        <h1 className="error-title">404</h1>
        <p>Page not found</p>
      </div>

      <div className="error-nav">
        <a href="/" className="return-link">
          Return to Homepage
        </a>
        <div className="social-links">
          <a href="https://github.com/dan10ish" className="social-link">
            <Github size={24} />
          </a>
          <a href="https://x.com/dan10ish" className="social-link error-x-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
            >
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
