import { AuthController } from "../controllers/AuthController.js";

export async function ensureUsersVoteOnlyOneTime(req, res, next){
    const user = req.username;
    const ideaId = req.params.id;
    const userCanUpvote = await AuthController.canUserVoteIdea(user, ideaId);
   
    if(userCanUpvote){
      next();
    } else {
      next({
        status: 403, 
        message: "Forbidden! You can only upvote once!"
      });
    }   
  }