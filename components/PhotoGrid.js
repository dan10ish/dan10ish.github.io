"use client";

import { useState, useEffect, memo, useCallback } from "react";
import ExifReader from "exifreader";
import Masonry from "react-masonry-css";
import { photoMetadata } from "@/lib/photo-meta";

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

const Skeleton = memo(() => (
  <div className="photo-card skeleton">
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
));

Skeleton.displayName = "Skeleton";

const PhotoGrid = () => {
  const [loading, setLoading] = useState(true);
  const [totalPhotos, setTotalPhotos] = useState(16);
  const [loadedPhotos, setLoadedPhotos] = useState([]);

  const breakpointColumns = {
    default: 3,
    768: 2,
  };

  const processPhoto = useCallback(async (src, index) => {
    try {
      const fileResponse = await fetch(src);
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
      return {
        src,
        index,
        meta: formatMetadata({}, photoMetadata[src] || {}),
      };
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const loadPhotos = async () => {
      try {
        const response = await fetch("/api/photos", {
          signal: controller.signal,
        });
        const photoFiles = await response.json();

        if (!mounted) return;
        setTotalPhotos(photoFiles.length);

        for (let i = 0; i < photoFiles.length; i++) {
          if (!mounted) break;
          const photoData = await processPhoto(photoFiles[i], i);
          setLoadedPhotos((prev) => {
            const newPhotos = [...prev];
            newPhotos[photoData.index] = photoData;
            return newPhotos;
          });
        }
        setLoading(false);
      } catch (error) {
        if (error.name !== "AbortError" && mounted) {
          console.error("Error loading photos:", error);
          setLoading(false);
        }
      }
    };

    loadPhotos();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [processPhoto]);

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
    const aperture = getValue(tags, "FNumber.description", "").replace(
      "f/",
      "",
    );

    return {
      camera:
        customData.camera ||
        getValue(tags, "Model.description", "Unknown").split(" back")[0],
      resolution: `${getValue(tags, "ImageWidth.value")} × ${getValue(tags, "ImageHeight.value")}`,
      iso: customData.iso || getValue(tags, "ISOSpeedRatings.value"),
      focalLength:
        customData.focalLength || `${formatNumber(focalLength, 1)}mm`,
      aperture: customData.aperture || `f/${formatNumber(aperture)}`,
      shutterspeed:
        customData.shutterspeed || getValue(tags, "ExposureTime.description"),
    };
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumns}
        className="photo-grid"
        columnClassName="photo-grid-column"
      >
        {[...Array(totalPhotos)].map((_, index) =>
          loadedPhotos[index] ? (
            <PhotoCard key={`photo-${index}`} photo={loadedPhotos[index]} />
          ) : (
            <Skeleton key={`skeleton-${index}`} />
          ),
        )}
      </Masonry>
      <div className="copy-footer">
        Copyright <span className="at">&copy;</span> {new Date().getFullYear()}{" "}
        Danish
      </div>
    </>
  );
};

export default memo(PhotoGrid);
