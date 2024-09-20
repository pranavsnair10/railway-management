import mysql from "mysql2";
import { pool_options } from "../config/database.config.js";

const pool = mysql.createPool(pool_options).promise();

const create_dept_table = async () => {
  try {
    await pool.query(
      "create table department(d_no varchar(36) primary key,d_name varchar(32) not null,no_of_employees int,dept_hod varchar(32))"
    );
  } catch (error) {
    console.error("Failed to create table for department!");
  }
};

const create_employee_table = async () => {
  try {
    await pool.query(
      "create table employees(e_no varchar(36) primary key,e_name varchar(52) not null,salary decimal(10, 3) check ( salary > 0 ),d_no varchar(36) references department (d_no),mgr_no varchar(36),date_of_join date,designation varchar(36),address varchar(50),city varchar(8) check ( city in ('Cochin', 'Mumbai', 'Chennai', 'Delhi') ),pincode varchar(7))"
    );
  } catch (error) {
    console.error("Failed to create table for employees!");
  }
};

const init_employee_count_triggers = async () => {
  try {
    await pool.query(
      "create trigger increment_employee_count before insert on employees for each row update department as d set d.no_of_employees = d.no_of_employees + 1 where d.d_no = d_no"
    );
  } catch (error) {
    console.error(
      "Failed to create trigger for auto increment employee count!"
    );
  }

  try {
    await pool.query(
      "create trigger decrement_employee_count before delete on employees for each row update department as dset d.no_of_employees = d.no_of_employees - 1 where d.d_no = d_no"
    );
  } catch (error) {
    console.error(
      "Failed to create trigger for auto decrement employee count!"
    );
  }
  await create_dept_table();
  await create_employee_table();
  await init_employee_count_triggers();
};
