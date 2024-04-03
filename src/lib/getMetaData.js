import puppeteer from "puppeteer";

export const getMetaData = async (url) => {
  console.log("launching browser");
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/chromium-browser",
    args: ["--no-sandbox", "--disable-gpu"],
  });

  try {
    const page = await browser.newPage();
    console.log("navigateing to url");
    await page.goto(url, {
      waitUntil: "load",
    });

    console.log("getting metadata");

    const title = await page.title();

    const description = await page.evaluate(() => {
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      const ogDescription = document.querySelector(
        'meta[property="og:description"]'
      );
      return metaDescription
        ? metaDescription.content
        : ogDescription
        ? ogDescription.content
        : "";
    });

    const image = await page.evaluate(() => {
      const metaImage = document.querySelector('meta[property="og:image"]');
      return metaImage ? metaImage.content : "";
    });

    const icon = await page.evaluate(() => {
      const icon = document.querySelector('link[rel="icon"]');
      const favicon = document.querySelector('link[rel="shortcut icon"]');
      return icon ? icon.href : favicon ? favicon.href : "";
    });

    await browser.close();
    return {
      title,
      description,
      image,
      icon,
    };
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
};
