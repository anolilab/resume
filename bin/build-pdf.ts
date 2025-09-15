import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import htmlToPdf from "../src/html-to-pdf";

const buildPdf = async (): Promise<void> => {
    const distributionPath = path.join(process.cwd(), "dist");
    const assets = fs.readdirSync(path.join(distributionPath, "assets")).map((asset) => path.join(distributionPath, "assets", asset));

    await htmlToPdf(path.join(distributionPath, "index.html"), assets, path.join(distributionPath, "resume.pdf"));
};

buildPdf()
    .then(() => {
        // eslint-disable-next-line unicorn/no-process-exit
        process.exit(0);
    })
    // eslint-disable-next-line unicorn/prefer-top-level-await
    .catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error(error);
        // eslint-disable-next-line unicorn/no-process-exit
        process.exit(1);
    });
