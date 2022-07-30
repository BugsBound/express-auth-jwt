'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Search extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Post, {foreignKey: 'post_id'})
      this.belongsTo(models.Tag, {foreignKey: 'tag_id'})
    }
  }
  Search.init({
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Tags',
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
    }
  }, {
    sequelize,
    modelName: 'Search',
  });
  return Search;
};
