import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RiInstagramFill, RiRocketFill, RiThreadsLine, RiTwitterXLine } from "@remixicon/react";
import { TextMarquee } from "@/components/text-marquee";

export default function Page() {
  return (
    <div className="min-h-svh p-6 flex items-center justify-center">
      <div className="max-w-[400px]">
        <TextMarquee
          height={50}
          speed={1}
          prefix={
            <span>
              <span className="font-semibold">Danish</span>, I&nbsp;
            </span>
          }
        >
          <p className="font-medium">code</p>
          <p className="font-medium">play&nbsp;football</p>
          <p className="font-medium">travel</p>
          <p className="font-medium">play&nbsp;piano</p>
          <p className="font-medium">take&nbsp;videos</p>
          <p className="font-medium">take&nbsp;companies&nbsp;from&nbsp;0&nbsp;to&nbsp;1</p>
          <p className="font-medium">read</p>
          <p className="font-medium">sleep</p>
        </TextMarquee>
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
