"use client";

import React from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";

const PicturesSection = React.forwardRef(({ images }, ref) => {
  return (
    <section className="pictures-section" ref={ref}>
      <h1>Pictures</h1>
      <Masonry
        breakpointCols={{ default: 3, 1200: 3, 768: 2, 480: 2 }}
        className="masonry-container"
        columnClassName="masonry-item"
      >
        {images.map((image, index) => (
          <div key={index}>
            <Image
              src={`/images/${image}`}
              alt={`Image ${index + 1}`}
              width={300}
              height={300}
              loading="lazy"
              placeholder="blur"
              blurDataURL={`/images/${image}?w=40&q=10`}
              style={{ borderRadius: "var(--border-radius)" }}
            />
          </div>
        ))}
      </Masonry>
    </section>
  );
});

PicturesSection.displayName = "PicturesSection";

export default PicturesSection;
