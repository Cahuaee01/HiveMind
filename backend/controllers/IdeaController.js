import { Idea, Vote } from "../models/Database.js";

export class IdeaController {
  
  static async getIdeasForCurrentUser(req){
    return Idea.findAll({
      where: {
        UserUserName: req.username
      }
    }) 
  }
  
  static async saveIdea(req){
    let idea = Idea.build(req.body);
    idea.UserUserName = req.username;
    return idea.save();
  }

  static async findById(req){
    return Idea.findByPk(req.params.id);
  }

  static async update(id, updated){
    let idea = await Idea.findByPk(id);
    idea.set(updated); //update using fields which were passed in request
    return idea.save();
  }

  static async delete(req){
    return new Promise( (resolve, reject) => {
      this.findById(req).then( item => {
        item.destroy().then( () => {resolve(item)})
      })
    })
  }

  static async sendUpvote(id, req){
    let idea = await Idea.findByPk(id);
    let judgeUser = req.username;
    
    let vote = Vote.build();
    vote.UserUserName = judgeUser;
    vote.IdeaId = id;
    vote.value = true;
    await vote.save();

    idea.upvotes++;
    idea.save();

    return { message: 'Upvote added successfully', vote, idea };
  }

  static async sendDownvote(id, req){
    let idea = await Idea.findByPk(id);
    let judgeUser = req.username;
    
    let vote = Vote.build();
    vote.UserUserName = judgeUser;
    vote.IdeaId = id;
    vote.value = false;
    await vote.save();

    idea.downvotes++;
    idea.save();
    
    return { message: 'Downvote added successfully', vote, idea };
  }

}