"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ScrollVisibilityWrapper from "@/components/ScrollVisibilityWrapper";
import dynamic from "next/dynamic";

const TOCButton = dynamic(() => import("./TOCButton"), { ssr: false });

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M23.6541 11.1511L12.8522 0.354834C12.7406 0.242399 12.6078 0.153157 12.4616 0.092256C12.3153 0.0313549 12.1584 0 12 0C11.8416 0 11.6847 0.0313549 11.5384 0.092256C11.3922 0.153157 11.2594 0.242399 11.1478 0.354834L0.345886 11.1511C0.179347 11.3197 0.066531 11.534 0.021674 11.7667C-0.0231831 11.9994 0.00192862 12.2401 0.0938406 12.4586C0.183881 12.6777 0.336786 12.8652 0.533286 12.9975C0.729786 13.1299 0.961088 13.2012 1.19804 13.2023H2.39826V21.9593C2.42014 22.5204 2.66353 23.05 3.07517 23.4322C3.4868 23.8144 4.03315 24.018 4.59466 23.9986H7.79924C8.11756 23.9986 8.42284 23.8722 8.64792 23.6472C8.87301 23.4222 8.99946 23.1171 8.99946 22.799V16.921C8.99946 16.6029 9.12591 16.2978 9.35099 16.0728C9.57608 15.8478 9.88136 15.7215 10.1997 15.7215H13.8003C14.1186 15.7215 14.4239 15.8478 14.649 16.0728C14.8741 16.2978 15.0005 16.6029 15.0005 16.921V22.799C15.0005 23.1171 15.127 23.4222 15.3521 23.6472C15.5772 23.8722 15.8824 23.9986 16.2008 23.9986H19.4053C19.9668 24.018 20.5132 23.8144 20.9248 23.4322C21.3365 23.05 21.5799 22.5204 21.6017 21.9593V13.2023H22.802C23.0389 13.2012 23.2702 13.1299 23.4667 12.9975C23.6632 12.8652 23.8161 12.6777 23.9062 12.4586C23.9981 12.2401 24.0232 11.9994 23.9783 11.7667C23.9335 11.534 23.8207 11.3197 23.6541 11.1511Z"
      fill="currentColor"
    />
  </svg>
);

const Navigation = () => {
  const pathname = usePathname();
  const isBlogPost = pathname.startsWith("/post/");
  const isHomePage = pathname === "/";

  return (
    <ScrollVisibilityWrapper>
      {(isVisible) => (
        <nav className={`fixed-nav ${!isVisible ? "nav-hidden" : ""}`}>
          <div className="nav-content">
            {!isHomePage && (
              <Link
                href="/"
                className="nav-button home-icon-btn"
                aria-label="Home"
              >
                <HomeIcon />
              </Link>
            )}

            {isBlogPost && (
              <div className="toc-wrapper">
                <TOCButton />
              </div>
            )}
          </div>
        </nav>
      )}
    </ScrollVisibilityWrapper>
  );
};

export default Navigation;