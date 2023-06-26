const {DataTypes} = require('sequeliza');
const sequelize = require('../database');

const User = sequelize.define('User' , {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
    },
});

module.exports = User;