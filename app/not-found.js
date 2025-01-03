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
          Home
        </a>
        <div className="social-links">
          <a href="https://github.com/dan10ish" className="social-link">
            GitHub
          </a>
          <a href="https://x.com/dan10ish" className="social-link">
            Twitter
          </a>
        </div>
      </div>
    </div>
  );
}
