import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import sequelize from "./utils/database.js";

import messagesRoutes from "./routes/messages.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

config();
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/messages", messagesRoutes);

// Root
app.get("/", (req, res) => {
  res.status(200).json({ message: "Interview task" });
});

// Error handling
app.use(errorMiddleware);

// DB init
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
