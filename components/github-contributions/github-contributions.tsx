"use client"

import { format } from "date-fns"
import { LoaderIcon } from "lucide-react"
import { use } from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Activity } from "@/components/contribution-graph/contribution-graph"
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/contribution-graph/contribution-graph"
import Link from "next/link"

export function GitHubContributions({
  contributions,
  githubProfileUrl,
}: {
  contributions: Promise<Activity[]>
  githubProfileUrl: string
}) {
  const data = use(contributions)

  return (
    <ContributionGraph
      className="mx-auto py-2"
      data={data}
      blockSize={11}
      blockMargin={3}
      blockRadius={2}
      fontSize={10}
    >
      <ContributionGraphCalendar
        className="no-scrollbar px-2"
        title="GitHub Contributions"
      >
        {({ activity, dayIndex, weekIndex }) => (
          <Tooltip>
            <TooltipTrigger render={<g />}><ContributionGraphBlock
              activity={activity}
              dayIndex={dayIndex}
              weekIndex={weekIndex}
            /></TooltipTrigger>
            <TooltipContent className="font-sans">
              <p>
                {activity.count} contribution{activity.count === 1 ? "" : "s"}{" "}
                on {format(new Date(activity.date), "dd.MM.yyyy")}
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      </ContributionGraphCalendar>

      <div className="flex justify-between items-baseline text-xs mt-2">
        <div><ContributionGraphLegend /></div>
        <div><Link href={githubProfileUrl} target="_blank" rel="noopener">
          @dan10ish
        </Link></div>
      </div>
    </ContributionGraph>
  )
}

export function GitHubContributionsFallback() {
  return (
    <div className="flex h-40.5 w-full items-center justify-center">
      <LoaderIcon className="animate-spin text-muted-foreground" />
    </div>
  )
}
