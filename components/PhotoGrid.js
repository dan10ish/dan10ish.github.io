"use client";

import { useState, useEffect, memo, useCallback } from "react";
import ExifReader from "exifreader";
import Masonry from "react-masonry-css";
import { MapPin } from "lucide-react";
import { photoMetadata } from "@/lib/photo-meta";
import ButtonsContainer from "./ButtonsContainer";
import PhotoModal from "./PhotoModal";

const Skeleton = memo(() => (
  <div className="photo-card skeleton">
    <div className="photo-container">
      <div className="skeleton-img"></div>
    </div>
  </div>
));

const PhotoCard = memo(({ photo, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);
  
  const handleClick = useCallback(() => {
    if (isLoaded) {
      onClick(photo);
    }
  }, [isLoaded, onClick, photo]);
  
  return (
    <div className="photo-card">
      <div className="photo-container">
        <img 
          src={photo.src} 
          alt="" 
          loading="lazy" 
          decoding="async" 
          onClick={handleClick}
          onLoad={handleImageLoad}
          style={{ cursor: isLoaded ? 'pointer' : 'default' }}
        />
      </div>
    </div>
  );
});

const PhotoGrid = () => {
  const [loading, setLoading] = useState(true);
  const [totalPhotos, setTotalPhotos] = useState(16);
  const [loadedPhotos, setLoadedPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 2,
  };

  const handlePhotoClick = useCallback((photo) => {
    if (photo && photo.src) {
      const img = new Image();
      img.onload = () => {
        setSelectedPhoto(photo);
        setIsModalOpen(true);
      };
      img.onerror = () => {
        console.error("Failed to load image:", photo.src);
        setSelectedPhoto(photo);
        setIsModalOpen(true);
      };
      img.src = photo.src;
      if (img.complete) {
        setSelectedPhoto(photo);
        setIsModalOpen(true);
      }
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
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

    // Try to extract country from GPS data if available
    let country = null;
    try {
      if (tags.GPSLatitude && tags.GPSLongitude) {
        // This is a simplified approach and might not be accurate
        // For a production app, you'd want to use a geocoding service
        const lat = tags.GPSLatitude.description;
        const lng = tags.GPSLongitude.description;
        if (customData.country) {
          country = customData.country;
        }
      }
    } catch (e) {}

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
      country: customData.country || country,
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
              onClick={handlePhotoClick}
            />
          ) : (
            <Skeleton key={`skeleton-${index}`} />
          )
        )}
      </Masonry>
      <PhotoModal
        photo={selectedPhoto}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      {!isModalOpen && <ButtonsContainer />}
    </>
  );
};

export default memo(PhotoGrid);
