"use client";

import { useState, useEffect, memo } from "react";
import { ArrowUp } from "lucide-react";

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
            <ArrowUp size={18} />
        </button>
    );
});

ScrollToTop.displayName = "ScrollToTop";

export default function BlogInteractive() {
    useEffect(() => {
        const pres = document.querySelectorAll(".blog-content pre");
        pres.forEach((pre) => {
            if (pre.querySelector(".blog-copy-btn")) return;
            const code = pre.querySelector("code");
            if (!code) return;
            const btn = document.createElement("button");
            btn.className = "blog-copy-btn";
            btn.textContent = "copy";
            btn.onclick = () => {
                navigator.clipboard.writeText(code.textContent);
                btn.textContent = "copied";
                setTimeout(() => (btn.textContent = "copy"), 2000);
            };
            pre.style.position = "relative";
            pre.appendChild(btn);
        });
    }, []);

    return <ScrollToTop />;
}
