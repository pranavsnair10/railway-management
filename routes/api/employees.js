import express from "express";
import {
  getAllEmployees,
  getEmployee,
  addNewEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../controllers/employeeController.js";
import { v4 as uuid } from "uuid";

export const employeeRouter = express.Router();

employeeRouter
  .route("/")
  .get(async (req, res) => {
    if (req.query?.e_no) res.json(await getEmployee(req.query.e_no));
    res.json(await getAllEmployees());
  })
  .post(async (req, res) => {
    const employeeDetails = {
      e_no: uuid(),
      e_name: req.body.e_name,
      salary: req.body.salary,
      d_no: req.body.d_no,
      mgr_no: req.body.mgr_no,
      date_of_join: req.body.date_of_join,
      designation: req.body.designation,
      address: req.body.address,
      city: req.body.city,
      pincode: req.body.pincode,
    };
    try {
      await addNewEmployee(employeeDetails);
      const addedEmployeeDetails = await getEmployee(employeeDetails.e_no);
      res.status(201);
      res.json({ message: "Success!", ...addedEmployeeDetails });
      console.log(req.body);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error!" });
    }
  });

employeeRouter
  .route("/:e_no")
  .get(async (req, res) => {
    try {
      res.status(200).json(await getEmployee(req.params.e_no));
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .patch(async (req, res) => {
    try {
      if (!req.params?.e_no) {
        res.status(400).json("Invalid request. No identifier found.");
        return;
      }

      const employeeDetails = {
        ...(req.body?.e_name ? { e_name: req.body?.e_name } : {}),
        ...(req.body?.salary ? { salary: req.body?.salary } : {}),
        ...(req.body?.d_no ? { d_no: req.body?.d_no } : {}),
        ...(req.body?.mgr_no ? { mgr_no: req.body?.mgr_no } : {}),
        ...(req.body?.date_of_join
          ? { date_of_join: req.body?.date_of_join }
          : {}),
        ...(req.body?.designation
          ? { designation: req.body?.designation }
          : {}),
        ...(req.body?.address ? { address: req.body?.address } : {}),
        ...(req.body?.city ? { city: req.body?.city } : {}),
        ...(req.body?.pincode ? { pincode: req.body?.pincode } : {}),
      };
      console.log(employeeDetails);
      await updateEmployee(req.params.e_no, employeeDetails);
      const updatedDetails = await getEmployee(req.params.e_no);
      res.json(updatedDetails);
    } catch (error) {
      res.json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      await deleteEmployee(req.params.e_no);
      res.status(204).json();
    } catch (error) {
      res.status(500).json(error);
    }
  });
