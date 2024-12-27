"use client";

import { memo } from "react";

const AboutMe = () => {
  return (
    <section className="about" style={{ contentVisibility: "auto" }}>
      <p className="high-priority">
        A mechatronics engineer exploring machine learning, robotics and
        computer science.
      </p>
    </section>
  );
};

export default memo(AboutMe);
