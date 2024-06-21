import { DataTypes } from "sequelize";

/**
 * Creates a model for the Comment entity.
 * @param {object} database - The Sequelize database instance.
 */
export function createModel(database) {
  /**
   * Comment model definition.
   */
  database.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT
    },
    owner: {
      type: DataTypes.TEXT
    }
  }, {

  })
}


