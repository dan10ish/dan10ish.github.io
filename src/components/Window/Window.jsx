import React, { useState, useRef, useEffect, useCallback } from "react";
import { X, Minus, ChevronsUpDown, ChevronsDownUp } from "lucide-react";
import "./Window.css";

const Window = ({
  app,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  zIndex,
  state,
}) => {
  const windowRef = useRef(null);
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0
  });
  const resizeState = useRef({
    isResizing: false,
    direction: null,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    startLeft: 0,
    startTop: 0
  });

  const [position, setPosition] = useState(() => {
    const defaultWidth = app.defaultSize?.[0] || 600;
    const defaultHeight = app.defaultSize?.[1] || 400;
    const centerX = (window.innerWidth - defaultWidth) / 2;
    const centerY = (window.innerHeight - defaultHeight) / 2;
    
    const offsetX = (Math.random() - 0.5) * 60;
    const offsetY = (Math.random() - 0.5) * 60;
    
    return {
      x: Math.max(0, Math.min(window.innerWidth - defaultWidth, centerX + offsetX)),
      y: Math.max(30, Math.min(window.innerHeight - defaultHeight, centerY + offsetY)),
    };
  });

  const [size, setSize] = useState(() => ({
    width: app.defaultSize?.[0] || 600,
    height: app.defaultSize?.[1] || 400,
  }));

  const isMaximized = state === "maximized";
  const isMinimized = state === "minimized";

  const updateWindowTransform = useCallback((x, y, width, height) => {
    if (windowRef.current) {
      windowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      windowRef.current.style.width = `${width}px`;
      windowRef.current.style.height = `${height}px`;
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    e.preventDefault();

    if (dragState.current.isDragging) {
      const newX = Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragState.current.offsetX));
      const newY = Math.max(30, Math.min(window.innerHeight - size.height, e.clientY - dragState.current.offsetY));

      updateWindowTransform(newX, newY, size.width, size.height);
      setPosition({ x: newX, y: newY });
    }

    if (resizeState.current.isResizing) {
      const { direction, startX, startY, startWidth, startHeight, startLeft, startTop } = resizeState.current;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newLeft = startLeft;
      let newTop = startTop;

      if (direction.includes("right")) {
        newWidth = Math.max(280, Math.min(startWidth + deltaX, window.innerWidth - startLeft));
      }
      if (direction.includes("left")) {
        const maxDelta = startLeft;
        const actualDelta = Math.min(deltaX, maxDelta);
        newWidth = Math.max(280, startWidth - actualDelta);
        newLeft = startLeft + (startWidth - newWidth);
      }
      if (direction.includes("bottom")) {
        newHeight = Math.max(200, Math.min(startHeight + deltaY, window.innerHeight - startTop));
      }
      if (direction.includes("top")) {
        const maxDelta = startTop - 30;
        const actualDelta = Math.min(deltaY, maxDelta);
        newHeight = Math.max(200, startHeight - actualDelta);
        newTop = startTop + (startHeight - newHeight);
      }

      updateWindowTransform(newLeft, newTop, newWidth, newHeight);
      setPosition({ x: newLeft, y: newTop });
      setSize({ width: newWidth, height: newHeight });
    }
  }, [size.width, size.height, updateWindowTransform]);

  const handleMouseUp = useCallback(() => {
    dragState.current.isDragging = false;
    resizeState.current.isResizing = false;
    if (windowRef.current) {
      windowRef.current.classList.remove('dragging');
    }
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  const handleDragStart = useCallback((e) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();

    onFocus();
    if (windowRef.current) {
      windowRef.current.classList.add('dragging');
    }
    dragState.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - position.x,
      offsetY: e.clientY - position.y
    };

    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
  }, [isMaximized, onFocus, position.x, position.y]);

  const handleResizeStart = useCallback((e, direction) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();

    onFocus();
    if (windowRef.current) {
      windowRef.current.classList.add('dragging');
    }
    resizeState.current = {
      isResizing: true,
      direction,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height,
      startLeft: position.x,
      startTop: position.y
    };

    document.body.style.userSelect = "none";
  }, [isMaximized, onFocus, size.width, size.height, position.x, position.y]);

  const handleTouchStart = useCallback((e) => {
    if (isMaximized) return;
    e.preventDefault();

    const touch = e.touches[0];
    onFocus();
    if (windowRef.current) {
      windowRef.current.classList.add('dragging');
    }
    dragState.current = {
      isDragging: true,
      startX: touch.clientX,
      startY: touch.clientY,
      offsetX: touch.clientX - position.x,
      offsetY: touch.clientY - position.y
    };
  }, [isMaximized, onFocus, position.x, position.y]);

  const handleTouchMove = useCallback((e) => {
    if (!dragState.current.isDragging) return;
    e.preventDefault();

    const touch = e.touches[0];
    const newX = Math.max(0, Math.min(window.innerWidth - size.width, touch.clientX - dragState.current.offsetX));
    const newY = Math.max(30, Math.min(window.innerHeight - size.height, touch.clientY - dragState.current.offsetY));

    updateWindowTransform(newX, newY, size.width, size.height);
    setPosition({ x: newX, y: newY });
  }, [size.width, size.height, updateWindowTransform]);

  const handleTouchEnd = useCallback(() => {
    dragState.current.isDragging = false;
    resizeState.current.isResizing = false;
    if (windowRef.current) {
      windowRef.current.classList.remove('dragging');
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove, { passive: false });
    document.addEventListener("mouseup", handleMouseUp, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  useEffect(() => {
    updateWindowTransform(position.x, position.y, size.width, size.height);
  }, [position.x, position.y, size.width, size.height, updateWindowTransform]);

  const windowStyle = {
    zIndex,
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    width: `${size.width}px`,
    height: `${size.height}px`,
  };

  return (
    <div
      ref={windowRef}
      className={`window ${isMaximized ? "maximized" : ""} ${isMinimized ? "minimized" : ""}`}
      style={windowStyle}
      onMouseDown={onFocus}
    >
      <div
        className="window-header"
        onMouseDown={handleDragStart}
        onTouchStart={handleTouchStart}
      >
        <div className="window-controls">
          <div className="window-control close" onClick={onClose}>
            <X size={10} />
          </div>
          <div className="window-control minimize" onClick={onMinimize}>
            <Minus size={10} />
          </div>
          <div className="window-control maximize" onClick={onMaximize}>
            {isMaximized ? (
              <ChevronsDownUp size={10} style={{ transform: 'rotate(45deg)' }} />
            ) : (
              <ChevronsUpDown size={10} style={{ transform: 'rotate(45deg)' }} />
            )}
          </div>
        </div>
        
        <div className="window-title">
          {app.name}
        </div>
      </div>
      <div className="window-body">{children}</div>
      {!isMaximized && (
        <>
          <div className="resizer top" onMouseDown={(e) => handleResizeStart(e, "top")} />
          <div className="resizer bottom" onMouseDown={(e) => handleResizeStart(e, "bottom")} />
          <div className="resizer left" onMouseDown={(e) => handleResizeStart(e, "left")} />
          <div className="resizer right" onMouseDown={(e) => handleResizeStart(e, "right")} />
          <div className="resizer top-left" onMouseDown={(e) => handleResizeStart(e, "top-left")} />
          <div className="resizer top-right" onMouseDown={(e) => handleResizeStart(e, "top-right")} />
          <div className="resizer bottom-left" onMouseDown={(e) => handleResizeStart(e, "bottom-left")} />
          <div className="resizer bottom-right" onMouseDown={(e) => handleResizeStart(e, "bottom-right")} />
        </>
      )}
    </div>
  );
};

export default Window;
