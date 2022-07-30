'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'user_id'})
      this.belongsTo(models.Comment, {foreignKey: 'comment_id'})
    }
  }
  Rating.init({
    comment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Comments',
        },
        key: 'id',
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'id',
      }
    },
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};
