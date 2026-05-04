import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import playwright from "file:///C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.js";

const { chromium } = playwright;

const portfolioRoot = "C:/Users/ADMIN/Desktop/VS PROJECTS/PORTFOLIO";
const outputDir = path.join(portfolioRoot, "assets", "previews");

const projects = [
  {
    name: "autohub",
    file: "C:/Users/ADMIN/Desktop/VS PROJECTS/Autohubcarsales/index.html",
  },
  {
    name: "ecommerce",
    file: "C:/Users/ADMIN/Desktop/VS PROJECTS/MWENDWA/E-commerce/index.html",
  },
  {
    name: "hotel",
    file: "C:/Users/ADMIN/Desktop/VS PROJECTS/HOTEL/INDEX.HTML",
  },
  {
    name: "netflix",
    file: "C:/Users/ADMIN/Desktop/VS PROJECTS/netflixdesign/index.html",
  },
  {
    name: "youtube",
    file: "C:/Users/ADMIN/Desktop/VS PROJECTS/Youtube/index.html",
  },
  {
    name: "blog",
    file: "C:/Users/ADMIN/Desktop/VS PROJECTS/MWENDWA PROJECTS/BLOG/blog.html",
  },
];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });

for (const project of projects) {
  const url = pathToFileURL(project.file).href;
  const screenshotPath = path.join(outputDir, `${project.name}.png`);

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
  } catch (error) {
    console.warn(`Captured ${project.name} after navigation warning: ${error.message}`);
  }

  await page.screenshot({ path: screenshotPath, fullPage: false });

  console.log(`Saved ${screenshotPath}`);
}

await browser.close();

const manifest = projects
  .map((project) => `${project.name}: assets/previews/${project.name}.png`)
  .join("\n");

await writeFile(path.join(outputDir, "manifest.txt"), manifest);
