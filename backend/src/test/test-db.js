import { getAllItems, getAllUsers, addItem } from "../database.js";
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const promisePool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function main1() {
  try {
    const rows = await getAllItems();
    console.log(rows);
  } catch (err) {
    console.log("some error occurred");
  }
}

main1();
