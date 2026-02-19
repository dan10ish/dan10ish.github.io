"use client";

import { useState } from "react";
import Link from "next/link";
import type contentJson from "./content.json";

type ContentType = typeof contentJson;

const SparkIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" />
  </svg>
);

const ChevronRightIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const ChevronLeftIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronDownIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const PlayIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const SendIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const YouTubeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const LinkedInIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const getSocialIcon = (icon: string) => {
  switch (icon) {
    case "x": return <XIcon size={15} />;
    case "instagram": return <InstagramIcon size={15} />;
    case "youtube": return <YouTubeIcon size={15} />;
    case "linkedin": return <LinkedInIcon size={15} />;
    case "github": return <GitHubIcon size={15} />;
    default: return null;
  }
};

const PlaceholderImage = ({ variant, className, style }: { variant: string; className?: string; style?: React.CSSProperties }) => {
  const gradients: Record<string, string> = {
    lyria: "linear-gradient(160deg, #86efac 0%, #4ade80 40%, #22c55e 70%, #16a34a 100%)",
    genie: "linear-gradient(160deg, #1e3a5f 0%, #1a2744 50%, #0d1a34 100%)",
    gemini: "linear-gradient(160deg, #e8f0ff 0%, #c7d9ff 50%, #a5c0ff 100%)",
    nano: "linear-gradient(160deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)",
    veo: "linear-gradient(160deg, #09090f 0%, #0f0f1a 50%, #020208 100%)",
    "news-dark": "linear-gradient(160deg, #1e2d48 0%, #162038 50%, #0c1628 100%)",
    "news-green": "linear-gradient(160deg, #a8e6a3 0%, #4ade80 100%)",
    "news-blue": "linear-gradient(160deg, #1e40af 0%, #1d4ed8 100%)",
    "news-gray": "linear-gradient(160deg, #374151 0%, #6b7280 100%)",
    podcast: "linear-gradient(160deg, #e5e7eb 0%, #f3f4f6 100%)",
  };

  return (
    <div
      className={className}
      style={{ background: gradients[variant] || gradients["news-dark"], width: "100%", height: "100%", ...style }}
    />
  );
};

