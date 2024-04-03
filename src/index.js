import app from "./app.js";

const PORT = 3000;

const startServer = async () => {
  try {
    app.on("error", (e) => {
      console.error("Error starting server:", e);
    });
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
