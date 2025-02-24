"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!imageRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              observer.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: "50px",
      }
    );

    observer.observe(imageRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`image-container ${className}`} style={{ position: "relative" }}>
      {isLoading && (
        <div
          className="image-placeholder"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "var(--code-background-color)",
            borderRadius: "inherit",
          }}
        />
      )}
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        onLoadingComplete={() => setIsLoading(false)}
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
      />
    </div>
  );
};

export default OptimizedImage; 