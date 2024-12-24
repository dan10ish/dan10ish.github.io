"use client";

import { useState, useEffect, memo } from "react";
import ExifReader from "exifreader";
import Masonry from "react-masonry-css";
import { photoMetadata } from "@/lib/photo-meta";

const PhotoCard = memo(({ src, onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const loadPhoto = async () => {
      try {
        const response = await fetch(src);
        const blob = await response.blob();
        const buffer = await blob.arrayBuffer();
        const tags = await ExifReader.load(buffer);

        const img = new Image();
        await new Promise((resolve) => {
          img.onload = resolve;
          img.src = URL.createObjectURL(blob);
        });

        tags.ImageWidth = { value: img.naturalWidth };
        tags.ImageHeight = { value: img.naturalHeight };

        const customData = photoMetadata[src] || {};
        const meta = {
          camera:
            customData.camera ||
            tags.Model?.description?.split(" back")[0] ||
            "Unknown",
          resolution: `${tags.ImageWidth?.value} × ${tags.ImageHeight?.value}`,
          iso: customData.iso || tags.ISOSpeedRatings?.value || "Unknown",
          focalLength:
            customData.focalLength ||
            tags.FocalLength?.description?.split(" ")[0] + "mm" ||
            "Unknown",
          aperture:
            customData.aperture ||
            "f/" + tags.FNumber?.description?.replace("f/", "") ||
            "Unknown",
          shutterspeed:
            customData.shutterspeed ||
            tags.ExposureTime?.description ||
            "Unknown",
        };

        setMetadata(meta);
        setIsLoaded(true);
        onLoad();
      } catch (error) {
        const customData = photoMetadata[src] || {};
        setMetadata({
          camera: customData.camera || "Unknown",
          resolution: "Unknown",
          iso: customData.iso || "Unknown",
          focalLength: customData.focalLength || "Unknown",
          aperture: customData.aperture || "Unknown",
          shutterspeed: customData.shutterspeed || "Unknown",
        });
        setIsLoaded(true);
        onLoad();
      }
    };

    loadPhoto();
  }, [src, onLoad]);

  if (!isLoaded) {
    return (
      <div className="photo-card skeleton">
        <div className="photo-container">
          <div className="skeleton-img" />
        </div>
        <div className="photo-meta">
          <div className="meta-row">
            <div className="skeleton-text" />
          </div>
          <div className="meta-row">
            <div className="skeleton-text" />
          </div>
          <div className="meta-row">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton-stat" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="photo-card">
      <div className="photo-container">
        <img src={src} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="photo-meta">
        <div className="meta-row">
          <span>{metadata.camera}</span>
        </div>
        <div className="meta-row">
          <span>{metadata.resolution}</span>
        </div>
        <div className="meta-row">
          <span>ISO {metadata.iso}</span>
          <span>{metadata.focalLength}</span>
          <span>{metadata.aperture}</span>
          <span>{metadata.shutterspeed}</span>
        </div>
      </div>
    </div>
  );
});

PhotoCard.displayName = "PhotoCard";

const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("/api/photos");
        const photoUrls = await response.json();
        setPhotos(photoUrls);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  const handlePhotoLoad = () => {
    setLoadedCount((prev) => prev + 1);
  };

  return (
    <Masonry
      breakpointCols={{
        default: 2,
        768: 2,
      }}
      className="photo-grid"
      columnClassName="photo-grid-column"
    >
      {photos.map((src) => (
        <PhotoCard key={src} src={src} onLoad={handlePhotoLoad} />
      ))}
    </Masonry>
  );
};

export default memo(PhotoGrid);
