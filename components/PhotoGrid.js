"use client";

import { useState, useEffect, memo, useCallback } from "react";
import ExifReader from "exifreader";
import Masonry from "react-masonry-css";
import {
  Camera,
  Maximize2,
  Frame,
  Target,
  Aperture,
  Timer,
  ChevronUp,
} from "lucide-react";
import { photoMetadata } from "@/lib/photo-meta";
import ButtonsContainer from "./ButtonsContainer";

const PhotoMeta = memo(({ meta, isVisible, onClose }) => (
  <div className={`photo-meta ${isVisible ? 'visible' : ''}`} onClick={onClose}>
    <div className="meta-content">
      <div className="meta-row">
        <Camera size={14} className="meta-icon" />
        <span>{meta.camera}</span>
      </div>
      <div className="meta-row">
        <Maximize2 size={14} className="meta-icon" />
        <span>{meta.resolution}</span>
      </div>
      <div className="meta-row">
        <Frame size={14} className="meta-icon" />
        <span>ISO {meta.iso}</span>
        <Aperture size={14} className="meta-icon" />
        <span>{meta.aperture}</span>
      </div>
      <div className="meta-row">
        <Target size={14} className="meta-icon" />
        <span>{meta.focalLength}</span>
        <Timer size={14} className="meta-icon" />
        <span>{meta.shutterspeed}</span>
      </div>
    </div>
  </div>
));

const PhotoCard = memo(({ photo, isMetaVisible, onMetaToggle }) => (
  <div className="photo-card">
    <div className="photo-container">
      <img 
        src={photo.src} 
        alt="" 
        loading="lazy" 
        decoding="async" 
        onClick={() => !isMetaVisible && onMetaToggle(photo.index)}
        style={{ cursor: !isMetaVisible ? 'pointer' : 'default' }}
      />
      <button 
        className="meta-toggle-button" 
        onClick={() => onMetaToggle(photo.index)}
      >
        <ChevronUp size={20} strokeWidth={2.5} />
      </button>
      <PhotoMeta 
        meta={photo.meta} 
        isVisible={isMetaVisible} 
        onClose={() => onMetaToggle(null)} 
      />
    </div>
  </div>
));

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
    </div>
  </div>
));

const PhotoGrid = () => {
  const [loading, setLoading] = useState(true);
  const [totalPhotos, setTotalPhotos] = useState(16);
  const [loadedPhotos, setLoadedPhotos] = useState([]);
  const [activeMetaIndex, setActiveMetaIndex] = useState(null);

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 2,
  };

  const handleMetaToggle = useCallback((index) => {
    setActiveMetaIndex(current => current === index ? null : index);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.photo-meta') && !e.target.closest('.meta-toggle-button')) {
        setActiveMetaIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      " "
    )[0];
    const aperture = getValue(tags, "FNumber.description", "").replace(
      "f/",
      ""
    );

    return {
      camera:
        customData.camera ||
        getValue(tags, "Model.description", "Unknown").split(" back")[0],
      resolution: `${getValue(tags, "ImageWidth.value")} × ${getValue(
        tags,
        "ImageHeight.value"
      )}`,
      iso: customData.iso || getValue(tags, "ISOSpeedRatings.value"),
      focalLength:
        customData.focalLength || `${formatNumber(focalLength, 1)}mm`,
      aperture: customData.aperture || `f/${formatNumber(aperture)}`,
      shutterspeed:
        customData.shutterspeed || getValue(tags, "ExposureTime.description"),
    };
  };

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

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumns}
        className="photo-grid"
        columnClassName="photo-grid-column"
      >
        {[...Array(totalPhotos)].map((_, index) =>
          loadedPhotos[index] ? (
            <PhotoCard 
              key={`photo-${index}`} 
              photo={loadedPhotos[index]} 
              isMetaVisible={activeMetaIndex === index}
              onMetaToggle={handleMetaToggle}
            />
          ) : (
            <Skeleton key={`skeleton-${index}`} />
          )
        )}
      </Masonry>
      <ButtonsContainer />
    </>
  );
};

export default memo(PhotoGrid);
