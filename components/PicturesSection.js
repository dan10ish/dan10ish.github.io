"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const PicturesSection = ({ images }) => {
  const [isLargeDevice, setIsLargeDevice] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [visibleItems, setVisibleItems] = useState(6);
  const gridRef = useRef(null);

  useEffect(() => {
    const checkDeviceSize = () => {
      setIsLargeDevice(window.innerWidth >= 700);
    };

    checkDeviceSize();
    window.addEventListener("resize", checkDeviceSize);

    return () => window.removeEventListener("resize", checkDeviceSize);
  }, []);

  useEffect(() => {
    if (isLargeDevice || showAll) {
      setVisibleItems(images.length);
    } else {
      setVisibleItems(6);
    }
  }, [isLargeDevice, showAll, images.length]);

  const resizeGridItems = () => {
    if (!gridRef.current) return;
    const grid = gridRef.current;
    const rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );
    const rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
    );

    const items = grid.children;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const imgElement = item.querySelector("img");
      if (imgElement && imgElement.complete) {
        const rowSpan = Math.ceil(
          (imgElement.height + rowGap) / (rowHeight + rowGap)
        );
        item.style.gridRowEnd = `span ${rowSpan}`;
      }
    }
  };

  useEffect(() => {
    resizeGridItems();
    window.addEventListener("resize", resizeGridItems);
    return () => {
      window.removeEventListener("resize", resizeGridItems);
    };
  }, [visibleItems]);

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <section className="pictures-section">
      <h2>Pictures</h2>
      <div
        className={`masonry-grid-container ${
          !isLargeDevice && !showAll ? "blurred" : ""
        }`}
      >
        <div ref={gridRef} className="masonry-grid">
          {images.slice(0, visibleItems).map((image, index) => (
            <div
              key={index}
              className={`masonry-item ${
                index < visibleItems ? "visible" : ""
              }`}
            >
              <Image
                src={`/images/${image}`}
                alt={`Image ${index + 1}`}
                width={300}
                height={300}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
                loading="lazy"
                placeholder="blur"
                blurDataURL={`/images/${image}?w=10&q=10`}
                onLoad={resizeGridItems}
              />
            </div>
          ))}
        </div>
        {!isLargeDevice && !showAll && (
          <div className="blur-overlay">
            <button onClick={toggleShowAll} className="see-more-button">
              More
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      {!isLargeDevice && showAll && (
        <div className="see-less-container">
          <button onClick={toggleShowAll} className="see-less-button">
            Less
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default PicturesSection;
