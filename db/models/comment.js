'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'user_id'})
      this.belongsTo(models.Post, {foreignKey: 'post_id'})
    }
  }
  Comment.init({
    user_id: {
      type: DataTypes.INTEGER,references: {
        model: {
          tableName: 'Users',
        },
        key: 'id',
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Posts',
        },
        key: 'id',
      }
    },
    text: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
