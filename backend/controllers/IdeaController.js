import { Idea, Vote } from "../models/Database.js";

/**
 * Controller class for managing ideas.
 */
export class IdeaController {
  
  /**
   * Retrieves all ideas for the current user.
   * @param {Object} req - The request object containing the username.
   * @returns {Promise<Array<Idea>>} - A promise that resolves to an array of ideas.
   */
  static async getIdeasForCurrentUser(req){
    return Idea.findAll({
      where: {
        UserUserName: req.username
      }
    }) 
  }
  
  /**
   * Saves a new idea.
   * @param {Object} req - The request object containing the idea details.
   * @returns {Promise<Idea>} - A promise that resolves to the saved idea.
   */
  static async saveIdea(req){
    let idea = Idea.build(req.body);
    idea.UserUserName = req.username;
    return idea.save();
  }

  /**
   * Finds an idea by its ID.
   * @param {Object} req - The request object containing the idea ID.
   * @returns {Promise<Idea>} - A promise that resolves to the found idea.
   */
  static async findById(req){
    return Idea.findByPk(req.params.id);
  }

  /**
   * Updates an idea with new data.
   * @param {number} id - The ID of the idea to update.
   * @param {Object} updated - The updated data for the idea.
   * @returns {Promise<Idea>} - A promise that resolves to the updated idea.
   */
  static async update(id, updated){
    let idea = await Idea.findByPk(id);
    idea.set(updated); //update using fields which were passed in request
    return idea.save();
  }

  /**
   * Deletes an idea.
   * @param {Object} req - The request object containing the idea ID.
   * @returns {Promise<Idea>} - A promise that resolves to the deleted idea.
   */
  static async delete(req){
    return new Promise( (resolve, reject) => {
      this.findById(req).then( item => {
        item.destroy().then( () => {resolve(item)})
      })
    })
  }

  /**
   * Adds an upvote to an idea.
   * @param {number} id - The ID of the idea to upvote.
   * @param {Object} req - The request object containing the username.
   * @returns {Promise<Object>} - A promise that resolves to an object containing the success message, the vote, and the idea.
   */
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

  /**
   *      * Adds a downvote to an idea.
   * @param {number} id - The ID of the idea to downvote.
   * @param {Object} req - The request object containing the username.
   * @returns {Promise<Object>} - A promise that resolves to an object containing the success message, the vote, and the idea.
   */
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