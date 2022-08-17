const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Blog extends Model {
    checkPassword(loginPwd) {
        return bcrypt.compareSync(loginPwd, this.password);
    }
}

Blog.init(
    {
       blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
       }, 
       blog_name: {
        type: DataTypes.STRING,
        allowNull: false
       },
       content: {
            type: DataTypes.TEXT,
       },
       user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
       }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'blog'
    }
);

module.exports = Blog;