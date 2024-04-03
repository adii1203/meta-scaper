import express from "express";
import routes from "./routes/route.js";
const app = express();

app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Hello World! again");
});

export default app;
