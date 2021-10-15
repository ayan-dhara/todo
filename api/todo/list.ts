// GET /todos
import {Response} from "express";
import Todo from "../../models/todo";
import {Op} from "sequelize";

// GET /api/todo/list
const list = async (req: any, res: Response) => {
  const todos = await Todo.findAll({
    where: {
      userId: req.user.userId,
      // @ts-ignore
      deleted: {
        [Op.eq]: false
      }
    },
    order: ["due", "created"]
  })
  const todoList = todos.map((todo: any) => {
    return todo.dataValues
  })
  res.send({
    success: true,
    todoList: todoList,
    statusList: ["Added", "On Going", "Done", "Backlog"]
  })
}
export default list
