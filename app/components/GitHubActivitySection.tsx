import { Suspense } from "react";

import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions/github-contributions";
import { getCachedContributions } from "@/lib/get-cached-contributions";

const GITHUB_USERNAME = "dan10ish";
const GITHUB_PROFILE_URL = "https://github.com/dan10ish";

export default function GitHubActivitySection() {
  const contributions = getCachedContributions(GITHUB_USERNAME);

  return (
    <Suspense fallback={<GitHubContributionsFallback />}>
      <GitHubContributions
        contributions={contributions}
        githubProfileUrl={GITHUB_PROFILE_URL}
      />
    </Suspense>
  );
}
