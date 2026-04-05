import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RiInstagramFill, RiRocketFill, RiThreadsLine, RiTwitterXLine } from "@remixicon/react";
import { TextMarquee } from "@/components/text-marquee";

export default function Page() {
  return (
    <div className="min-h-svh p-6 flex items-center justify-center">
      <div className="max-w-[400px]">
        <div className="flex items-center gap-2">
          <div className="font-semibold">Danish</div>
          <div className="text-muted-foreground flex items-center gap-1">, Generalist <RiRocketFill color="#0000ff" size={16} /></div>
        </div>
        <Separator className="my-4" />
        <div className="">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate non nostrum dolor. Aperiam ipsa consectetur reprehenderit expedita ipsum laboriosam at?</p>
        </div>
        <div className="flex gap-2 my-4">
          <Button variant="outline" size="sm"> <RiTwitterXLine /> dan10ish</Button>
          <Button variant="outline" size="sm"> <RiInstagramFill /> dan10ish</Button>
          <Button variant="outline" size="sm"> <RiThreadsLine /> dan10ish</Button>
        </div>
      </div>
    </div>
  )
}
