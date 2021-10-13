import { Sequelize } from "sequelize";

const DATABASE_URL = process.env.DATABASE_URL || "";
const database = new Sequelize(DATABASE_URL, {
  logging: false,
  dialectOptions: {
    ssl: true,
  },
});

export default database;
