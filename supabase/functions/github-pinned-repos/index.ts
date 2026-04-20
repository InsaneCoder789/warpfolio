// Fetches pinned repos for a GitHub user via GraphQL.
// Uses GITHUB_TOKEN secret. Public endpoint (no auth required).
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GITHUB_USERNAME = "InsaneCoder789";

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            isFork
            primaryLanguage { name }
            repositoryTopics(first: 6) {
              nodes { topic { name } }
            }
          }
        }
      }
    }
  }
`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const token = Deno.env.get("GITHUB_TOKEN");
    if (!token) {
      return new Response(
        JSON.stringify({ error: "GITHUB_TOKEN is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const ghRes = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "lovable-portfolio",
      },
      body: JSON.stringify({ query: QUERY, variables: { login: GITHUB_USERNAME } }),
    });

    const json = await ghRes.json();

    if (!ghRes.ok || json.errors) {
      console.error("GitHub API error:", json);
      return new Response(
        JSON.stringify({ error: "GitHub API error", details: json }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const nodes = json?.data?.user?.pinnedItems?.nodes ?? [];

    const repos = nodes.map((r: {
      name: string;
      description: string | null;
      url: string;
      stargazerCount: number;
      isFork: boolean;
      primaryLanguage: { name: string } | null;
      repositoryTopics: { nodes: { topic: { name: string } }[] };
    }) => ({
      name: r.name,
      description: r.description,
      html_url: r.url,
      stargazers_count: r.stargazerCount,
      fork: r.isFork,
      language: r.primaryLanguage?.name ?? null,
      topics: r.repositoryTopics?.nodes?.map((n) => n.topic.name) ?? [],
    }));

    return new Response(JSON.stringify({ repos }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        // Cache for 10 min on edge
        "Cache-Control": "public, max-age=600",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("github-pinned-repos error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
