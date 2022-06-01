import fs from "node:fs";
import puppeteer, { Browser } from "puppeteer";

async function setupBrowser(): Promise<Browser> {
    try {
        return await puppeteer.launch({
            headless: true,
            args: [],
        });
    } catch {
        // eslint-disable-next-line no-console
        console.error("Couldn't launch the browser, trying again.");

        return await setupBrowser();
    }
}

export default async function htmlToPdf(htmlPath: string, assets: string[], exportPath: string) {
    // eslint-disable-next-line no-console
    console.log("Opening puppeteer...");
    const browser = await setupBrowser();
    const page = await browser.newPage();

    // eslint-disable-next-line no-console
    console.log("Adding styles and scripts...");

    const transformedAssets = assets.map((asset) => {
        // eslint-disable-next-line no-await-in-loop
        if (asset.includes(".css")) {
            return `<style>${fs.readFileSync(asset).toString()}</style>`;
        }

        return `<script>${fs.readFileSync(asset).toString()}</script>`;
    });

    // eslint-disable-next-line no-console
    console.log("Opening page...");
    await page.setContent(
        fs
            .readFileSync(htmlPath)
            .toString()
            .replaceAll(/<link.*>/gm, "")
            .replace("</title>", `</title>${transformedAssets.join("")}`),
        { waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"] },
    );
    // eslint-disable-next-line no-console
    console.log("Generating PDF...");

    try {
        const pdf = await page.pdf({
            format: "A4",
            displayHeaderFooter: false,
            printBackground: true,
            margin: {
                top: "0.35in",
                bottom: "0.4in",
                left: "0.4in",
                right: "0.4in",
            },
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
