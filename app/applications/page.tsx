import Link from "next/link";
import { ApplicationsProjectsTable } from "@/components/applications-projects-table";
import { Button } from "@/components/ui/button";
import { RiArrowLeftLine } from "@remixicon/react";
import { projects } from "./data";

export default function ApplicationsPage() {
  const withDemo = projects.filter((p) => p.liveDemo).length;

  return (
    <div className="box-border flex h-svh flex-col overflow-hidden p-8 md:p-6">
      <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col justify-start gap-6">
        <div className="shrink-0 flex flex-col gap-6">
          <Link href="/">
            <Button variant="outline" size="sm" className="-ml-3">
              <RiArrowLeftLine />
              Back
            </Button>
          </Link>

          <h1 className="font-semibold text-xl tracking-tight">Applications</h1>
        </div>

        <div className="min-h-0 w-full min-w-0 shrink-0">
          <ApplicationsProjectsTable />
        </div>
      </div>
    </div>
  );
}
