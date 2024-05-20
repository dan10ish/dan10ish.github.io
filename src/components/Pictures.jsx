import React from "react";
import { Link } from "react-router-dom";

import one from "../assets/pics/1.jpg";
import two from "../assets/pics/2.jpg";
import three from "../assets/pics/3.jpg";
import four from "../assets/pics/4.jpg";
import five from "../assets/pics/5.jpg";
import six from "../assets/pics/6.jpg";
import seven from "../assets/pics/7.jpg";
import eight from "../assets/pics/8.jpg";
import nine from "../assets/pics/9.jpg";

export default function Pictures() {
  return (
    <>
      <main>
        <div className="menu">
          <Link to="/">
            <div className="menu-items">About</div>
          </Link>
          <Link to="/project">
            <div className="menu-items">Projects</div>
          </Link>
          <Link to="/picture">
            <div className="menu-items box">Photos</div>
          </Link>
        </div>
        <div className="pictures">
          <img src={one} alt="" />
          <img src={two} alt="" />
          <img src={three} alt="" />
          <img src={four} alt="" />
          <img src={five} alt="" />
          <img src={six} alt="" />
          <img src={seven} alt="" />
          <img src={eight} alt="" />
          <img src={nine} alt="" />
        </div>
      </main>
    </>
  );
}
