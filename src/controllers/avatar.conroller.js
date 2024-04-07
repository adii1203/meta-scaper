import { createCanvas, registerFont } from "canvas";
import { asyncHandler } from "../util/asyncHandler.js";

export const getAvatar = asyncHandler(async (req, res) => {
  const {
    name,
    width = 100,
    height = 100,
    color = "fff",
    text = "000",
    bold = false,
    format = "png",
    is_upercase = "true",
  } = req.query;
  if (!name) {
    res.status(400).json({ message: "Name is required" });
  }
  try {
    registerFont("src/font/Poppins-Regular.ttf", {
      family: "Poppins-Regular",
    });
    registerFont("src/font/Poppins-Bold.ttf", {
      family: "Poppins-Bold",
    });
    const firstChar =
      is_upercase === "true" ? name.charAt(0).toUpperCase() : name.charAt(0);

    const canvas = createCanvas(Number(width), Number(height));
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = `#${color}`;
    ctx.fillRect(0, 0, Number(width), Number(height));
    ctx.fillStyle = `#${text}`;
    ctx.font =
      bold == "true" ? "30px 'Poppins-Bold'" : "30px 'Poppins-Regular'";
    const textSize = ctx.measureText(firstChar);
    ctx.fillText(
      firstChar,
      canvas.width / 2 - textSize.width / 2,
      canvas.height / 2 + textSize.actualBoundingBoxAscent / 2
    );

    if (format === "jpeg") {
      res.setHeader("Content-Type", "image/jpeg");
      canvas.createJPEGStream().pipe(res);
    } else {
      res.setHeader("Content-Type", "image/png");
      canvas.createPNGStream().pipe(res);
    }
  } catch (error) {
    console.log(error);
  }
});
