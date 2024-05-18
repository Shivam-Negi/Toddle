'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const { ServerConfig } = require('../config');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A user can have many posts
      User.hasMany(models.Post, { 
        foreignKey: 'userId' 
      });

      // A user can have many likes
      User.hasMany(models.Like, { 
        foreignKey: 'userId' 
      });

      // A user can have many comments
      User.hasMany(models.Comment, { 
        foreignKey: 'userId' 
      });

      // Many-to-many relationship for following
      User.belongsToMany(models.User, {
        as: 'Followers', // Users following this user
        through: models.UserFollowers,
        foreignKey: 'followingId'
      });

      User.belongsToMany(models.User, {
        as: 'Following', // Users this user is following
        through: models.UserFollowers,
        foreignKey: 'followerId'
      });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  // sequelize hooks
  User.beforeCreate(function encrypt(user) {
    //console.log('user details bfor enc :', user);
    const encryptedPassword = bcrypt.hashSync(user.password, +ServerConfig.SALT_ROUNDS);
    user.password = encryptedPassword;
    //console.log('user details aftr enc :', user);
  });

  return User;
};
