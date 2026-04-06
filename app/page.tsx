import { Button } from "@/components/ui/button";
import { RiInstagramFill, RiThreadsLine, RiTwitterXLine } from "@remixicon/react";
import { Highlighter } from "@/components/ui/highlighter";

export default function Page() {
  return (
    <div className="min-h-svh p-8 md:p-6 flex items-center justify-center">
      <div className="max-w-[400px] flex flex-col gap-6 md:gap-4">
        <div>
          <h1 className="font-semibold">Danish</h1>
        </div>
        <div>
          <p className="text-muted-foreground font-medium">
            I&apos;m a <Highlighter action="underline" color="#6366f1" iterations={1} strokeWidth={2} padding={1}>mechatronics</Highlighter> engineer integrating hardware and software to create applications in machine learning, robotics, and finance. Currently taking companies from <Highlighter action="highlight" color="#fde047" iterations={1} padding={2}>zero to one</Highlighter>
          </p>
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
