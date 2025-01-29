export default function NotFound() {
  return (
    <>
      <div className="error-container">
        <div className="ghost-face">
          <div className="meta"></div>
          <div className="meta"></div>
        </div>
        <div className="error-title">
          <div>Oops!</div>
          <span className="p-nf">Page not found</span>
        </div>
        <div className="error-nav">
          <a href="/" className="return-link">
            ← Go Back
          </a>
        </div>
      </div>
    </>
  );
}
