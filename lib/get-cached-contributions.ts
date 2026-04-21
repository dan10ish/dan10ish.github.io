import { unstable_cache } from "next/cache"

import type { Activity } from "@/components/contribution-graph/contribution-graph"

type GitHubContributionsResponse = {
  contributions: Activity[]
}

export const getCachedContributions = unstable_cache(
  async (username: string) => {
    const base =
      process.env.GITHUB_CONTRIBUTIONS_API_URL ||
      "https://github-contributions-api.jogruber.de"
    const res = await fetch(`${base}/v4/${username}?y=last`)
    if (!res.ok) {
      throw new Error(`GitHub contributions API failed: ${res.status}`)
    }
    const data = (await res.json()) as GitHubContributionsResponse
    return data.contributions ?? []
  },
  ["github-contributions"],
  { revalidate: 86400 }
)
