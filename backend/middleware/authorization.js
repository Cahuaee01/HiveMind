import { AuthController } from "../controllers/AuthController.js";

/**
 * Middleware function to enforce authentication for protected routes.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export function enforceAuthentication(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1];
  if(!token){
    next({status: 401, message: "Unauthorized"});
    return;
  }
  AuthController.isTokenValid(token, (err, decodedToken) => {
    if(err){
      next({status: 401, message: "Unauthorized"});
    } else {
      req.username = decodedToken.user;
      next();
    }
  });
}

/**
 * Middleware function to ensure that users can only modify their own ideas.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export async function ensureUsersModifyOnlyOwnIdeas(req, res, next){
  const user = req.username;
  const ideaId = req.params.id;
  const userHasPermission = await AuthController.canUserModifyIdea(user, ideaId);
  if(userHasPermission){
    next();
  } else {
    next({
      status: 403, 
      message: "Forbidden! You do not have permissions to view or modify this resource"
    });
  }
}