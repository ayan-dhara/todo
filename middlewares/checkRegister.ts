import {NextFunction, Request, Response} from "express";

const checkRegister = (req: Request, res: Response, next: NextFunction) => {
  const {name, email, password, confirm: confirmPassword} = req.body;
  if (!name)
    return res.status(406).send({
      success: false,
      message: "Please provide your Name!"
    });
  if (!email)
    return res.status(406).send({
      success: false,
      message: "Please provide a Email!"
    });
  if (email && !/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+$/.test(email))
    return res.status(406).send({
      success: false,
      message: "Invalid Email!"
    });
  if (!password)
    return res.status(406).send({
      success: false,
      message: "Please Enter a Password!"
    });
  if (password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password))
    return res.status(406).send({
      success: false,
      message: "Invalid Password!"
    });
  if (confirmPassword !== password)
    return res.status(406).send({
      success: false,
      message: "Password doesn't match!"
    });
  next();
};

export default checkRegister;
