import { Request, Response } from "express";

//Helpers
import apiPerspective from "../helpers/perspectiveGoogle.js";

//Queries
import { postMessageQuery, getLastTenMessagesQuery } from "../database/queries";

//Libs
import createToken from "../libs/createAccessToken.libs";

export const postHomeMessage = async (req: Request, res: Response) => {
  const {username, message} = req.body;
  
  
  try {
    const apiPerspectiveResponse = await apiPerspective(message);
    const perspectiveResult = apiPerspectiveResponse.attributeScores.TOXICITY.summaryScore.value;

    if (perspectiveResult > 0.6) {
      return res.status(403).json({message: {
        ES: "Mensaje ofensivo",
        EN: "Offensive Message"
      }})
    }
    // const queryResult = await postMessageQuery(username, message);
    res.status(200).json({message: {
      ES: "Muchas gracias por tu mensaje!",
      EN: "Thank you for your message!"
    }})
  } catch (error) {
    res.status(500).json({message: "Error servidor"})
  }
}

export const createAccessToken = async (req: Request, res: Response) => {
  const {username} = req.body;
  const token = await createToken(username, "1d");

  try {
    res.status(200).json({
      token: token
    })
  } catch (error) {
    res.status(500).json({message: "Error servidor"})
  }
}

export const getFirstTenMessages = async (req: Request, res: Response) => {
  try {
    const {rows} = await getLastTenMessagesQuery();
    res.status(200).json(rows)
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error servidor"})
  }
}