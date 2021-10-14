// DELETE /todos/:id
import {Request, Response} from "express";

// DELETE /api/todo/:id
const deleteTodo = async (req:Request, res: Response) => {
  res.send({
    success: false
  })
}
export default deleteTodo
