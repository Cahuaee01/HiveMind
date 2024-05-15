import express from "express";
import { IdeaController } from "../controllers/IdeaController.js";
import { ensureUsersModifyOnlyOwnTodos } from "../middleware/authorization.js";

export const ideaRouter = new express.Router();

ideaRouter.get("/ideas", (req, res, next) => {
  IdeaController.getTodosForCurrentUser(req).then(todoItems => {
    res.json(todoItems)
  }).catch(err => {
    next(err);
  });
});

ideaRouter.post("/ideas", (req, res, next) => {
    IdeaController.saveTodo(req).then( result => {
    res.json(result);
  }).catch(err => {
    next(err);
  });
});

ideaRouter.get("/todos/:id", ensureUsersModifyOnlyOwnTodos, (req, res, next) => {
    IdeaController.findById(req).then( (item) => {
    if(item)
      res.json(item);
    else 
      next({status: 404, message: "Todo not found"});
  }).catch( err => {
    next(err);
  })
});

ideaRouter.delete("/todos/:id", ensureUsersModifyOnlyOwnTodos, (req, res, next) => {
    IdeaController.delete(req).then( (item) => {
    if(item)
      res.json(item);
    else 
      next({status: 404, message: "Todo not found"});
  }).catch( err => {
    next(err);
  })
});


ideaRouter.put("/todos/:id", ensureUsersModifyOnlyOwnTodos, (req, res, next) => {
    IdeaController.update(req.params.id, req.body).then( (item) => {
    if(item)
      res.json(item);
    else 
      next({status: 404, message: "Todo not found"});
  }).catch( err => {
    next(err);
  })
});