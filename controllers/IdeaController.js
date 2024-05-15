import { Idea } from "../models/Database.js";

export class IdeaController {
  
  static async getTodosForCurrentUser(req){
    return Todo.findAll({
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
}