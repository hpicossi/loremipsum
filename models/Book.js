const {DataTypes} = require('');
const sequelize = require('../database');

const Book = sequelize.define('Book',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    isbn: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    autor: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.STRING,
        allowNull:false,
    },
});

module.exports = Book;