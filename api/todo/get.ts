// GET /todos/:id
import {Request, Response} from "express";

// GET /api/todo/:id
const get = async (req:Request, res: Response) => {
  res.send({
    success: false
  })
}
export default get
