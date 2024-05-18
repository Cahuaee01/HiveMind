import { DataTypes } from "sequelize";

export function createModel(database){
  database.define('Vote', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    downvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
    //by default, Sequelize adds the createdAt and updatedAt fields to all models
  }, {

  })
}


