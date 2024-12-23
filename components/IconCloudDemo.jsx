"use client";

import { lazy, Suspense } from "react";
const IconCloud = lazy(() => import("./magicui/icon-cloud"));

const slugs = [
  "python",
  "c",
  "cplusplus",
  "javascript",
  "numpy",
  "pandas",
  "html5",
  "latex",
  "mdx",
  "scikitlearn",
  "tensorflow",
  "linux",
  "git",
  "react",
  "css3",
  "sketch",
  "blender",
  "solidworks",
  "arduino",
  "nextdotjs",
  "nodedotjs",
  "adobephotoshop",
  "framer",
  "unity",
  "threedotjs",
  "supabase",
];

export function IconCloudDemo() {
  return (
    <div className="icon-cloud-container">
      <Suspense fallback={<div className="icon-cloud" />}>
        <IconCloud iconSlugs={slugs} />
      </Suspense>
    </div>
  );
}
