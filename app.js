import express from "express";
import cors from "cors";
import { apiRouter } from "./routes/api/api.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { corsOptions } from "./config/cors.config.js";
import morgan from "morgan";

const app = express();

app.use(morgan("short"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api", apiRouter);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
