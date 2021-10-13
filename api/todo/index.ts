// @ts-ignore
import express from "express";

import deletedTodos from "./deleted";
import restoreTodo from "./restore";
import getTodo from "./get";
import deleteTodo from "./delete";
import updateTodo from "./update";
import listTodos from "./list";
import addTodo from "./add";

// USE /api/todo
const router = express.Router();

router.get("/list", listTodos)
router.post("/add", addTodo)
router.put("/:id", updateTodo)
router.delete("/:id", deleteTodo)
router.get("/:id", getTodo)

// extra
router.post("/:id", restoreTodo)
router.put("/deleted", deletedTodos)

export default router;
