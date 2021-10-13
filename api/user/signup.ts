import { Request, Response } from "express";
import User from "../../models/user";
// @ts-ignore
import jwt from "jsonwebtoken";
// @ts-ignore
import bcrypt from "bcrypt";
// @ts-ignore
import crypto from "crypto";

const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10) || 10;
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET || "JWT_TOKEN_SECRET";

// POST /api/user/signup
const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const userId = crypto.randomBytes(8).toString("hex");

  console.log(userId);

  const userData: any = await User.findOne({ where: { email } });
  if (userData) {
    return res.status(200).json({
      message: "Email already registered!",
      success: false,
    });
  }

  const hashedPassword = bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);

  await (
    await User.create({
      userId: userId,
      name: name,
      email: email,
      password: hashedPassword,
    })
  ).save();

  const token = jwt.sign(
    {
      userId: userId,
      email: email,
      name: name,
    },
    JWT_TOKEN_SECRET,
    { expiresIn: 7 * 24 * 60 * 60 }
  );

  res.cookie("jwt-token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: true
  })
    .send({
    userId: userId,
    email: email,
    name: name,
    success: true,
  });
};

export default signup;
