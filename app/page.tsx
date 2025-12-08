import { getTILEntries } from "../lib/client";
import HomeClient from "./HomeClient";

export const revalidate = 300;

export default async function Home() {
  const entries = await getTILEntries();
  return <HomeClient entries={entries} />;
}
