import express from "express";
import { CommentController } from "../controllers/CommentController.js";

export const commentRouter = new express.Router();

commentRouter.get("/ideas/:id/comments", (req, res, next) => {
  CommentController.getComments(req.params.id).then(commentItems => {
    res.json(commentItems)
  }).catch(err => {
    next(err);
  });
});

commentRouter.post("/ideas/:id/comments", (req, res, next) => {
    CommentController.saveComment(req.params.id,req).then( result => {
    res.json(result);
  }).catch(err => {
    next(err);
  });
});

