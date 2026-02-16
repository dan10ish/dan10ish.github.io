"use client";

import { useState, useEffect, memo } from "react";
import { ChevronUp, Copy, Check } from "lucide-react";

const ScrollToTop = memo(() => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setShow(window.scrollY > 300);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!show) return null;

    return (
        <button
            className="blog-scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
        >
            <ChevronUp size={18} strokeWidth={2} />
        </button>
    );
});

ScrollToTop.displayName = "ScrollToTop";

function addCopyButtons() {
    const pres = document.querySelectorAll(".blog-content pre");
    const isTouch = window.matchMedia("(any-hover: none)").matches;

    pres.forEach((pre) => {
        if (pre.querySelector(".blog-copy-btn")) return;
        const code = pre.querySelector("code");
        if (!code) return;

        pre.style.position = "relative";

        const wrapper = document.createElement("div");
        wrapper.className = "blog-copy-btn" + (isTouch ? " touch" : "");

        const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
        const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;

        wrapper.innerHTML = copyIcon;

        wrapper.addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation();
            try {
                await navigator.clipboard.writeText(code.textContent);
                wrapper.innerHTML = checkIcon;
                wrapper.classList.add("copied");
                setTimeout(() => {
                    wrapper.innerHTML = copyIcon;
                    wrapper.classList.remove("copied");
                }, 2000);
            } catch {
                // Fallback for older browsers
                const ta = document.createElement("textarea");
                ta.value = code.textContent;
                ta.style.cssText = "position:fixed;left:-9999px";
                document.body.appendChild(ta);
                ta.select();
                document.execCommand("copy");
                document.body.removeChild(ta);
                wrapper.innerHTML = checkIcon;
                wrapper.classList.add("copied");
                setTimeout(() => {
                    wrapper.innerHTML = copyIcon;
                    wrapper.classList.remove("copied");
                }, 2000);
            }
        });

        pre.appendChild(wrapper);
    });
}

export default function BlogInteractive() {
    useEffect(() => {
        // Small delay to ensure SSR content is hydrated
        const timer = setTimeout(addCopyButtons, 50);
        return () => clearTimeout(timer);
    }, []);

    return <ScrollToTop />;
}
