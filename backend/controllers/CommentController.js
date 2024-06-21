/**
 * @fileoverview This module contains the CommentController class, which is responsible for handling comments related operations.
 * @module CommentController
 */

import { Comment } from "../models/Database.js";

export class CommentController {

    /**
     * Retrieves all comments for a specific idea.
     * @param {number} ideaId - The ID of the idea.
     * @returns {Promise<Comment[]>} - A promise that resolves to an array of comments.
     */
    static async getComments(ideaId){
        return Comment.findAll({
          where: {
            IdeaId: ideaId
          },
          order: [['createdAt', 'ASC']]
        })
    };
  
    /**
     * Saves a new comment for a specific idea.
     * @param {number} ideaId - The ID of the idea.
     * @param {Object} req - The request object containing the comment data.
     * @returns {Promise<Comment>} - A promise that resolves to the saved comment.
     */
    static async saveComment(ideaId, req){
        let comment = Comment.build(req.body);
        comment.IdeaId = ideaId;
        comment.owner = req.username;
        return comment.save();
    };
}