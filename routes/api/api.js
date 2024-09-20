import express from "express";
import { employeeRouter } from "./employees.js";

export const apiRouter = express.Router();

apiRouter.use("/employees", employeeRouter);
