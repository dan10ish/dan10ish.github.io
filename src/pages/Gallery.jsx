import React from "react";
import Footer from "./Footer";

export default function Gallery() {
  const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  };

  const images = importAll(
    require.context("../assets/images/gallery", false, /\.(png|jpe?g|svg)$/)
  );
  return (
    <>
      <div className="gallery">
        <div className="gallery-description">Visual narratives.</div>
        <div className="gallery-grid">
          {Object.keys(images).map((key, index) => (
            <div key={index} className="gallery-item">
              <img src={images[key]} alt={`Gallery ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
