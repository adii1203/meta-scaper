import express from "express";
import routes from "./routes/route.js";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Hello World! again");
});

export default app;
