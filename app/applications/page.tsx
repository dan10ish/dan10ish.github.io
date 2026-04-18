import Link from "next/link";
import { ApplicationsProjectsTable } from "@/components/applications-projects-table";
import { Button } from "@/components/ui/button";
import { RiArrowLeftLine } from "@remixicon/react";
import { projects } from "./data";

export default function ApplicationsPage() {
  const withDemo = projects.filter((p) => p.liveDemo).length;

  return (
    <div className="box-border flex h-svh flex-col overflow-hidden p-8 md:p-6">
      <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col justify-start gap-4">
        <div className="shrink-0 space-y-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="-ml-3">
              <RiArrowLeftLine />
              Back
            </Button>
          </Link>

          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-xl tracking-tight">Applications</h1>
            <p className="text-muted-foreground font-medium leading-relaxed">
              <span className="text-foreground">{projects.length}</span> projects,{" "}
              <span className="text-foreground">{withDemo}</span> with a live demo.
            </p>
          </div>
        </div>

        <div className="min-h-0 w-full min-w-0 shrink-0">
          <ApplicationsProjectsTable />
        </div>
      </div>
    </div>
  );
}
