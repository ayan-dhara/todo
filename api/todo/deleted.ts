// GET /todos
import {Request, Response} from "express";

// GET /api/todo/deleted
const deleted = async (req:Request, res: Response) => {
  res.send({
    success: false
  })
}
export default deleted
