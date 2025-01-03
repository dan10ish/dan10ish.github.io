export default function NotFound() {
  return (
    <div className="error-container">
      <div className="ghost-face">
        <div className="meta" />
        <div className="meta" />
      </div>

      <div>
        <h1 className="error-title">404</h1>
        <p>Page not found</p>
      </div>

      <div className="error-nav">
        <a href="https://danish.bio" className="return-link">
          Return Home
        </a>
      </div>

      <div className="social-links">
        <a
          href="https://github.com/dan10ish"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          GitHub
        </a>
        <span className="divider">·</span>
        <a
          href="https://x.com/dan10ish"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          Twitter
        </a>
      </div>
    </div>
  );
}
