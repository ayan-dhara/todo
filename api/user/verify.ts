import {Response} from "express";
import jwt from "jsonwebtoken";

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET || "JWT_TOKEN_SECRET"

// ALL /api/user/verify
const verify = async (req: any, res: Response) => {
  try {
    const jwtToken = req.cookies["jwt-token"]
    jwt.verify(
      jwtToken,
      JWT_TOKEN_SECRET,
      function (err: any, decoded: any) {
        if (err) {
          return res.send({
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
        return res.send({
          ...req.user,
          success: true,
          message: "You are logged in",
        });
      }
    );
  } catch (err) {
    res.send({
      success: false,
      message: "You are not logged in",
    });
  }
};

export default verify;
