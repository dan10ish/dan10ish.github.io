import { readdir } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  try {
    const photosDir = join(process.cwd(), "public/photos");
    const files = await readdir(photosDir);
    const photos = files
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map((file) => `/photos/${file}`);
    return NextResponse.json(photos);
  } catch (error) {
    return NextResponse.json(
      { error: "Error reading photos" },
      { status: 500 },
    );
  }
}
