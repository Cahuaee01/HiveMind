import express from "express";
import { HomepageController } from "../controllers/HomepageController.js";

export const homepageRouter = new express.Router();

homepageRouter.get("/homepage", (req, res, next) => {
    HomepageController.displayTenControversial(req).then(ideaItems => {
      res.json(ideaItems)
    }).catch(err => {
      next(err);
    });
  });