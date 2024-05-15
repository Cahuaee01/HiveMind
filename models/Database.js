import { Sequelize } from "sequelize";
import { createModel as createUserModel } from "./User.js";
import { createModel as createTodoModel } from "./Idea.js";

import 'dotenv/config.js'; //read .env file and make it available in process.env

export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
  dialect: process.env.DIALECT
});

createUserModel(database);
createTodoModel(database);

export const {User, Idea} = database.models;

//associations configuration
User.Idea = User.hasMany(Idea);
Idea.User = Idea.belongsTo(User);

//synchronize schema (creates missing tables)
database.sync().then( () => {
  console.log("Database synced correctly");
}).catch( err => {
  console.err("Error with database synchronization: " + err.message);
});