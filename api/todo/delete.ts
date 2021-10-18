// DELETE /todos/:id
import {Response} from "express";
import Todo from "../../models/todo";
import list from "./list";

// DELETE /api/todo/:id
const deleteTodo = async (req: any, res: Response) => {
  console.log("delete")
  try {
    const {id} = req.params
    const {userId} = req.user
    const deleteData = await Todo.update({
      deleted: true
    }, {
      where: {
        todoId: id,
        userId
      }
    })
    if (deleteData)
      return list(req, res)
    res.send({
      success: false,
      message: "Cannot delete"
    })
  } catch (e) {
    res.send({
      success: false,
      message: "Something went wrong while deleting"
    })
  }
}
export default deleteTodo
