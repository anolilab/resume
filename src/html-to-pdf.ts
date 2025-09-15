import fs from "node:fs";

import type { Browser } from "puppeteer";
import { launch } from "puppeteer";

const setupBrowser = async (): Promise<Browser> => {
    try {
        return await launch({
            args: [],
            headless: true,
        });
    } catch {
        // eslint-disable-next-line no-console
        console.error("Couldn't launch the browser, trying again.");

        return await setupBrowser();
    }
};

export default async function htmlToPdf(htmlPath: string, assets: string[], exportPath: string): Promise<void> {
    // eslint-disable-next-line no-console
    console.log("Opening puppeteer...");
    const browser = await setupBrowser();
    const page = await browser.newPage();

    // eslint-disable-next-line no-console
    console.log("Adding styles and scripts...");

    const transformedAssets = assets.map((asset) => {
        if (asset.includes(".css")) {
            return `<style>${fs.readFileSync(asset).toString()}</style>`;
        }

        return "";
    });

    // eslint-disable-next-line no-console
    console.log("Opening page...");
    await page.setContent(
        fs
            .readFileSync(htmlPath)
            .toString()
            .replaceAll(/<link.*>/g, "")
            .replace("</title>", `</title>${transformedAssets.join("")}`),
        { waitUntil: ["domcontentloaded"] },
    );
    // eslint-disable-next-line no-console
    console.log("Generating PDF...");

    try {
        const pdf = await page.pdf({
            displayHeaderFooter: false,
            format: "A4",
            margin: {
                bottom: "0.4in",
                left: "0.4in",
                right: "0.4in",
                top: "0.35in",
            },
            printBackground: true,
        });

        // eslint-disable-next-line no-console
        console.log("Saving file...");

        fs.writeFileSync(exportPath, pdf);

        // eslint-disable-next-line no-console
        console.log("Done");
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Couldn't generate PDF", error);
    } finally {
        await browser.close();
    }
}
