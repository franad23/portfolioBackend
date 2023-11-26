import { Request, Response } from "express";

//Queries
import { postMessage } from "../database/queries";

export const postHomeMessage = async (req: Request, res: Response) => {
  const {username, message} = req.body;
  const queryResult = await postMessage(username, message);

  res.status(200).json({meesage: "Se postio bien"})

  console.log(queryResult);
}