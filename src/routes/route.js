import { Router } from "express";
import { handelMetaData } from "../controllers/metaData.controller.js";
import { handelScreenShot } from "../controllers/screenShot.controllers.js";

const router = Router();

router.route("/metadata").get(handelMetaData);
router.route("/screenshot").get(handelScreenShot);

export default router;
