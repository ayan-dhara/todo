import {Response} from "express";

// ALL /api/user/verify
const verify = async (req: any, res: Response) => {
  res.send({
    ...req.user,
    success: true,
    message: "You are logged in",
  });
};

export default verify;
