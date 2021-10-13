import { NextFunction, Request, Response } from "express";
// @ts-ignore
import jwt from "jsonwebtoken";
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET || "access_token";

const checkSigned = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtToken = req.cookies["jwt-token"]
    jwt.verify(
      jwtToken,
      JWT_TOKEN_SECRET,
      function (err: any, decoded: any) {
        if (err) {
          return res.status(401).send({
            success: false,
            message: "you are not logged in",
          });
        }
        // @ts-ignore
        req.user = {
          userId: decoded.userId || 1,
          email: decoded.email || "email@mail.com",
          name: decoded.name || "User Name",
        };
        return next();
      }
    );
  } catch (err) {
    res.status(401).send({
      success: false,
      message: "token not valid",
    });
  }
};

export default checkSigned;
