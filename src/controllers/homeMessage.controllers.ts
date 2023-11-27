import { Request, Response } from "express";

//Helpers
import apiPerspective from "../helpers/perspectiveGoogle.js";

//Queries
import { postMessage } from "../database/queries";

export const postHomeMessage = async (req: Request, res: Response) => {
  const {username, message} = req.body;
  const apiPerspectiveResponse = await apiPerspective(message);
  const perspectiveResult = apiPerspectiveResponse.attributeScores.TOXICITY.summaryScore.value;

  if (perspectiveResult > 0.6) {
    return res.status(200).json({message: {
      ES: "Mensaje ofensivo",
      EN: "Offensive Message"
    }})
  }

  try {
    // const queryResult = await postMessage(username, message);
    res.status(200).json({message: {
      ES: "Muchas gracias por tu mensaje!",
      EN: "Thank you for your message!"
    }})
  } catch (error) {
    res.status(500).json({message: "Error servidor"})
  }
}