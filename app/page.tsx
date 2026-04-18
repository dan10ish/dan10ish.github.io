import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  RiInstagramFill,
  RiMailFill,
  RiSnapchatFill,
  RiThreadsLine,
  RiTwitterXLine,
  RiWindowLine,
} from "@remixicon/react";
import { Highlighter } from "@/components/ui/highlighter";
import { RocketIcon } from "@/components/ui/rocket";
import { cn } from "@/lib/utils";
import Link from "next/link";

const EMAIL = "aansaridan@gmail.com";

export default function Page() {
  return (
    <div className="min-h-svh p-8 md:p-6 flex items-center justify-center">
      <div className="max-w-[400px] flex flex-col gap-6 md:gap-4">
        <div className="flex items-center gap-1.5">
          <h1 className="font-semibold">Danish,</h1>
          <h2 className="text-muted-foreground font-medium">Generalist</h2>
          <RocketIcon size={18} alwaysAnimate={true} />
        </div>
        <div>
          <p className="text-muted-foreground font-medium leading-relaxed">
            I&apos;m a <Highlighter action="underline" color="#6366f1" iterations={1} strokeWidth={2} padding={1}>mechatronics</Highlighter> engineer integrating hardware and software to create <Link href="/applications" className="inline-flex items-center gap-1 text-foreground decoration-border hover:decoration-foreground transition-all align-baseline"><RiWindowLine className="size-[0.9em] -translate-y-[0.1em]" /><span className="underline underline-offset-4 decoration-1">applications</span></Link> in machine learning, robotics, and finance. Currently taking companies from <Highlighter action="highlight" color="#fde047" iterations={1} padding={2}>zero to one</Highlighter>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <RiTwitterXLine /> dan10ish
          </Button>
          <Button variant="outline" size="sm">
            <RiInstagramFill /> dan10ish
          </Button>
          <Button variant="outline" size="sm">
            <RiThreadsLine /> dan10ish
          </Button>
          <Button variant="outline" size="sm" render={<a href="https://www.snapchat.com/add/dan10ish" />}>
            <RiSnapchatFill /> dan10ish
          </Button>
          <div
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "inline-flex max-w-full min-w-0 items-center gap-1 pr-0.5",
            )}
          >
            <a
              href={`mailto:${EMAIL}`}
              aria-label={`Email ${EMAIL}`}
              className="inline-flex min-w-0 touch-manipulation items-center gap-1.5 rounded-md bg-transparent px-0.5 py-0.5 text-foreground no-underline outline-none [-webkit-tap-highlight-color:transparent] hover:bg-accent/40 active:bg-accent/50"
            >
              <RiMailFill className="shrink-0" />
              <span className="whitespace-nowrap">Mail</span>
            </a>
            <CopyButton
              value={EMAIL}
              size="sm"
              className="shrink-0 text-muted-foreground hover:text-foreground"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
