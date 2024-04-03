import { Router } from "express";

const router = Router();

router.route("/metadata").get((req, res) => {
  res.send("metadata route working");
});

export default router;
