import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

//Helpers
import apiPerspective from "../helpers/perspectiveGoogle.js";

//Queries
import { postMessageQuery, getLastTenMessagesQuery, linkShortenerQuery, findLinkIfExists } from "../database/queries";

//Libs
import createToken from "../libs/createAccessToken.libs";

export const postHomeMessage = async (req: Request, res: Response) => {
  const username = req.username;
  console.log(username);
  const {message} = req.body;
  try {
    const apiPerspectiveResponse = await apiPerspective(message);
    const perspectiveResult = apiPerspectiveResponse.attributeScores.TOXICITY.summaryScore.value;

    if (perspectiveResult > 0.6) {
      return res.status(403).json({message: {
        ES: "Mensaje ofensivo",
        EN: "Offensive Message"
      }})
    }
    await postMessageQuery(username, message);
    res.status(200).json({message: {
      ES: "Muchas gracias por tu mensaje!",
      EN: "Thank you for your message!"
    }})
  } catch (error) {
    console.log(error);
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

export const linkShortener = async (req: Request, res: Response) => {
  const link = req.body.link;
  const newLink = `http://localhost:5173/${uuidv4().slice(0,8)}` ;
  try {
    const {rows} = await findLinkIfExists(link);
    if(rows.length !== 0) return res.status(200).json({
      linkShortened: rows[0].shorted_link
    })

    await linkShortenerQuery(link, newLink);
    res.status(200).json({
      linkShortened: newLink,
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error servidor"})
  }
}