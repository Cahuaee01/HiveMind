import express from "express";
import { CommentController } from "../controllers/CommentController.js";

/**
 * Router for handling comment-related routes.
 * @module commentRouter
 */

/**
 * Express router instance for comment routes.
 * @type {object}
 * @const
 */
export const commentRouter = new express.Router();

/**
 * GET route for retrieving comments of a specific idea.
 * @name GET/ideas/:id/comments
 * @function
 * @memberof module:commentRouter
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
commentRouter.get("/ideas/:id/comments", (req, res, next) => {
  CommentController.getComments(req.params.id).then(commentItems => {
    res.json(commentItems)
  }).catch(err => {
    next(err);
  });
});

/**
 * POST route for saving a new comment for a specific idea.
 * @name POST/ideas/:id/comments
 * @function
 * @memberof module:commentRouter
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
commentRouter.post("/ideas/:id/comments", (req, res, next) => {
    CommentController.saveComment(req.params.id,req).then( result => {
    res.json(result);
  }).catch(err => {
    next(err);
  });
});

