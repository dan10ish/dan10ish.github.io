import { Button } from "@/components/ui/button";
import { RiInstagramFill, RiThreadsLine, RiTwitterXLine } from "@remixicon/react";
import HighlightedText from "@/components/highlighted-text";
export default function Page() {
  return (
    <div className="min-h-svh p-8 md:p-6 flex items-center justify-center">
      <div className="max-w-[400px] flex flex-col gap-6 md:gap-4">
        <div>
          <h1 className="font-semibold">Danish</h1>
        </div>
        <div>
          <p className="text-muted-foreground font-medium">I&apos;m a <HighlightedText from="left" delay={0.4}>mechatronics</HighlightedText> engineer integrating hardware and software to create applications in machine learning, robotics, and finance. Currently taking companies from <HighlightedText delay={0.8} from="top">0 to 1</HighlightedText></p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"> <RiTwitterXLine /> dan10ish</Button>
          <Button variant="outline" size="sm"> <RiInstagramFill /> dan10ish</Button>
          <Button variant="outline" size="sm"> <RiThreadsLine /> dan10ish</Button>
        </div>
      </div>
    </div>
  )
}
