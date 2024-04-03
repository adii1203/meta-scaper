import { getMetaData } from "../lib/getMetaData.js";
import ApiError from "../util/ApiError.js";
import ApiResponce from "../util/ApiResponce.js";
import { asyncHandler } from "../util/asyncHandler.js";

export const handelMetaData = asyncHandler(async (req, res) => {
  const { url } = req.query;
  if (!url) throw new ApiError(400, "Url is missing");

  try {
    const metadata = await getMetaData(url);

    if (!metadata) {
      throw new ApiError(404, "No metadata found");
    }

    metadata.url = url;

    res.status(200).json(new ApiResponce(200, true, "success", metadata));
  } catch (error) {
    throw new ApiError(404, "No metadata found");
  }
});
