import { Request, Response } from "express";

//Helpers
import apiPerspective from "../helpers/perspectiveGoogle.js";

//Queries
import { postMessage } from "../database/queries";

export const postHomeMessage = async (req: Request, res: Response) => {
  const {username, message} = req.body;
  // const queryResult = await postMessage(username, message);

  const apiPerspectiveResponse = await apiPerspective(message);

  console.log(apiPerspectiveResponse);

  res.status(200).json({meesage: "Se postio bien"})

  // console.log(queryResult);
}