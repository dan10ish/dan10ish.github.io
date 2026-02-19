import DeepMindClient from "./DeepMindClient";
import content from "./content.json";

export default function DeepMindPage() {
  return <DeepMindClient content={content} />;
}
