import express from "express";
import { AuthController } from "../controllers/AuthController.js";

/**
 * Router module for handling authentication routes.
 * @module authenticationRouter
 */

export const authenticationRouter = express.Router();

authenticationRouter.post("/login", async (req, res) => {
  let isAuthenticated = await AuthController.checkCredentials(req, res);
  if(isAuthenticated){
    res.json(AuthController.issueToken(req.body.usr));
  } else {
    res.status(401);
    res.json( {error: "Invalid credentials. Try again."});
  }
});

authenticationRouter.post("/signup", (req, res, next) => {
  AuthController.saveUser(req, res).then((user) => {
    res.json(user);
  }).catch((err) => {
    next({status: 500, message: "Could not save user"});
  })
});