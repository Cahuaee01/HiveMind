import { BOOLEAN, DataTypes } from "sequelize";
import { toDefaultValue } from "sequelize/lib/utils";

export function createModel(database){
  database.define('Vote', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    value: {
      type: BOOLEAN,
      defaultValue: false
    }
    //by default, Sequelize adds the createdAt and updatedAt fields to all models
  }, {

  })
}


