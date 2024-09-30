import express from "express";
import { railwayRouter } from "./railwayRouter.js";

export const apiRouter = express.Router();

apiRouter.use("/trains", railwayRouter);
