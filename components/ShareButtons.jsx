"use client";
import { useState, useEffect, useRef } from "react";
import { Share2, Link2, Check, MessageCircleMore } from "lucide-react";

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 1200 1227" fill="currentColor">
    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 87.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1143.69H892.476L569.165 687.854V687.828Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function ShareButton({ slug }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className="share-wrapper">
        <button className="share-button" aria-label="Share">
          <Share2 size={14} />
        </button>
      </div>
    );
  }

  const url = `https://danish.bio/post/${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
      document.body.removeChild(textArea);
    }
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setIsOpen(false), 2000);
  };

  const shareButtons = [
    {
      name: "X",
      Icon: XIcon,
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this post by @dan10ish\n\n${url}`)}`,
          "_blank",
        );
        setIsOpen(false);
      },
      class: "share-x",
    },
    {
      name: "LinkedIn",
      Icon: LinkedInIcon,
      action: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank",
        );
        setIsOpen(false);
      },
      class: "share-linkedin",
    },
    {
      name: "WhatsApp",
      Icon: MessageCircleMore,
      action: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`Check out this post by Danish\n\n${url}`)}`,
          "_blank",
        );
        setIsOpen(false);
      },
      class: "share-whatsapp",
    },
    {
      name: copied ? "Link Copied" : "Copy Link",
      Icon: copied ? Check : Link2,
      action: handleCopy,
      class: copied ? "share-copied" : "share-copy",
    },
  ];

  return (
    <div className="share-wrapper" ref={wrapperRef} data-open={isOpen}>
      <button
        className="share-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Share"
      >
        <Share2 size={14} />
      </button>
      {isOpen && (
        <div className="share-popup">
          {shareButtons.map((btn) => {
            const IconComponent = btn.Icon;
            return (
              <button
                key={btn.name}
                onClick={btn.action}
                className={`share-option ${btn.class}`}
              >
                <IconComponent size={14} />
                <span>{btn.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
