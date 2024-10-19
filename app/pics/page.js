import ScrollToTop from "@/components/ScrollToTop";
import PicturesSection from "../../components/PicturesSection";
import fs from "fs";
import path from "path";
import ReturnHome from "@/components/ReturnToHome";

export default function Pics() {
  const imageDirectory = path.join(process.cwd(), "public", "images");
  const imageFilenames = fs.readdirSync(imageDirectory);

  return (
    <div>
      <ReturnHome />
      <ScrollToTop />
      <PicturesSection images={imageFilenames} />
    </div>
  );
}
