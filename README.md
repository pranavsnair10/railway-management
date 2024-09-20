# Express Starter Template

This Express starter template is designed to be a flexible and scalable foundation for building RESTful APIs with Express.js and MySQL.

It includes CORS support, request logging with Morgan, error handling, and a modular routing structure.

> The setup is fully customizable to handle various entities (such as employees, products, users, etc.) by simply modifying or adding to the provided routes and controllers.

---

## What's in the box?

- **Modular API Routes**: Easily create custom API routes for different entities (e.g., employees, products, users).
- **Customizable CRUD Operations**: Routes and controllers for creating, reading, updating, and deleting entities, which can be easily extended to handle any new entity.
- **MySQL Database Integration**: Simplified database setup, including automatic table creation and triggers.
- **Error Handling Middleware**: Built-in middleware to catch and handle errors gracefully.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sahil-shefeek/express-template
cd express-template
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed, then run the following command:

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory with the following content:

```env
PORT=8000
DB_HOST=localhost
DB_USER=root
DB_PASSWD=password
DB_NAME=defaultdb
DB_PORT=3306
```

You can adjust these values based on your environment and database configuration.

### 4. Initialize the Database

To create the necessary tables and triggers in MySQL, run:

```bash
npm run init
```

This initializes the `employees` and `department` tables, as well as triggers for automatic updates of employee counts in departments.

### 5. Run the Server

To start the server in development mode, use:

```bash
npm run dev
```

The server will automatically load environment variables from your `.env` file.

---

## API Customization Example

This template comes with example routes and controllers for managing **employees**. You can easily customize the API for other entities like products, users, etc.

Here's how the **Employee API** works, and how you can generalize it for your own needs.

### Example: Employee API

#### File: `routes/employees.js`

```js
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
    if (req.query?.e_no) {
      res.json(await getEmployee(req.query.e_no));
    } else {
      res.json(await getAllEmployees());
    }
  })
  .post(async (req, res) => {
    const employeeDetails = {
      e_no: uuid(), // Generates a unique ID for each employee
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
      res
        .status(201)
        .json({
          message: "Employee added successfully!",
          ...addedEmployeeDetails,
        });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to add employee", error: error.message });
    }
  });

employeeRouter
  .route("/:e_no")
  .get(async (req, res) => {
    try {
      const employee = await getEmployee(req.params.e_no);
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .patch(async (req, res) => {
    const updatedDetails = {
      ...(req.body.e_name ? { e_name: req.body.e_name } : {}),
      ...(req.body.salary ? { salary: req.body.salary } : {}),
      ...(req.body.d_no ? { d_no: req.body.d_no } : {}),
      ...(req.body.mgr_no ? { mgr_no: req.body.mgr_no } : {}),
      ...(req.body.date_of_join ? { date_of_join: req.body.date_of_join } : {}),
      ...(req.body.designation ? { designation: req.body.designation } : {}),
      ...(req.body.address ? { address: req.body.address } : {}),
      ...(req.body.city ? { city: req.body.city } : {}),
      ...(req.body.pincode ? { pincode: req.body.pincode } : {}),
    };

    try {
      await updateEmployee(req.params.e_no, updatedDetails);
      const updatedEmployee = await getEmployee(req.params.e_no);
      res.status(200).json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      await deleteEmployee(req.params.e_no);
      res.status(204).json({ message: "Employee deleted successfully!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
```

### Customizing for Other Entities

If you want to manage other entities (e.g., products, users, etc.), you can replicate the structure used for employees:

1. **Create a Controller**: Add a controller file that defines functions for CRUD operations (e.g., `getAllProducts`, `addNewProduct`, etc.).
2. **Create a Router**: Add a new router in `routes/`, following the same pattern used in `employeeRouter`.
3. **Database Setup**: Ensure the necessary tables and triggers are created in your MySQL database.

### Example: Product API (Outline)

- **Controller**: `controllers/productController.js`

  - `getAllProducts()`
  - `getProduct(productID)`
  - `addNewProduct(productDetails)`
  - `updateProduct(productID, productDetails)`
  - `deleteProduct(productID)`

- **Router**: `routes/products.js`
  - Define routes similar to the employee example.

---

## Environment Setup

### `.env` File Example

Here's an example `.env` file to configure the server and MySQL connection:

```env
PORT=8000
DB_HOST=localhost
DB_USER=root
DB_PASSWD=yourpassword
DB_NAME=yourdbname
DB_PORT=3306
```

Make sure to adjust the values as per your local or production setup.

---

## Error Handling

The template includes a centralized error handler middleware that catches and processes errors. It ensures that the server responds with a meaningful message in case of any issues, like invalid requests or database errors.

---