function Navbar({ nav }: { nav: ContentType["nav"] & { siteName?: string } }) {
  return (
    <nav className="dm-nav">
      <div className="dm-nav-inner">
        <Link href="/deepmind" className="dm-logo">
          <span className="dm-logo-google">Google</span>
          <span className="dm-logo-deepmind">DeepMind</span>
          <span className="dm-logo-chevron">
            <ChevronDownIcon size={16} />
          </span>
        </Link>
        <div className="dm-nav-links">
          {nav.links.map((link) => (
            <Link key={link.href} href={link.href} className="dm-nav-link">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="dm-nav-cta">
          {nav.cta.map((item) =>
            item.variant === "outline" ? (
              <a key={item.label} href={item.href} className="dm-btn-outline" target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            ) : (
              <a key={item.label} href={item.href} className="dm-btn-filled" target="_blank" rel="noopener noreferrer">
                <SparkIcon size={14} />
                {item.label}
              </a>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

function HeroCarousel({ slides }: { slides: ContentType["hero"]["slides"] }) {
  const [offset, setOffset] = useState(0);
  const visibleCount = 3;
  const maxOffset = Math.max(0, slides.length - visibleCount);

  const slideColors = [
    { bg: "linear-gradient(160deg, #86efac 0%, #4ade80 40%, #22c55e 70%, #16a34a 100%)", textDark: true },
    { bg: "linear-gradient(160deg, #1e3a5f 0%, #1a2744 50%, #0d1a34 100%)", textDark: false },
    { bg: "linear-gradient(160deg, #e8f0ff 0%, #c7d9ff 50%, #a5c0ff 100%)", textDark: true },
    { bg: "linear-gradient(160deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)", textDark: true },
    { bg: "linear-gradient(160deg, #09090f 0%, #0f0f1a 50%, #020208 100%)", textDark: false },
  ];

  return (
    <section className="dm-hero">
      <div
        className="dm-carousel-track"
        style={{
          transform: `translateX(calc(-${offset} * (100% / ${visibleCount} + 5.5px)))`,
          transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          willChange: "transform",
        }}
      >
        {slides.map((slide, i) => {
          const colors = slideColors[i % slideColors.length];
          const isDark = !colors.textDark;
          return (
            <div key={slide.id} className="dm-carousel-slide">
              <div
                className="dm-carousel-slide-inner"
                style={{ background: colors.bg, color: isDark ? "#ffffff" : "#1a1a1a" }}
              >
                <div className="dm-slide-content">
                  <div>
                    <h3 className="dm-slide-title">{slide.title}</h3>
                    <p className="dm-slide-desc">{slide.description}</p>
                  </div>
                  <div className="dm-slide-actions">
                    <a
                      href={slide.learnMoreHref}
                      className="dm-slide-btn-outline"
                      style={isDark ? { borderColor: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.15)", color: "#fff" } : {}}
                    >
                      Learn more
                    </a>
                    <a
                      href={slide.tryHref}
                      className={isDark ? "dm-slide-btn-filled-light" : "dm-slide-btn-filled"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SparkIcon size={13} />
                      {slide.tryLabel}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="dm-carousel-controls">
        <button
          className="dm-carousel-btn"
          onClick={() => setOffset(Math.max(0, offset - 1))}
          disabled={offset === 0}
          aria-label="Previous"
        >
          <ChevronLeftIcon size={18} />
        </button>
        <button
          className="dm-carousel-btn"
          onClick={() => setOffset(Math.min(maxOffset, offset + 1))}
          disabled={offset >= maxOffset}
          aria-label="Next"
        >
          <ChevronRightIcon size={18} />
        </button>
      </div>
    </section>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  spark: <SparkIcon size={20} />,
  photo_spark: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  audio_spark: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  mic_detect_auto: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  video_spark: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  diamond: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
    </svg>
  ),
  language: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  genetics: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 2l4 4m0 0l-4 8m4-8l8-4m-8 4l4 8M6 14l8 4m0 0l4-8m-4 8l4 4M14 18l-8-4" />
    </svg>
  ),
  cyclone: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M12 2a10 10 0 1 0 0 20A10 10 0 1 0 12 2z" />
      <path d="M12 6a6 6 0 1 1 0 12" />
    </svg>
  ),
  photosphere: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <ellipse cx="12" cy="12" rx="10" ry="5" />
      <line x1="12" y1="2" x2="12" y2="22" />
    </svg>
  ),
  code: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  star: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

function ModelCard({ model }: { model: ContentType["models"]["items"][0] }) {
  const hasImages = "buildLabel" in model;
  return (
    <article className="dm-model-card">
      <div className="dm-model-header">
        <div className="dm-model-icon-row">
          <div className="dm-model-icon">{iconMap[model.icon] || <SparkIcon size={20} />}</div>
          {"badge" in model && model.badge && (
            <span className="dm-model-badge">{model.badge as string}</span>
          )}
        </div>
        <div>
          <h3 className="dm-model-title">{model.title}</h3>
          <p className="dm-model-desc">{model.description}</p>
        </div>
      </div>
      <div className="dm-model-try-section">
        <h4 className="dm-model-try-label">
          {hasImages && (model as { buildLabel?: string }).buildLabel ? (model as { buildLabel?: string }).buildLabel : "Try it in"}
        </h4>
        <div className="dm-model-try-links">
          {model.tryLinks.map((link) => (
            <a key={link.label} href={link.href} className="dm-model-try-link" target="_blank" rel="noopener noreferrer">
              <ChevronRightIcon size={15} />
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <a href={model.learnMoreHref} className="dm-model-learn-more">
        Learn more
      </a>
    </article>
  );
}

function ModelsSection({ models }: { models: ContentType["models"] }) {
  const [offset, setOffset] = useState(0);
  const perPage = 3;
  const maxOffset = Math.max(0, Math.ceil(models.items.length / perPage) - 1);
  const visibleItems = models.items.slice(offset * perPage, (offset + 1) * perPage);

  return (
    <>
      <div className="dm-divider" />
      <section className="dm-section">
        <div className="dm-section-header">
          <div className="dm-section-titles">
            <h3 className="dm-section-label">{models.sectionTitle}</h3>
            <p className="dm-section-subtitle">{models.sectionSubtitle}</p>
          </div>
          <Link href={models.viewAllHref} className="dm-view-all">
            View models
          </Link>
        </div>
        <div className="dm-models-track">
          {visibleItems.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
        <div className="dm-carousel-controls" style={{ marginTop: 16 }}>
          <button
            className="dm-carousel-btn"
            onClick={() => setOffset(Math.max(0, offset - 1))}
            disabled={offset === 0}
            aria-label="Previous"
          >
            <ChevronLeftIcon size={18} />
          </button>
          <button
            className="dm-carousel-btn"
            onClick={() => setOffset(Math.min(maxOffset, offset + 1))}
            disabled={offset >= maxOffset}
            aria-label="Next"
          >
            <ChevronRightIcon size={18} />
          </button>
        </div>
      </section>
    </>
  );
}

const newsPlaceholderVariants = ["news-dark", "news-green", "news-blue", "news-gray", "news-dark", "news-green", "news-blue", "news-gray"];

function NewsSection({ news }: { news: ContentType["news"] }) {
  return (
    <>
      <div className="dm-divider" />
      <section className="dm-section">
        <div className="dm-section-header">
          <h3 className="dm-section-label">{news.sectionTitle}</h3>
          <Link href={news.viewAllHref} className="dm-view-all">
            View news
          </Link>
        </div>
        <div className="dm-news-layout">
          <article className="dm-news-featured">
            <div>
              <h3 className="dm-news-featured-title">{news.featured.title}</h3>
              <div className="dm-news-meta" style={{ marginTop: 12 }}>
                <time>{news.featured.date}</time>
                <span className="dm-news-category">{news.featured.category}</span>
                <a href={news.featured.href} className="dm-news-learn-more">
                  <ChevronRightIcon size={14} />
                  Learn more
                </a>
              </div>
            </div>
            <div className="dm-news-featured-image">
              <PlaceholderImage variant="news-dark" />
              {news.featured.hasVideo && (
                <button className="dm-video-play-btn" style={{ position: "absolute", bottom: 16, right: 16 }} aria-label="Play video">
                  <PlayIcon size={20} />
                </button>
              )}
            </div>
          </article>
          <div className="dm-news-list">
            {news.items.map((item, i) => (
              <article key={i} className="dm-news-item">
                <div className="dm-news-item-content">
                  <h3 className="dm-news-item-title">{item.title}</h3>
                  <div className="dm-news-item-meta">
                    <time>{item.date}</time>
                    {"category" in item && item.category && <span className="dm-news-category">{item.category as string}</span>}
                    <a href={item.href} className="dm-news-item-link">
                      <ChevronRightIcon size={13} />
                      Learn more
                    </a>
                  </div>
                </div>
                {"imagePlaceholder" in item && item.imagePlaceholder && (
                  <div className="dm-news-item-thumb">
                    <PlaceholderImage variant={newsPlaceholderVariants[i % newsPlaceholderVariants.length]} />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PodcastSection({ podcast }: { podcast: ContentType["podcast"] }) {
  const [activeEpisode, setActiveEpisode] = useState(0);

  return (
    <>
      <div className="dm-divider" />
      <section className="dm-section">
        <div className="dm-section-header">
          <div className="dm-section-titles">
            <h3 className="dm-section-label">{podcast.sectionTitle}</h3>
            <p className="dm-section-subtitle">{podcast.sectionSubtitle}</p>
          </div>
          <Link href={podcast.learnMoreHref} className="dm-view-all">
            Learn more
          </Link>
        </div>
        <div className="dm-podcast-layout">
          <div className="dm-podcast-tabs" role="tablist" aria-label="Podcast episodes">
            {podcast.episodes.map((ep, i) => (
              <div
                key={ep.id}
                className={`dm-podcast-tab${i === activeEpisode ? " active" : ""}`}
                role="tab"
                tabIndex={0}
                aria-selected={i === activeEpisode}
                onClick={() => setActiveEpisode(i)}
                onKeyDown={(e) => e.key === "Enter" && setActiveEpisode(i)}
              >
                <h4 className="dm-podcast-tab-title">{ep.title}</h4>
                {i === activeEpisode && (
                  <p className="dm-podcast-tab-desc">{ep.description}</p>
                )}
              </div>
            ))}
          </div>
          <div
            className="dm-podcast-video"
            role="tabpanel"
            aria-label={podcast.episodes[activeEpisode].title}
          >
            <div className="dm-podcast-video-placeholder">
              <button className="dm-yt-play-btn" aria-label="Play video">
                <svg viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Footer({ footer }: { footer: ContentType["footer"] }) {
  const [email, setEmail] = useState("");

  return (
    <footer className="dm-footer">
      <div className="dm-footer-inner">
        <div className="dm-footer-top">
          <div className="dm-footer-social">
            <h4>Follow us</h4>
            <div className="dm-footer-social-links">
              {footer.socialLinks.map((s) => (
                <a key={s.icon} href={s.href} className="dm-social-link" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  {getSocialIcon(s.icon)}
                </a>
              ))}
            </div>
          </div>
          <div className="dm-footer-newsletter">
            <h4>{footer.newsletter.title}</h4>
            <p>
              I accept Google&apos;s Terms and Conditions and acknowledge that my information will be used in accordance with{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                Google&apos;s Privacy Policy
              </a>
              .
            </p>
            <div className="dm-newsletter-form">
              <input
                type="email"
                className="dm-newsletter-input"
                placeholder={footer.newsletter.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button className="dm-newsletter-btn" type="button">
                <SendIcon size={14} />
                {footer.newsletter.buttonLabel}
              </button>
            </div>
          </div>
        </div>
        <div className="dm-footer-main">
          <p className="dm-footer-tagline">{footer.tagline}</p>
          <div className="dm-footer-columns">
            {footer.columns.map((col) => (
              <div key={col.title} className="dm-footer-col">
                <h4>{col.title}</h4>
                <div className="dm-footer-col-links">
                  {col.links.map((link) => (
                    <a key={link.label} href={link.href} className="dm-footer-link" target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                      {"icon" in link && link.icon && (
                        <span className="dm-footer-link-icon">
                          {iconMap[link.icon as string] || <SparkIcon size={14} />}
                        </span>
                      )}
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="dm-footer-bottom">
          <a href="https://www.google.com" className="dm-footer-google-logo" target="_blank" rel="noopener noreferrer">
            Google
          </a>
          <div className="dm-footer-bottom-links">
            {footer.bottomLinks.map((link) => (
              <a key={link.label} href={link.href} className="dm-footer-bottom-link" target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function DeepMindClient({ content }: { content: ContentType }) {
  return (
    <div className="dm-page">
      <Navbar nav={content.nav} />
      <main id="page-content">
        <HeroCarousel slides={content.hero.slides} />
        <ModelsSection models={content.models} />
        <NewsSection news={content.news} />
        <PodcastSection podcast={content.podcast} />
      </main>
      <Footer footer={content.footer} />
    </div>
  );
}
