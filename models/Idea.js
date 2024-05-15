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
    }
    //by default, Sequelize adds the createdAt and updatedAt fields to all models
  }, {

  })
}

