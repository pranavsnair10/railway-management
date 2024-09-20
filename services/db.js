import mysql from "mysql2";
import { pool_options } from "../config/database.config.js";
const pool = mysql.createPool(pool_options).promise();

export async function query(sql, params) {
  try {
    const results = await pool.query(sql, params);
    if (results.length > 0) {
      return results[0];
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
}
