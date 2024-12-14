"use client";

import React, { useEffect, useRef, useState } from "react";
import * as Icons from "simple-icons";

const IconCloud = ({ iconSlugs }) => {
  const cloudRef = useRef(null);
  const animationRef = useRef();
  const [mounted, setMounted] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const previousTouch = useRef({ x: 0, y: 0 });
  const angleRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const icons = cloudRef.current?.children || [];
    const SPEED = 0.2;
    const RADIUS = window.innerWidth > 768 ? 180 : 130;
    const SMOOTHING = 0.15;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      currentRotation.current.x = lerp(
        currentRotation.current.x,
        rotation.x,
        SMOOTHING,
      );
      currentRotation.current.y = lerp(
        currentRotation.current.y,
        rotation.y,
        SMOOTHING,
      );

      Array.from(icons).forEach((icon, index) => {
        const phi = Math.acos(-1 + (2 * index) / icons.length);
        const theta = Math.sqrt(icons.length * Math.PI) * phi;

        const x = RADIUS * Math.cos(theta + angleRef.current) * Math.sin(phi);
        const y = RADIUS * Math.sin(theta + angleRef.current) * Math.sin(phi);
        const z = RADIUS * Math.cos(phi);

        const rotateX = (currentRotation.current.x * Math.PI) / 180;
        const rotateY = (currentRotation.current.y * Math.PI) / 180;

        const transformedX = x * Math.cos(rotateY) - z * Math.sin(rotateY);
        const transformedZ = x * Math.sin(rotateY) + z * Math.cos(rotateY);
        const transformedY =
          y * Math.cos(rotateX) + transformedZ * Math.sin(rotateX);

        const scale = transformedZ < 0 ? 1 + transformedZ / (RADIUS * 2) : 1;
        const blur =
          transformedZ < 0 ? Math.min(1.5, Math.abs(transformedZ / RADIUS)) : 0;
        const opacity =
          transformedZ < 0 ? Math.max(0.3, 1 + transformedZ / RADIUS) : 1;

        icon.style.transform = `translate3d(${transformedX}px, ${transformedY}px, ${transformedZ}px)`;
        icon.style.opacity = opacity;
        icon.style.filter = `blur(${blur}px)`;
        icon.style.zIndex = Math.round(transformedZ);
      });

      angleRef.current += SPEED / 100;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseDown = (e) => {
      isDragging.current = true;
      e.preventDefault();
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      setRotation((prev) => ({
        x: (prev.x + e.movementY * 0.5) % 360,
        y: (prev.y + e.movementX * 0.5) % 360,
      }));
    };

    const handleTouchStart = (e) => {
      isDragging.current = true;
      previousTouch.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      e.preventDefault();
    };

    const handleTouchMove = (e) => {
      if (!isDragging.current) return;

      const touch = e.touches[0];
      const movementX = touch.clientX - previousTouch.current.x;
      const movementY = touch.clientY - previousTouch.current.y;

      setRotation((prev) => ({
        x: (prev.x + movementY * 0.5) % 360,
        y: (prev.y + movementX * 0.5) % 360,
      }));

      previousTouch.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    const container = cloudRef.current;
    container.addEventListener("mousedown", handleMouseDown, {
      passive: false,
    });
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseUp);
    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseUp);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [rotation, mounted]);

  if (!mounted) return null;

  const getLuminance = (hex) => {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  const getContrastColor = (hex) => {
    const luminance = getLuminance(hex);
    const darkThreshold = 0.2;
    const brightThreshold = 0.1;

    if (hex === "000000" || hex === "000" || luminance < 0.3) {
      return "var(--color-text)";
    }

    if (hex === "ffffff" || hex === "fff" || luminance > 0.9) {
      return "var(--color-text)";
    }

    if (
      luminance < darkThreshold &&
      (hex.startsWith("00") || hex.startsWith("0000"))
    ) {
      return "var(--color-text)";
    }

    return `#${hex}`;
  };

  return (
    <div ref={cloudRef} className="icon-cloud">
      {iconSlugs.map((slug) => {
        const iconKey = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
        const icon = Icons[iconKey];
        if (!icon) return null;

        const color = getContrastColor(icon.hex);

        return (
          <div key={slug} className="icon-item" title={icon.title}>
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="icon-svg"
              style={{ color }}
            >
              <path d={icon.path} fill="currentColor" />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export default IconCloud;
