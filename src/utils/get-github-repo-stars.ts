import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";
import { env } from "node:process";

const octokit = new Octokit({
    auth: env.VITE_GITHUB_AUTH_TOKEN,
});

const githubRepoCache: { [key: string]: RestEndpointMethodTypes["repos"]["listForOrg"]["response"] & { stargazers_count?: number } } = {};

export default async function getRepoStars(url: string) {
    const ownerAndRepo = url.replace("https://github.com/", "");
    const [owner, repo]: string[] = ownerAndRepo.split("/");

    if (githubRepoCache[ownerAndRepo]) {
        return githubRepoCache[ownerAndRepo]?.stargazers_count;
    }

    // Compare: https://docs.github.com/en/rest/reference/repos/#list-organization-repositories
    return octokit.rest.repos
        .get({
            owner: owner as string,
            repo: repo as string,
        })
        .then(({ data }) => {
            // @ts-ignore
            githubRepoCache[ownerAndRepo] = data;
            // @ts-ignore
            return data.stargazers_count;
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.error(error);

            return "NaN";
        });
}
