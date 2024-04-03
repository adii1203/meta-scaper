import puppeteer from "puppeteer";

export const getScreenShot = async (url) => {
  console.log("lauching browser");
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/chromium-browser",
    args: ["--no-sandbox", "--disable-gpu"],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 1024,
      deviceScaleFactor: 1,
    });
    console.log("navigating to url");
    await page.goto(url, {
      waitUntil: "load",
    });
    console.log("wating");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 500;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 150);
      });
    });
    const str = await page.screenshot({
      fullPage: true,
      type: "webp",
    });

    await browser.close();

    return str;
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
};
