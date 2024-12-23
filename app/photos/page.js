"use client";

import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import ButtonsContainer from "@/components/ButtonsContainer";

const PhotoGrid = dynamic(() => import("@/components/PhotoGrid"), {
  ssr: false,
  loading: () => <div style={{ height: "100vh" }} />,
});

export default function PhotosPage() {
  return (
    <main>
      <div className="title-container">
        <div className="title-link">
          <h1>Photos</h1>
        </div>
      </div>
      <PhotoGrid />
      <ButtonsContainer />
    </main>
  );
}
