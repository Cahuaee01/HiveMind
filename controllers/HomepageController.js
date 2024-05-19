import { Idea } from "../models/Database.js";
import { sequelize } from '../public/sequelize.js';

export class HomepageController {
    static async displayTenControversial(req) {
        return Idea.findAll({
            attributes: [
                'id',
                'title',  // assuming 'title' is a field in your Idea model
                [sequelize.fn('SUM', sequelize.col('upvotes')), 'total_upvotes'],
                [sequelize.fn('SUM', sequelize.col('downvotes')), 'total_downvotes'],
                [sequelize.literal('SUM(upvotes + downvotes)'), 'total_votes']
            ],
            group: ['Idea.id'],
            order: sequelize.literal('total_votes DESC'),
            limit: 10
        });
    }    
}

