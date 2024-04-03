import ApiResponce from "../util/ApiResponce.js";
import { asyncHandler } from "../util/asyncHandler.js";
import { getScreenShot } from "../lib/getScreenShot.js";

export const handelScreenShot = asyncHandler(async (req, res) => {
  const { url } = req.query;
  if (!url) throw new ApiError(400, "url is missing");

  try {
    const str = await getScreenShot(url);
    if (!str) {
      return res
        .status(404)
        .json(new ApiResponce(404, false, "No screenshot found"));
    }
    res.setHeader("Content-Type", "image/png");
    res.status(200).send(str);
  } catch (error) {
    console.log(error);
  }
});
