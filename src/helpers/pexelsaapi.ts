import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

const getPexelsPhotos = async (req: Request, res: Response) => {

  const query:string = req.body.query;
  try {
    const response = await axios.get('https://api.pexels.com/v1/search', {
      headers: {
        Authorization: process.env.PEXELSAPIKEY as string,
      },
      params: {
        query,
        per_page: 10,
        orientation: 'landscape'
      },
    });
    const photos = response.data.photos;
    res.json(photos);
  } catch (error) {
    console.error('Error al obtener fotos de Pexels:', error);
    throw error;
  }
}

export default getPexelsPhotos;