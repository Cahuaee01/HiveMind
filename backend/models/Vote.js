/**
 * This module defines the Vote model.
 * The Vote model represents a vote with an id and a value.
 * The value is a boolean indicating whether the vote is true or false.
 * The model is created using the Sequelize library.
 *
 * @module Vote
 */

import { DataTypes } from "sequelize";

/**
 * Creates the Vote model in the specified database.
 *
 * @param {object} database - The Sequelize database instance.
 */
export function createModel(database){
  database.define('Vote', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    value: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
  })
}


