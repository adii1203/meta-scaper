import express from "express";
import metadataRouter from "./routes/metadata.js";
const app = express();

app.use("/", metadataRouter);

app.get("/", (req, res) => {
  res.send("Hello World! again");
});

export default app;
