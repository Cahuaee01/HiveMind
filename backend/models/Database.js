import { Sequelize } from "sequelize";
import { createModel as createUserModel } from "./User.js";
import { createModel as createIdeaModel } from "./Idea.js";
import { createModel as createVoteModel } from "./Vote.js";
import { createModel as createCommentModel } from "./Comment.js";

import 'dotenv/config.js'; //read .env file and make it available in process.env

export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
  dialect: process.env.DIALECT
});

createUserModel(database);
createIdeaModel(database);
createVoteModel(database);
createCommentModel(database);

export const {User, Idea, Vote, Comment} = database.models;

//associations configuration
User.Idea = User.hasMany(Idea);
Idea.User = Idea.belongsTo(User);

Idea.Vote = Idea.hasMany(Vote);
Vote.Idea = Vote.belongsTo(Idea);

User.Vote = User.hasMany(Vote);
Vote.User = Vote.belongsTo(User);

Idea.Comment = Idea.hasMany(Comment);
Comment.Idea = Comment.belongsTo(Idea);

//synchronize schema (creates missing tables)
database.sync().then( () => {
  console.log("Database synced correctly");
}).catch( err => {
  console.err("Error with database synchronization: " + err.message);
});