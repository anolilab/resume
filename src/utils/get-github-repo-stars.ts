import { env } from "node:process";
import type { RestEndpointMethodTypes } from "@octokit/rest";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    auth: env.VITE_GITHUB_AUTH_TOKEN,
});

const githubRepoCache: Record<string, RestEndpointMethodTypes["repos"]["listForOrg"]["response"] & { stargazers_count?: number }> = {};

export default async function getRepoStars(url: string): Promise<number | undefined> {
    const ownerAndRepo = url.replace("https://github.com/", "");
    const [owner, repo]: string[] = ownerAndRepo.split("/");

    // eslint-disable-next-line security/detect-object-injection
    if (githubRepoCache[ownerAndRepo]) {
        // eslint-disable-next-line security/detect-object-injection
        return githubRepoCache[ownerAndRepo]?.stargazers_count;
    }

    // Compare: https://docs.github.com/en/rest/reference/repos/#list-organization-repositories
    return await octokit.rest.repos
        .get({
            owner: owner as string,
            repo: repo as string,
        })
        .then(({ data }) => {
            // @ts-expect-error TODO find the correct type for this
            // eslint-disable-next-line security/detect-object-injection
            githubRepoCache[ownerAndRepo] = data;

            return data.stargazers_count;
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.error(error);

            return Number.NaN;
        });
}
