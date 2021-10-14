// PUT /todos/:id
import {Request, Response} from "express";
import Todo from "../../models/todo";
import list from "./list";

// PUT /api/todo/:id
const update = async (req: any, res: Response) => {
  try {
    const data = req.body
    let updateData = {}
    if (typeof data.status === 'number')
      updateData = {
        ...updateData,
        status: data.status
      }
    if (typeof data.title === 'string')
      updateData = {
        ...updateData,
        title: data.title
      }
    if (typeof data.description === "string")
      updateData = {
        ...updateData,
        description: data.description
      }
    if (typeof data.due === 'number')
      updateData = {
        ...updateData,
        due: data.due
      }
    updateData = {
      ...updateData,
      updated: Date.now()
    }
    console.log(updateData)
    const updatedRows = await Todo.update({...updateData}, {
      where: {
        userId: req.user.userId,
        todoId: req.params.id
      }
    })
    console.log(updatedRows)
    return list(req, res)
  } catch (e) {
    console.log(e)
    res.send({
      success: false
    })
  }
}
export default update
