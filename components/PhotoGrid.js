"use client";

import { useState, useEffect, memo, useCallback, useRef } from "react";
import ExifReader from "exifreader";
import Masonry from "react-masonry-css";
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

const PhotoCard = memo(({ photo, onClick, isSelected }) => {
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
    <div 
      className={`photo-card ${isSelected ? "keyboard-selected" : ""}`}
      data-id={photo.index}
    >
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
  const [totalPhotos, setTotalPhotos] = useState(24);
  const [loadedPhotos, setLoadedPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [isKeyboardNavigating, setIsKeyboardNavigating] = useState(false);
  
  // Store previous scroll position to detect user-initiated scrolls
  const lastScrollPosition = useRef(0);
  const isAutoScrolling = useRef(false);

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 2,
  };

  // Define handlePhotoClick first so it can be used in dependencies below
  const handlePhotoClick = useCallback((photo) => {
    if (photo && photo.src) {
      const cachedImg = new Image();
      cachedImg.onload = () => {
        setSelectedPhoto(photo);
        setIsModalOpen(true);
      };
      cachedImg.onerror = () => {
        console.error("Failed to load image:", photo.src);
        setSelectedPhoto(photo);
        setIsModalOpen(true);
      };
      
      cachedImg.src = photo.src;
      if (cachedImg.complete) {
        setSelectedPhoto(photo);
        setIsModalOpen(true);
      }
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    if (!loadedPhotos.length) return;

    const handleKeyDown = (e) => {
      if (isModalOpen) {
        if (e.key === 'Escape') {
          handleCloseModal();
        }
        return;
      }

      // Enter keyboard navigation mode on first arrow key press
      if (!isKeyboardNavigating && 
          (e.key === 'ArrowDown' || e.key === 'ArrowUp' || 
           e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        setIsKeyboardNavigating(true);
      }

      let newIndex = selectedPhotoIndex;
      
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          newIndex = selectedPhotoIndex === null ? 0 : Math.min(selectedPhotoIndex + 1, loadedPhotos.length - 1);
          setSelectedPhotoIndex(newIndex);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          newIndex = selectedPhotoIndex === null ? loadedPhotos.length - 1 : Math.max(selectedPhotoIndex - 1, 0);
          setSelectedPhotoIndex(newIndex);
          break;
        case 'Enter':
          if (selectedPhotoIndex !== null && loadedPhotos[selectedPhotoIndex]) {
            handlePhotoClick(loadedPhotos[selectedPhotoIndex]);
          }
          break;
        case 'Escape':
          setIsKeyboardNavigating(false);
          setSelectedPhotoIndex(null);
          break;
      }
    };

    // Only track actual mouse clicks, not movements
    const handleMouseDown = () => {
      if (isKeyboardNavigating) {
        setIsKeyboardNavigating(false);
        setSelectedPhotoIndex(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [selectedPhotoIndex, loadedPhotos, isModalOpen, handleCloseModal, handlePhotoClick, isKeyboardNavigating]);

  // Scroll to selected photo when selectedPhotoIndex changes
  useEffect(() => {
    if (!isKeyboardNavigating || selectedPhotoIndex === null) return;

    // Delay to ensure the DOM is updated
    const timer = setTimeout(() => {
      try {
        const selectedElement = document.querySelector('.photo-card.keyboard-selected');
        if (!selectedElement) return;

        const rect = selectedElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if element is fully visible
        const isFullyVisible = (
          rect.top >= 50 && // Add a small margin for header
          rect.bottom <= windowHeight - 50 // Add small margin at bottom
        );
        
        if (!isFullyVisible) {
          isAutoScrolling.current = true;
          lastScrollPosition.current = window.scrollY;
          
          // If element is mostly below the viewport, scroll it to 1/3 from top
          // If element is mostly above the viewport, scroll it to 2/3 from top
          let targetPosition;
          
          if (rect.top > windowHeight) {
            // Element is below viewport
            targetPosition = window.scrollY + rect.top - (windowHeight * 0.33);
          } else if (rect.bottom < 0) {
            // Element is above viewport
            targetPosition = window.scrollY + rect.top - (windowHeight * 0.66);
          } else if (rect.bottom > windowHeight) {
            // Element is partially below
            targetPosition = window.scrollY + (rect.bottom - windowHeight) + 50;
          } else {
            // Element is partially above
            targetPosition = window.scrollY + rect.top - 50;
          }
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Reset auto-scrolling flag after animation completes
          setTimeout(() => {
            isAutoScrolling.current = false;
          }, 300);
        }
      } catch (error) {
        console.error('Error scrolling to selected photo:', error);
      }
    }, 50);
    
    return () => clearTimeout(timer);
  }, [selectedPhotoIndex, isKeyboardNavigating]);

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
      return path.split(".").reduce((acc, key) => acc?.[key], obj) ?? defaultValue;
    };

    const formatNumber = (value, decimals = 2) => {
      if (!value) return "Unknown";
      const num = parseFloat(value);
      return isNaN(num) ? "Unknown" : num.toFixed(decimals);
    };

    const focalLength = getValue(tags, "FocalLength.description", "").split(" ")[0];
    const aperture = getValue(tags, "FNumber.description", "").replace("f/", "");

    return {
      camera: customData.camera || getValue(tags, "Model.description", "Unknown").split(" back")[0],
      resolution: `${getValue(tags, "ImageWidth.value")} × ${getValue(tags, "ImageHeight.value")}`,
      iso: customData.iso || getValue(tags, "ISOSpeedRatings.value"),
      focalLength: customData.focalLength || `${formatNumber(focalLength, 1)}mm`,
      aperture: customData.aperture || `f/${formatNumber(aperture)}`,
      shutterspeed: customData.shutterspeed || getValue(tags, "ExposureTime.description"),
      country: customData.country || null
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
        {[...Array(totalPhotos)].map((_, index) => {
          return loadedPhotos[index] ? (
            <PhotoCard 
              key={`photo-${index}`} 
              photo={loadedPhotos[index]} 
              onClick={handlePhotoClick}
              isSelected={selectedPhotoIndex === index}
            />
          ) : (
            <Skeleton key={`skeleton-${index}`} />
          );
        })}
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
