import pool from "../dbPg";
import dotenv from "dotenv";

dotenv.config();

export const postMessage = async () => {
  const queryResult = await pool.query(`INSERT INTO ${process.env.DB_MESSAGETABLE} (message) VALUES ('Hello World')`);
}


export const getLastTenMessages = async () => {
  const queryResult = await pool.query(`SELECT * FROM ${process.env.DB_MESSAGETABLE} ORDER BY id DESC LIMIT 10`);
  return queryResult;
}