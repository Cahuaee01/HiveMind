import express from "express";
import { HomepageController } from "../controllers/HomepageController.js";

export const homepageRouter = new express.Router();

homepageRouter.get("/homepage/controversial/:id", (req, res, next) => {
    HomepageController.displayTenControversial(req.params.id,req).then(ideaItems => {
      res.json(ideaItems)
    }).catch(err => {
      next(err);
    });
  });

homepageRouter.get("/homepage/unpopular/:id", (req, res, next) => {
    HomepageController.displayTenUnpopular(req.params.id,req).then(ideaItems => {
        res.json(ideaItems)
    }).catch(err => {
        next(err);
    });
}); 

homepageRouter.get("/homepage/mainstream/:id", (req, res, next) => {
    HomepageController.displayTenMainstream(req.params.id,req).then(ideaItems => {
        res.json(ideaItems)
    }).catch(err => {
        next(err);
    });
}); 