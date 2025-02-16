// Add LucideIcon wrapper at the top
const LucideIcon = ({ icon: Icon, ...props }) => {
  return <Icon strokeWidth={`var(--icon-stroke-width)`} {...props} />;
};

export default function ShareButton({ slug }) {
  // ... existing state and other code ...

  return (
    <div className="share-buttons">
      <button onClick={handleShare} className="share-button">
        <LucideIcon icon={Share2} size={20} />
      </button>
      {/* Update other share icons */}
      <button onClick={handleCopy} className={`share-copy ${copied ? "share-copied" : ""}`}>
        {copied ? (
          <LucideIcon icon={Check} size={20} />
        ) : (
          <LucideIcon icon={Link2} size={20} />
        )}
      </button>
    </div>
  );
} 