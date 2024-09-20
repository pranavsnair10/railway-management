import { query } from "../services/db.js";

export const getAllEmployees = async () =>
  await query("SELECT * FROM employee");

export const getEmployee = async (id) => {
  try {
    const res = await query("SELECT * FROM employee WHERE e_no = ?", [id]);
    if (res.length < 1) {
      return {
        is_error: true,
        message: "Employee with the given details is not found",
      };
    }
    return res[0];
  } catch (error) {
    console.error(error);
  }
};

export const addNewEmployee = async (employeeDetails) => {
  const {
    e_no,
    e_name,
    salary,
    d_no,
    mgr_no,
    date_of_join,
    designation,
    address,
    city,
    pincode,
  } = employeeDetails;
  const res = await query(
    `INSERT INTO employee (e_no, e_name, salary, d_no, mgr_no, date_of_join, designation, address, city, pincode)
    VALUES (?, ?, ?, ?, ?, ?, ? ,? ,?, ?)`,
    [
      e_no,
      e_name,
      salary,
      d_no,
      mgr_no,
      date_of_join,
      designation,
      address,
      city,
      pincode,
    ]
  );
};

export const updateEmployee = async (id, updatedEmployeeDetails) => {
  const [oldEmployeeDetails] = await query(
    `SELECT * FROM employee WHERE e_no = ?`,
    [id]
  );

  if (oldEmployeeDetails === undefined) {
    throw new Error("Employee with that details does not exist");
  }
  console.log("Old: ", oldEmployeeDetails);

  if (oldEmployeeDetails) {
    try {
      const employeeDetails = {
        ...oldEmployeeDetails,
        ...updatedEmployeeDetails,
      };
      const {
        e_no,
        e_name,
        salary,
        d_no,
        mgr_no,
        date_of_join,
        designation,
        address,
        city,
        pincode,
      } = employeeDetails;
      console.log("After merge", employeeDetails);
      const res = await query(
        `UPDATE employee 
         SET e_name = ?, salary = ?, d_no = ?, mgr_no = ?, date_of_join = ?, designation = ?, address = ?, city = ?, pincode = ? 
         WHERE e_no = ?`,
        [
          e_name,
          salary,
          d_no,
          mgr_no,
          date_of_join,
          designation,
          address,
          city,
          pincode,
          e_no,
        ]
      );
    } catch (error) {
      throw new Error("Error updating employee details: " + error.message);
    }
  } else {
    throw new Error("Employee not found with ID: " + id);
  }
};

export const deleteEmployee = async (e_no) =>
  await query("DELETE FROM employee WHERE e_no = ?", [e_no]);
