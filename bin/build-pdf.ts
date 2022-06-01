import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import htmlToPdf from "../src/html-to-pdf";

async function buildPdf() {
    const distributionPath = path.join(process.cwd(), "dist");
    const assets = fs.readdirSync(path.join(distributionPath, "assets")).map((asset) => path.join(distributionPath, "assets", asset));

    await htmlToPdf(path.join(distributionPath, "index.html"), assets, path.join(distributionPath, "resume.pdf"));
}

buildPdf()
    .then(() => {
        // eslint-disable-next-line unicorn/no-process-exit
        process.exit(0);
    })
    .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        // eslint-disable-next-line unicorn/no-process-exit
        process.exit(1);
    });
