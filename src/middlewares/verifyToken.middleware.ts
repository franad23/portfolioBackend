import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv";


dotenv.config();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if(!token) return res.status(401).json({message:"Token no proporcionado"});

  try {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if(err) return res.status(401).json({ message: "Token no válido"})
      const decodedPayload = decoded as JwtPayload;
      req.username = decodedPayload.username;
      next();
    })
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token inválido' });
  }
}

export default verifyToken;