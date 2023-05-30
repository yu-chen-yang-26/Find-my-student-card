import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getAllItems() {
  const [rows] = await pool.query(`
  SELECT I.item_id, I.category, I.discover_location, LD.coordinate AS discover_location_coordinate, I.discover_location_userDefCoord, I.retrieve_location, LT.coordinate AS retrieve_location_coordinate, I.image_path, I.description, I.create_time
  FROM item I 
  JOIN location LD
  ON I.discover_location=LD.location_id
  LEFT JOIN location LT
  ON I.retrieve_location=LT.location_id
  WHERE I.is_retrieved=false
  `);
  return rows;
}

export async function searchItems({
  category,
  discover_location,
  retrieve_location,
  description,
  start_time,
  end_time,
}) {}

export async function addItem(
  category,
  discoverer,
  location_discovered,
  location_retrieve,
  owner_candidate,
  description
) {
  const [result] = await pool.query(
    `
    INSERT INTO item (category, discoverer, location_discovered, location_retrieve, 
        owner_candidate, description)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      category,
      discoverer,
      location_discovered,
      location_retrieve,
      owner_candidate,
      description,
    ]
  );
  return result;
}

// for error detection and debug
export async function getAllUsers_broken() {
  const [rows, fields] = await pool.query("select * from users");
  return rows;
  // if (result) {
  //   const [rows, fields] = result;
  //   return rows;
  // } else {
  //   throw new Error("result is undefined");
  // }
}
