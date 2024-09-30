import mysql from "mysql2";
import { pool_options } from "../config/database.config.js";

const pool = mysql.createPool(pool_options).promise();

const create_trains_table = async () => {
  try {
    await pool.query(
      "create table trains(id INT AUTO_INCREMENT PRIMARY KEY,name varchar(100),route VARCHAR(100),schedule TIME)"
    );
  } catch (error) {
    console.error("Failed to create table for Trains!");
  }
};

const create_users_table = async () => {
  try {
    await pool.query(
      "create table users(id INT AUTO_INCREMENT PRIMARY KEY,username VARCHAR(50) NOT NULL UNIQUE,password VARCHAR(255) NOT NULL,email VARCHAR(100) NOT NULL UNIQUE)"
    );
  } catch (error) {
    console.error("Failed to create table for users!");
  }
};

const create_bookings_table = async () => {
  try {
    await pool.query(
      "create table bookings(id INT AUTO_INCREMENT PRIMARY KEY,train_id INT, user_id INT,FOREIGN KEY (train_id) REFERENCES trains(id),FOREIGN KEY (user_id) REFERENCES users(id))"
    );
  } catch (error) {
    console.error("Failed to create table for bookings!");
  }
};

const create_stations_table = async () => {
  try {
    await pool.query(
      "create table stations(id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100) NOT NULL,location VARCHAR(255) NOT NULL)"
    );
  } catch (error) {
    console.error("Failed to create table for stations!");
  }
};

const create_train_schedule_table = async () => {
  try {
    await pool.query(
      "create table train_schedule(id INT AUTO_INCREMENT PRIMARY KEY,train_id INT,station_id INT,arrival_time TIME,departure_time TIME, FOREIGN KEY (train_id) REFERENCES trains(id),FOREIGN KEY (station_id) REFERENCES stations(id))"
    );
  } catch (error) {
    console.error("Failed to create table for train schedules!");
  }
};

const init_trains_count_triggers = async () => {
  try {
    await pool.query(
      "create trigger increment_employee_count before insert on employees for each row update department as d set d.no_of_employees = d.no_of_employees + 1 where d.d_no = d_no"
    );
  } catch (error) {
    console.error(
      "Failed to create trigger for auto increment train count!"
    );
  }

  try {
    await pool.query(
      "create trigger decrement_train_count before delete on train for each row update department as dset d.no_of_employees = d.no_of_employees - 1 where d.d_no = d_no"
    );
  } catch (error) {
    console.error(
      "Failed to create trigger for auto decrement train count!"
    );
  }
  await create_trains_table();
  await create_users_table();
  await create_bookings_table();
  await create_stations_table();
  await create_train_schedule_table();
  await init_employee_count_triggers();
};
