"use client";

import { useState, useEffect, memo } from "react";
import ExifReader from "exifreader";
import Masonry from "react-masonry-css";
import { photoMetadata } from "@/lib/photo-meta";
import PhotoSkeleton from "./PhotoSkeleton";

const PhotoCard = memo(({ photo }) => (
  <div className="photo-card">
    <div className="photo-container">
      <img src={photo.src} alt="" loading="lazy" decoding="async" />
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
        <span>{photo.meta.aperture}</span>
        <span>{photo.meta.shutterspeed}</span>
      </div>
    </div>
  </div>
));

PhotoCard.displayName = "PhotoCard";

const formatMetadata = (tags, customData = {}) => {
  const getValue = (obj, path, defaultValue = "Unknown") => {
    return (
      path.split(".").reduce((acc, key) => acc?.[key], obj) ?? defaultValue
    );
  };

  const formatNumber = (value, decimals = 2) => {
    if (!value) return "Unknown";
    const num = parseFloat(value);
    return isNaN(num) ? "Unknown" : num.toFixed(decimals);
  };

  const focalLength = getValue(tags, "FocalLength.description", "").split(
    " ",
  )[0];
  const aperture = getValue(tags, "FNumber.description", "").replace("f/", "");

  return {
    camera:
      customData.camera ||
      getValue(tags, "Model.description", "Unknown").split(" back")[0],
    resolution: `${getValue(tags, "ImageWidth.value")} × ${getValue(tags, "ImageHeight.value")}`,
    iso: customData.iso || getValue(tags, "ISOSpeedRatings.value"),
    focalLength: customData.focalLength || `${formatNumber(focalLength, 1)}mm`,
    aperture: customData.aperture || `f/${formatNumber(aperture)}`,
    shutterspeed:
      customData.shutterspeed || getValue(tags, "ExposureTime.description"),
  };
};

const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const breakpointColumns = {
    default: 2,
    768: 2,
  };

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    const loadPhotos = async () => {
      try {
        const response = await fetch("/api/photos", {
          signal: controller.signal,
        });
        const photoFiles = await response.json();

        const loadedPhotos = await Promise.all(
          photoFiles.map(async (src, index) => {
            try {
              const fileResponse = await fetch(src, {
                signal: controller.signal,
              });
              const blob = await fileResponse.blob();
              const buffer = await blob.arrayBuffer();
              const tags = await ExifReader.load(buffer);

              const img = new Image();
              await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = src;
              });

              tags.ImageWidth = { value: img.naturalWidth };
              tags.ImageHeight = { value: img.naturalHeight };

              return {
                src,
                index,
                meta: formatMetadata(tags, photoMetadata[src] || {}),
              };
            } catch (error) {
              if (error.name === "AbortError") throw error;
              return {
                src,
                index,
                meta: formatMetadata({}, photoMetadata[src] || {}),
              };
            }
          }),
        );

        if (mounted) {
          setPhotos(loadedPhotos);
          setLoading(false);
        }
      } catch (error) {
        if (error.name !== "AbortError" && mounted) {
          console.error("Error loading photos:", error);
          setPhotos([]);
          setLoading(false);
        }
      }
    };

    loadPhotos();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  if (loading) return <PhotoSkeleton />;

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="photo-grid"
      columnClassName="photo-grid-column"
    >
      {photos.map((photo) => (
        <PhotoCard key={photo.src} photo={photo} />
      ))}
    </Masonry>
  );
};

export default memo(PhotoGrid);
