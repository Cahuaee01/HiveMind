import { Idea } from "../models/Database.js";
import { sequelize } from '../public/sequelize.js';

export class HomepageController {

    //if upvotes and downvotes have 10 votes of range between them then the idea is considered controversial
    static async displayTenControversial(pageId,req) {
        return Idea.findAll({
            attributes: [
                'id',
                'title',
                'description',  
                'upvotes',
                'downvotes',
                'UserUserName',
                [sequelize.fn('SUM', sequelize.col('upvotes')), 'total_upvotes'],
                [sequelize.fn('SUM', sequelize.col('downvotes')), 'total_downvotes'],
                [sequelize.literal('SUM(upvotes + downvotes)'), 'total_votes']
            ],
            group: ['Idea.id'],
            having: sequelize.literal('ABS(SUM(upvotes) - SUM(downvotes)) < 10'),
            order: sequelize.literal('total_votes DESC'),
            limit: 10,
            offset: (pageId - 1) * 10
        });
    }    

    //if the balance upvotes/downvotes is low the idea is declared unpopular
    static async displayTenUnpopular(pageId,req) {
        return Idea.findAll({
            attributes: [
                'id',
                'title',  
                'description',
                'upvotes',
                'downvotes',
                'UserUserName',
                [sequelize.fn('SUM', sequelize.col('upvotes')), 'total_upvotes'],
                [sequelize.fn('SUM', sequelize.col('downvotes')), 'total_downvotes'],
                [sequelize.literal('SUM(upvotes - downvotes)'), 'total_votes']
            ],
            group: ['Idea.id'],
            order: sequelize.literal('total_votes ASC'),
            limit: 10,
            offset: (pageId - 1) * 10
        });
    }    

    //if the balance upvotes/downvotes is high the idea is declared mainstream
    static async displayTenMainstream(pageId,req) {
        return Idea.findAll({
            attributes: [
                'id',
                'title',  
                'description',
                'upvotes',
                'downvotes',
                'UserUserName',
                [sequelize.fn('SUM', sequelize.col('upvotes')), 'total_upvotes'],
                [sequelize.fn('SUM', sequelize.col('downvotes')), 'total_downvotes'],
                [sequelize.literal('SUM(upvotes - downvotes)'), 'total_votes']
            ],
            group: ['Idea.id'],
            order: sequelize.literal('total_votes DESC'),
            limit: 10,
            offset: (pageId - 1) * 10
        });
    }  

}

