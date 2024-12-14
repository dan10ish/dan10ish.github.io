"use client";

import IconCloud from "./magicui/icon-cloud";

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
    <>
      <div className="icon-cloud-container">
        <IconCloud iconSlugs={slugs} />
      </div>
    </>
  );
}
