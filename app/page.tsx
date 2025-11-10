import { getSortedWritingsData } from "../lib/writings";
import HomeClient from "./components/HomeClient";

export default function Home() {
  const writings = getSortedWritingsData();

  return <HomeClient writings={writings} />;
}
