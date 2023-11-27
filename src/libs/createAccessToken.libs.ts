import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';

dotenv.config();

const createToken = async (username: string, expires: string) => {
  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET as string,
    { expiresIn: expires }
  )
  return token;
}

export default createToken;