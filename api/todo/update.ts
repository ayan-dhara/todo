// PUT /todos/:id
import {Request, Response} from "express";

// PUT /api/todo/:id
const update = async (req: Request, res: Response) => {
  res.send({
    success: false
  })
}
export default update
