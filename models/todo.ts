import database from "../utills/database";
import { DataTypes } from "sequelize";

const Todo = database.define("user", {
  id: {
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
  createdAt: {
    type: DataTypes.BIGINT, // server generated
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.BIGINT, // server generated
    allowNull: false
  },
  dueAt: {
    type: DataTypes.BIGINT, // user generated
    allowNull: false
  }
});

export default Todo;
