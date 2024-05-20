import { Comment } from "../models/Database.js";

export class CommentController {

    static async getComments(ideaId){
        return Comment.findAll({
          where: {
            IdeaId: ideaId
          }
        })
      }
  
    static async saveComment(ideaId, req){
        let comment = Comment.build(req.body);
        comment.IdeaId = ideaId;
        comment.owner = req.username;
        return comment.save();
    }

}