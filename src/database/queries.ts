import pool from "../dbPg";
import dotenv from "dotenv";

dotenv.config();

export const postMessageQuery = async (username: string, message: string) => {
  const queryResult = await pool.query(`INSERT INTO ${process.env.DB_MESSAGETABLE} (username, message) VALUES ($1, $2)`, [
    username, 
    message
  ]);
}


export const getLastTenMessagesQuery = async () => {
  const queryResult = await pool.query(`SELECT * FROM ${process.env.DB_MESSAGETABLE} ORDER BY id DESC LIMIT 10`);
  return queryResult;
}
