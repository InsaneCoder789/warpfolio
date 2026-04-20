import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface GithubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  html_url: string;
  topics: string[];
  language: string | null;
  fork: boolean;
}

const fetchPinnedRepos = async (): Promise<GithubRepo[]> => {
  const { data, error } = await supabase.functions.invoke("github-pinned-repos");
  if (error) throw error;
  if (!data?.repos) throw new Error("No repos returned");
  return data.repos as GithubRepo[];
};

export const useGithubRepos = () => {
  return useQuery({
    queryKey: ["github-pinned-repos"],
    queryFn: fetchPinnedRepos,
    staleTime: 1000 * 60 * 10, // 10 min
    refetchOnWindowFocus: false,
  });
};
