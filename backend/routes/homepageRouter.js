import express from "express";
import { HomepageController } from "../controllers/HomepageController.js";

/**
 * Router for handling homepage routes.
 * @module homepageRouter
 */

/**
 * Express router instance for homepage routes.
 * @type {express.Router}
 */
export const homepageRouter = new express.Router();

/**
 * Route for displaying ten controversial ideas.
 * @name GET /homepage/controversial/:id
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
homepageRouter.get("/homepage/controversial/:id", (req, res, next) => {
    HomepageController.displayTenControversial(req.params.id, req)
        .then(ideaItems => {
            res.json(ideaItems);
        })
        .catch(err => {
            next(err);
        });
});

/**
 * Route for displaying ten unpopular ideas.
 * @name GET /homepage/unpopular/:id
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
homepageRouter.get("/homepage/unpopular/:id", (req, res, next) => {
    HomepageController.displayTenUnpopular(req.params.id, req)
        .then(ideaItems => {
            res.json(ideaItems);
        })
        .catch(err => {
            next(err);
        });
});

/**
 * Route for displaying ten mainstream ideas.
 * @name GET /homepage/mainstream/:id
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
homepageRouter.get("/homepage/mainstream/:id", (req, res, next) => {
    HomepageController.displayTenMainstream(req.params.id, req)
        .then(ideaItems => {
            res.json(ideaItems);
        })
        .catch(err => {
            next(err);
        });
});
