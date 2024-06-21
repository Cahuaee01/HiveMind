/**
 * Creates a Sequelize model for the Idea entity.
 * @param {object} database - The Sequelize database instance.
 */
import { DataTypes } from "sequelize";

export function createModel(database){
  database.define('Idea', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.TEXT
    },
    description: {
        type: DataTypes.TEXT
    },
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    downvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    
  })
}

