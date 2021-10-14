// POST /todos
import {Response} from "express";
import Todo from "../../models/todo";
import crypto from "crypto";
import list from "./list";

// POST /api/todo/add	Create a new todo item
const add = async (req: any, res: Response) => {
  try {
    const {title, due, description, status} = req.body
    if (typeof title === "string" &&
      typeof due === "number" &&
      typeof description ===  "string" &&
      typeof status === 'number' &&
      due !== 0
    ) {
      const newTodo = {
        title, due, description, status,
        userId: req.user.userId,
        created: Date.now(),
        updated: Date.now(),
        deleted: false,
        todoId: crypto.randomBytes(10).toString("hex")
      }
      await Todo.create(newTodo)
      return list(req, res)
    } else {
      return res.send({
        success: false,
        message: "field missing"
      })
    }
  } catch (e) {
    res.send({
      success: false,
      message: "cannot add todo"
    })
  }
}

export default add
