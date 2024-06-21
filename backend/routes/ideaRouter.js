import express from "express";
import { IdeaController } from "../controllers/IdeaController.js";
import { ensureUsersModifyOnlyOwnIdeas } from "../middleware/authorization.js";
import { ensureUsersVoteOnlyOneTime } from "../middleware/onevote.js";

/**
 * Router module for handling idea-related routes.
 * @module ideaRouter
 */

export const ideaRouter = new express.Router();

/**
 * Route for getting ideas for the current user.
 * @name GET /ideas
 * @function
 * @memberof module:ideaRouter
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
ideaRouter.get("/ideas", (req, res, next) => {
  IdeaController.getIdeasForCurrentUser(req).then(ideaItems => {
    res.json(ideaItems)
  }).catch(err => {
    next(err);
  });
});

/**
 * Route for saving a new idea.
 * @name POST /ideas
 * @function
 * @memberof module:ideaRouter
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
ideaRouter.post("/ideas", (req, res, next) => {
    IdeaController.saveIdea(req).then( result => {
    res.json(result);
  }).catch(err => {
    next(err);
  });
});

/**
 * Route for getting an idea by ID.
 * @name GET /ideas/:id
 * @function
 * @memberof module:ideaRouter
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
ideaRouter.get("/ideas/:id", (req, res, next) => {
    IdeaController.findById(req).then( (item) => {
    if(item)
      res.json(item);
    else 
      next({status: 404, message: "Idea not found"});
  }).catch( err => {
    next(err);
  })
});

/**
 * Route for deleting an idea by ID.
 * @name DELETE /ideas/:id
 * @function
 * @memberof module:ideaRouter
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
ideaRouter.delete("/ideas/:id", ensureUsersModifyOnlyOwnIdeas, (req, res, next) => {
    IdeaController.delete(req).then( (item) => {
    if(item)
      res.json(item);
    else 
      next({status: 404, message: "Idea not found"});
  }).catch( err => {
    next(err);
  })
});

/**
 * Route for sending an upvote for an idea by ID.
 * @name POST /ideas/:id/upvote
 * @function
 * @memberof module:ideaRouter
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
ideaRouter.post("/ideas/:id/upvote", ensureUsersVoteOnlyOneTime, (req, res, next) => {
  IdeaController.sendUpvote(req.params.id, req).then( result => {
    res.json(result);
  }).catch( err => {
    next({status: 404, message: "Idea not found"});
  })
});

/**
 * Route for sending a downvote for an idea by ID.
 * @name POST /ideas/:id/downvote
 * @function
 * @memberof module:ideaRouter
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
ideaRouter.post("/ideas/:id/downvote", ensureUsersVoteOnlyOneTime, (req, res, next) => {
  IdeaController.sendDownvote(req.params.id, req).then( result => {
    res.json(result);
  }).catch( err => {
    next({status: 404, message: "Idea not found"});
  })
});