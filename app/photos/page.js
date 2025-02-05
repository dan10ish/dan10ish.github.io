"use client";

import ButtonsContainer from "@/components/ButtonsContainer";
import PhotoGrid from "../../components/PhotoGrid";
import PageTransition from "@/components/PageTransition";

export default function PhotosPage() {
  return (
    <PageTransition>
      <main>
        <PhotoGrid />
        <ButtonsContainer />
      </main>
    </PageTransition>
  );
}
