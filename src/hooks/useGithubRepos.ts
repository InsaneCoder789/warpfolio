import { useQuery } from "@tanstack/react-query";

export interface GithubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  html_url: string;
  topics: string[];
  language: string | null;
  fork: boolean;
}

const GITHUB_USERNAME = "InsaneCoder789";

const fetchRepos = async (): Promise<GithubRepo[]> => {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30&type=owner`
  );
  if (!res.ok) throw new Error("Failed to fetch repos");
  const repos: GithubRepo[] = await res.json();
  // Filter out forks, sort by stars then recent
  return repos
    .filter((r) => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);
};

export const useGithubRepos = () => {
  return useQuery({
    queryKey: ["github-repos", GITHUB_USERNAME],
    queryFn: fetchRepos,
    staleTime: 1000 * 60 * 10, // 10 min
    refetchOnWindowFocus: false,
  });
};
