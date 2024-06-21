import { Idea } from "../models/Database.js";
import { sequelize } from '../public/sequelize.js';
import { Op } from 'sequelize';

/**
 * Controller for handling homepage related operations.
 */
export class HomepageController {

    /**
     * Retrieves the ten most controversial ideas.
     * @param {number} pageId - The page number.
     * @param {Object} req - The request object.
     * @returns {Promise<Idea[]>} - A promise that resolves to an array of Idea objects.
     */
    static async displayTenControversial(pageId, req) {
        return Idea.findAll({
            attributes: [
                'id',
                'title',
                'description',  
                'upvotes',
                'downvotes',
                'UserUserName',
                [sequelize.literal('SUM(upvotes - downvotes)'), 'total_votes']
            ],
            group: ['Idea.id'],
            where: {
                createdAt: {
                    [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
                }
            },
            order: [[sequelize.literal('ABS(SUM(upvotes) - SUM(downvotes)) ASC')],
                    [sequelize.literal('total_votes DESC')]
            ], 
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
                [sequelize.literal('SUM(upvotes - downvotes)'), 'total_votes']
            ],
            group: ['Idea.id'],
            where: {
                createdAt: {
                    [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
                }
            },
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
                [sequelize.literal('SUM(upvotes - downvotes)'), 'total_votes']
            ],
            group: ['Idea.id'],
            where: {
                createdAt: {
                    [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
                }
            },
            order: sequelize.literal('total_votes DESC'),
            limit: 10,
            offset: (pageId - 1) * 10
        });
    }  

}

