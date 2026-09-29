import { chromium } from "playwright-core";

const baseUrl = process.env.SPEED_PILOT_URL || "http://127.0.0.1:3011";
const outputDir = "reports/speed-pilot-bsc01";
const executablePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await chromium.launch({ executablePath, headless: true });

async function freshPage(viewport) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  return { context, page };
}

try {
  const denied = await freshPage({ width: 390, height: 844 });
  await denied.page.getByRole("heading", { name: "Age Verification" }).waitFor();
  await denied.page.getByRole("button", { name: "No, I am not" }).click();
  await denied.page.getByRole("heading", { name: "Access Denied" }).waitFor();
  if (!(await denied.page.getByRole("link", { name: "Exit to Google" }).isVisible())) {
    throw new Error("Deny flow did not keep the page blocked");
  }
  await denied.context.close();

  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1280, height: 900 },
  ]) {
    const confirmed = await freshPage(viewport);
    await confirmed.page.getByRole("heading", { name: "Age Verification" }).waitFor();
    await confirmed.page.getByRole("button", { name: "Yes, I am 19+" }).click();
    await confirmed.page.getByRole("heading", {
      name: "Brampton Smoke Cannabis — Falby Rd Unit B, East Brampton",
    }).waitFor();
    if (await confirmed.page.getByRole("heading", { name: "Age Verification" }).isVisible()) {
      throw new Error("Confirm flow left the age gate visible");
    }
    await confirmed.page.screenshot({
      path: `${outputDir}/homepage-${viewport.width}px.png`,
      fullPage: false,
    });
    await confirmed.context.close();
  }

  console.log("PASS age-gate deny/confirm and 390px/1280px screenshots");
} finally {
  await browser.close();
}
