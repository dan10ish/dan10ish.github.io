import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const ScrollIndicator = ({ containerRef }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const resizeObserverRef = useRef(null);
  const mutationObserverRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkScroll = () => {
      if (!container) return;
      const { scrollTop, scrollHeight, clientHeight } = container;
      const hasOverflow = scrollHeight > clientHeight;
      const notAtBottom = scrollHeight - scrollTop - clientHeight > 10;
      setShouldShow(hasOverflow && notAtBottom);
    };

    setTimeout(checkScroll, 100);

    resizeObserverRef.current = new ResizeObserver(() => {
      requestAnimationFrame(checkScroll);
    });

    mutationObserverRef.current = new MutationObserver(() => {
      requestAnimationFrame(checkScroll);
    });

    resizeObserverRef.current.observe(container);
    if (container.parentElement) {
      resizeObserverRef.current.observe(container.parentElement);
    }

    mutationObserverRef.current.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect();
      }
    };
  }, [containerRef]);

  useEffect(() => {
    if (shouldShow) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [shouldShow]);

  if (!shouldShow) return null;

  return (
    <div className={`scroll-indicator ${isVisible ? "visible" : ""}`}>
      <ChevronDown />
    </div>
  );
};

export default ScrollIndicator;
