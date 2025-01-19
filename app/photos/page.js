"use client";

import dynamic from "next/dynamic";
import ButtonsContainer from "@/components/ButtonsContainer";
import PhotoSkeleton from "@/components/PhotoSkeleton";
import Copyright from "../../components/Copyright";

const PhotoGrid = dynamic(() => import("@/components/PhotoGrid"), {
  loading: () => <PhotoSkeleton />,
  ssr: false,
});

export default function PhotosPage() {
  return (
    <main>
      <PhotoGrid />
      <ButtonsContainer />
      <Copyright />
    </main>
  );
}
