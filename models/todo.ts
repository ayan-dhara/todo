import database from "../utills/database";
import { DataTypes } from "sequelize";

const Todo = database.define("todo", {
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  todoId: {
    type: DataTypes.STRING, // server generated
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING, // user generated
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING, // user generated
    allowNull: false,
  },
  status: {
    // 0 added, 1 ongoing, 2 done, 3, backlog
    type: DataTypes.INTEGER, // user generated
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN, // user specified
    allowNull: false
  },
  created: {
    type: DataTypes.STRING, // server generated
    allowNull: false
  },
  updated: {
    type: DataTypes.BOOLEAN, // server generated
    allowNull: false
  },
  due: {
    type: DataTypes.STRING, // user generated
    allowNull: false
  }
});

export default Todo;
