"use client";

import { useState, useEffect } from "react";
import ExifReader from "exifreader";
import Masonry from "react-masonry-css";
import { photoMetadata } from "@/lib/photo-meta";

const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]);

  const formatMetadata = (tags, customData = {}) => {
    const formatNumber = (value, decimals = 2) => {
      const num = parseFloat(value);
      return isNaN(num) ? "Unknown" : num.toFixed(decimals);
    };

    const focalLength = tags.FocalLength?.description?.split(" ")[0] || "";
    const aperture = tags.FNumber?.description?.replace("f/", "") || "";
    const fileSize = (tags.FileSize?.value || 0) / (1024 * 1024);

    return {
      camera:
        customData.camera ||
        (tags.Model?.description || "Unknown").split(" back")[0],
      lens:
        customData.lens ||
        `${formatNumber(focalLength, 3)}mm f/${formatNumber(aperture)}`,
      resolution: `${tags.ImageWidth?.value || "Unknown"} × ${tags.ImageHeight?.value || "Unknown"}`,
      fileSize: `${fileSize.toFixed(1)} MB`,
      iso: customData.iso || tags.ISOSpeedRatings?.value || "Unknown",
      focalLength:
        customData.focalLength || `${formatNumber(focalLength, 3)}mm`,
      exposure:
        customData.exposure ||
        (tags.ExposureBiasValue?.description === "0"
          ? "0 ev"
          : tags.ExposureBiasValue?.description) ||
        "Unknown",
      aperture: customData.aperture || `f/${formatNumber(aperture)}`,
      shutterspeed:
        customData.shutterspeed || tags.ExposureTime?.description || "Unknown",
    };
  };

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const response = await fetch("/api/photos");
        const photoFiles = await response.json();

        const photoData = await Promise.all(
          photoFiles.map(async (src) => {
            try {
              const fileResponse = await fetch(src);
              const blob = await fileResponse.blob();
              const arrayBuffer = await blob.arrayBuffer();
              const tags = await ExifReader.load(arrayBuffer);
              const customData = photoMetadata[src] || {};

              const img = new Image();
              await new Promise((resolve) => {
                img.onload = resolve;
                img.src = src;
              });

              tags.ImageWidth = { value: img.naturalWidth };
              tags.ImageHeight = { value: img.naturalHeight };
              tags.FileSize = { value: blob.size };

              return { src, meta: formatMetadata(tags, customData) };
            } catch (error) {
              const customData = photoMetadata[src] || {};
              return { src, meta: formatMetadata({}, customData) };
            }
          }),
        );

        setPhotos(photoData);
      } catch (error) {
        setPhotos([]);
      }
    };

    loadPhotos();
  }, []);

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
      {photos.map((photo, index) => (
        <div key={index} className="photo-card">
          <div className="photo-container">
            <img src={photo.src} alt={`Photo ${index + 1}`} loading="lazy" />
          </div>
          <div className="photo-meta">
            <div className="meta-row">
              <span>{photo.meta.camera}</span>
            </div>
            <div className="meta-row">
              <span>{photo.meta.resolution}</span>
            </div>
            <div className="meta-row">
              <span>ISO {photo.meta.iso}</span>
              <span>{photo.meta.focalLength}</span>
              <span>{photo.meta.exposure}</span>
              <span>{photo.meta.aperture}</span>
              <span>{photo.meta.shutterspeed}</span>
            </div>
          </div>
        </div>
      ))}
    </Masonry>
  );
};

export default PhotoGrid;
