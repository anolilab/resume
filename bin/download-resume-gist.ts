import { Octokit } from "@octokit/rest";
import fs from "node:fs";
import { env } from "node:process";
import { loadEnv } from "vite";

Object.assign(process.env, loadEnv("", process.cwd()));

const octokit = new Octokit({
    auth: env.VITE_GITHUB_AUTH_TOKEN,
});

// eslint-disable-next-line no-console
console.log("Downloading resume.json");

// Compare: https://docs.github.com/rest/reference/gists#get-a-gist
octokit.rest.gists
    .get({ gist_id: env.VITE_GITHUB_RESUME_GIST_ID as string })
    .then(({ data }) => {
        const { files } = data;

        Object.keys(files as Object)?.forEach((key) => {
            fs.writeFileSync(key, ((files as { [key: string]: object })[key] as { content: string }).content as string, "utf8");
            // eslint-disable-next-line no-console
            console.log(`Wrote "${key}" to disk.`);
        });
    })
    .then(() => {
        // eslint-disable-next-line no-console
        console.log("Done");
        // eslint-disable-next-line unicorn/no-process-exit
        process.exit(0);
    })
    .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        // eslint-disable-next-line unicorn/no-process-exit
        process.exit(1);
    });
