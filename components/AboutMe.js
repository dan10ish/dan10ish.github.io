"use client";

import { memo } from "react";

const AboutMe = () => (
  <section className="about">
    <p style={{ contentVisibility: "visible", contain: "content" }}>
      A mechatronics engineer exploring machine learning, robotics and computer
      science.
    </p>
  </section>
);

export default memo(AboutMe);
