'use strict';
const {
  Model
} = require('sequelize');

const { Enums } = require('../utils/common');
const { ENABLE, DISABLE } = Enums.COMMENTS;

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, { 
        foreignKey: 'userId' 
      });
      Post.hasMany(models.Like, { 
        foreignKey: 'postId' 
      });
      Post.hasMany(models.Comment, { 
        foreignKey: 'postId' 
      });
    }
  }
  Post.init({
    content: {
      type : DataTypes.STRING,
      allowNull : false,  
    },
    media: {
      type : DataTypes.STRING,
    },
    userId: {
      type : DataTypes.INTEGER,
      allowNull: false
   },
   comments : {
      type: DataTypes.ENUM,
      values : [ ENABLE, DISABLE ],
      defaultValue: ENABLE,
      allowNull: false,
    },
    isScheduled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    scheduledAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};