import { DataTypes } from "sequelize";

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
    //by default, Sequelize adds the createdAt and updatedAt fields to all models
  }, {

  })
}


