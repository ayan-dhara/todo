import {Request, Response} from "express";
import User from "../../models/user";
// @ts-ignore
import bcrypt from "bcrypt";
// @ts-ignore
import jwt from "jsonwebtoken";

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET || "JWT_TOKEN_SECRET";

// POST /api/user/login
const login = async (req: Request, res: Response) => {
  let {email, password} = req.body;
  if (!email || !password)
    return res.send({
      success: false,
      message: "invalid credentials"
    })
  const userData: any = await User.findOne({where: {email}});
  if (!userData) {
    return res.send({
      message: "Email is not registered",
      success: false,
    });
  }
  let isMatch = await bcrypt.compare(password, userData.password);
  if (isMatch) {
    let token = jwt.sign(
      {
        userId: userData.userId,
        name: userData.name,
        email: userData.email,
      },
      JWT_TOKEN_SECRET,
      {expiresIn: 7 * 24 * 60 * 60}
    );

    return res.cookie("jwt-token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: true,
    })
      .send({
        userId: userData.userId,
        name: userData.name,
        email: userData.email,
        message: "You are now logged in.",
        success: true
      });
  } else {
    return res.send({
      message: "Incorrect password.",
      success: false,
    });
  }
};
export default login;
