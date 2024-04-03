import { Router } from "express";
import { handelMetaData } from "../controllers/metaData.controller.js";

const router = Router();

router.route("/metadata").get(handelMetaData);

export default router;
