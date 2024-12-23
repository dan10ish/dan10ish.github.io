"use client";

import Masonry from "react-masonry-css";

const PhotoSkeleton = () => {
  const breakpointColumns = {
    default: 2,
    768: 2,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="photo-grid"
      columnClassName="photo-grid-column"
    >
      {[...Array(16)].map((_, index) => (
        <div key={index} className="photo-card skeleton">
          <div className="photo-container">
            <div className="skeleton-img"></div>
          </div>
          <div className="photo-meta">
            <div className="meta-row">
              <div className="skeleton-text"></div>
            </div>
            <div className="meta-row">
              <div className="skeleton-text"></div>
            </div>
            <div className="meta-row">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton-stat"></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </Masonry>
  );
};

export default PhotoSkeleton;
