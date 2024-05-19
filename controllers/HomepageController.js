import { Idea } from "../models/Database.js";
import { sequelize } from '../public/sequelize.js';

export class HomepageController {

    //if upvotes and downvotes have 10 votes of range between them then the idea is considered controversial
    static async displayTenControversial(req) {
        return Idea.findAll({
            attributes: [
                'id',
                'title',  
                [sequelize.fn('SUM', sequelize.col('upvotes')), 'total_upvotes'],
                [sequelize.fn('SUM', sequelize.col('downvotes')), 'total_downvotes'],
                [sequelize.literal('SUM(upvotes + downvotes)'), 'total_votes']
            ],
            group: ['Idea.id'],
            having: sequelize.literal('ABS(SUM(upvotes) - SUM(downvotes)) < 10'),
            order: sequelize.literal('total_votes DESC'),
            limit: 10
        });
    }    

    //if downvotes are bigger than 10% of upvotes the idea is declared unpopular
    static async displayTenUnpopular(req) {
        return Idea.findAll({
            attributes: [
                'id',
                'title',  
                [sequelize.fn('SUM', sequelize.col('upvotes')), 'total_upvotes'],
                [sequelize.fn('SUM', sequelize.col('downvotes')), 'total_downvotes'],
                [sequelize.literal('SUM(upvotes + downvotes)'), 'total_votes']
            ],
            group: ['Idea.id'],
            having: sequelize.literal('SUM(downvotes) > 1.1 * SUM(upvotes)'),
            order: sequelize.literal('total_votes DESC'),
            limit: 10
        });
    }    

    //if upvotes are bigger than 10% of downvotes the idea is declared mainstream
    static async displayTenMainstream(req) {
        return Idea.findAll({
            attributes: [
                'id',
                'title',  
                [sequelize.fn('SUM', sequelize.col('upvotes')), 'total_upvotes'],
                [sequelize.fn('SUM', sequelize.col('downvotes')), 'total_downvotes'],
                [sequelize.literal('SUM(upvotes + downvotes)'), 'total_votes']
            ],
            group: ['Idea.id'],
            having: sequelize.literal('SUM(upvotes) > 1.1 * SUM(downvotes)'),
            order: sequelize.literal('total_votes DESC'),
            limit: 10
        });
    }  

}

