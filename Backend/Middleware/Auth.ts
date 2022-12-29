import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
export default (req: any, res: Response, next: NextFunction) => {
  const pk: any = process.env.JWT_PRIVATE_KEY;  
  //  const pk: any = 'avksfngasdfn_vk10aa_fndkn_dakvbkasb_jb';

  const token = req.header('token');
  if (!token) return res.status(401).send('Access denied. No Token Provided');

  try {
    const payload = jwt.verify(token, pk);
    req.user = payload;
    next();
  } catch (ex) {
    console.log(ex, 'jhkfbsdhdfb');
    return res.status(400).send('Invalid Token Provided');
  }
};
 