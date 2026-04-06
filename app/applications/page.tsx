import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RiArrowLeftLine } from "@remixicon/react";

export default function ApplicationsPage() {
  return (
    <div className="min-h-svh p-8 md:p-6 flex items-center justify-center">
      <div className="max-w-[400px] flex flex-col gap-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="-ml-3 gap-1">
            <RiArrowLeftLine size={16} />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
          <p className="text-muted-foreground mt-2">
            Details about specific applications and projects will be listed here.
          </p>
        </div>
      </div>
    </div>
  );
}
