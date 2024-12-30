"use client";

import dynamic from "next/dynamic";
import ButtonsContainer from "@/components/ButtonsContainer";
import PhotoSkeleton from "@/components/PhotoSkeleton";

const PhotoGrid = dynamic(() => import("@/components/PhotoGrid"), {
  loading: () => <PhotoSkeleton />,
  ssr: false,
});

export default function PhotosPage() {
  return (
    <main>
      <PhotoGrid />
      <ButtonsContainer />
    </main>
  );
}
