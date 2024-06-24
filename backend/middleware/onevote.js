import { AuthController } from "../controllers/AuthController.js";

/**
 * Middleware function to ensure that users can only vote once for an idea.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A Promise that resolves when the middleware is complete.
 */
export async function ensureUsersVoteOnlyOneTime(req, res, next){
    const user = req.username;
    const ideaId = req.params.id;
    const userCanUpvote = await AuthController.canUserVoteIdea(user, ideaId);
   
    if(userCanUpvote){
      next();
    } else {
      next({
        status: 403, 
        message: "Forbidden! You can only upvote other ideas once!"
      });
    }   
  }