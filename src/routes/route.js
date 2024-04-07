import { Router } from "express";
import { handelMetaData } from "../controllers/metaData.controller.js";
import { handelScreenShot } from "../controllers/screenShot.controllers.js";
import { getAvatar } from "../controllers/avatar.conroller.js";

const router = Router();

router.route("/metadata").get(handelMetaData);
router.route("/screenshot").get(handelScreenShot);
router.route("/avatar").get(getAvatar);

export default router;
