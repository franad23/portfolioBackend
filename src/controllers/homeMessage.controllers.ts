import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import axios, {AxiosError} from "axios";

//Helpers
import apiPerspective from "../helpers/perspectiveGoogle.js";

//Queries
import { 
  postMessageQuery, 
  getLastTenMessagesQuery, 
  linkShortenerQuery, 
  findLinkIfExistsQuery, 
  getAllCountLinksQuery } from "../database/queries";

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
  let link = req.body.link;
  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  
  if (!regex.test(link)) {
    link = `http://${link}`;
  }
  try {
    const {status} = await axios.head(link);
    if (status >= 200 && status <= 300) {
      const newLink = `http://localhost:5173/${uuidv4().slice(0,8)}` ;

        const {rows} = await findLinkIfExistsQuery(link);
        if(rows.length !== 0) return res.status(200).json({
          linkShortened: rows[0].shorted_link
        })
    
        await linkShortenerQuery(link, newLink);
        res.status(200).json({
          linkShortened: newLink,
        }) 
      }   
        else {
      res.status(404).json({ message: {
        ES: "La página no existe o no está disponible",
        EN: "The page does not exist or is not available"
      } });
    }
    
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.code === 'ENOTFOUND') {
        // La dirección IP del dominio no se pudo resolver
        res.status(404).json({ message: {
          ES: "La página no existe o no está disponible",
          EN: "The page does not exist or is not available"
        } });
      } else {
        // Otro tipo de error en la solicitud HEAD
        res.status(500).json({ message: 'Error al verificar la página' });
      }
    } else {
      // Manejo de otros tipos de error
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}

export const getAllCountLinks = async (req: Request, res: Response) => {
  try {
    const {rows} = await getAllCountLinksQuery();
    console.log(rows);
    res.status(200).json(rows)
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error servidor"})
  }
}