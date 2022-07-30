'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Post, {foreignKey: 'user_id'})
      this.hasMany(models.Comment, {foreignKey: 'user_id'})
      this.hasMany(models.Like, {foreignKey: 'user_id'})
      this.hasMany(models.Rating, {foreignKey: 'user_id'})
      this.hasMany(models.Token, {foreignKey: 'user_id'})
    }
  }
  User.init({
    login: {
      unique: true,
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
