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
const PINNED_REPOS = ["k1000-Main", "Trilingo", "Lakshman-Rekha", "Student-Database-Manager"];

const fetchRepos = async (): Promise<GithubRepo[]> => {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30&type=owner`
  );
  if (!res.ok) throw new Error("Failed to fetch repos");
  const repos: GithubRepo[] = await res.json();
  return repos.filter((r) => PINNED_REPOS.includes(r.name));
};

export const useGithubRepos = () => {
  return useQuery({
    queryKey: ["github-repos", GITHUB_USERNAME],
    queryFn: fetchRepos,
    staleTime: 1000 * 60 * 10, // 10 min
    refetchOnWindowFocus: false,
  });
};
