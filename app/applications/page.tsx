import Link from "next/link";
import { ApplicationsProjectsTable } from "@/components/applications-projects-table";
import { buttonVariants } from "@/components/ui/button-variants";
import { RiArrowLeftLine, RiGithubLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

export default function ApplicationsPage() {
  return (
    <div className="box-border flex h-svh flex-col overflow-hidden p-8 md:p-6">
      <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col justify-start gap-6">
        <div className="shrink-0 flex flex-col gap-6">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "-ml-3 inline-flex w-fit",
            )}
          >
            <RiArrowLeftLine />
            Back
          </Link>

          <div className="flex w-full items-center justify-between gap-4">
            <h1 className="font-semibold text-xl tracking-tight">Applications</h1>
            <a
              href="https://github.com/dan10ish"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "shrink-0",
              )}
            >
              <RiGithubLine />
              dan10ish
            </a>
          </div>
        </div>

        <div className="min-h-0 w-full min-w-0 shrink-0">
          <ApplicationsProjectsTable />
        </div>
      </div>
    </div>
  );
}
