import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWTSECRET } from "..";

export function authMiddleware(req: Request, res: Response, next: NextFunction) : void {
  const token = req.headers.authorization;

  if(!token) {
     res.status(401).json({ message: "User not logged in" });
     return
  }

  try{
    const decoded =jwt.verify(token, JWTSECRET);
    req.body.user = decoded
    next();
  }
  catch(error) {
    console.log(error)
    res.status(401).json({ message: "Invalid token" });
    return
  }
}