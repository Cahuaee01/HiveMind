import { User, Idea, Vote } from "../models/Database.js";
import { Op } from "sequelize";
import Jwt from "jsonwebtoken";

/**
 * Controller for handling authentication related operations.
 */
export class AuthController {
  /**
   * Handles post requests on /auth. Checks that the given credentials are valid.
   * @param {http.IncomingMessage} request - The incoming HTTP request object.
   * @param {http.ServerResponse} response - The HTTP response object.
   * @returns {boolean} - Returns true if the credentials are valid, false otherwise.
   */
  static async checkCredentials(request, response) {
    let user = new User({
      userName: request.body.usr,
      password: request.body.pwd
    });

    let found = await User.findOne({
      where: {
        userName: user.userName,
        password: user.password
      }
    });

    return found !== null;
  }

  /**
   * Attempts to create a new User.
   * @param {http.IncomingMessage} request - The incoming HTTP request object.
   * @param {http.ServerResponse} response - The HTTP response object.
   * @returns {Promise} - Returns a Promise that resolves to the newly created User.
   */
  static async saveUser(request, response) {
    let user = new User({
      userName: request.body.usr,
      password: request.body.pwd
    });
    return user.save();
  }

  /**
   * Issues a new JWT token for the given username.
   * @param {string} username - The username for which to issue the token.
   * @returns {string} - Returns the JWT token.
   */
  static issueToken(username) {
    return Jwt.sign({ user: username }, process.env.TOKEN_SECRET, { expiresIn: `${24 * 60 * 60}s` });
  }

  /**
   * Checks if the given JWT token is valid.
   * @param {string} token - The JWT token to validate.
   * @param {function} callback - The callback function to invoke with the validation result.
   */
  static isTokenValid(token, callback) {
    Jwt.verify(token, process.env.TOKEN_SECRET, callback);
  }

  /**
   * Checks if the user can modify the specified idea.
   * @param {string} user - The username of the user.
   * @param {number} ideaId - The ID of the idea.
   * @returns {boolean} - Returns true if the user can modify the idea, false otherwise.
   */
  static async canUserModifyIdea(user, ideaId) {
    const idea = await Idea.findByPk(ideaId);
    return idea && idea.UserUserName === user;
  }

  /**
   * Checks if the user can vote for the specified idea.
   * @param {string} user - The username of the user.
   * @param {number} ideaId - The ID of the idea.
   * @returns {boolean} - Returns true if the user can vote for the idea, false otherwise.
   * @throws {Error} - Throws an error if the idea is not found.
   */
  static async canUserVoteIdea(user, ideaId) {
    const idea = await Idea.findByPk(ideaId);
    if (!idea) {
      throw new Error("Idea not found");
    }

    const vote = await Vote.findOne({
      where: {
        [Op.and]: [
          { UserUserName: user },
          { IdeaId: ideaId }
        ]
      }
    });

    const userIsOwner = idea.UserUserName === user;

    return vote === null && !userIsOwner;
  }
}