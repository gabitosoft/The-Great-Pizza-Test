/* global require module */
/* jshint esversion: 6 */

const Sequelize = require('sequelize');
const db = require('../database');
const Model = Sequelize.Model;
const sequelize = db;

class Pizza extends Model {}
Pizza.init({
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    field: 'id_pizza'
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'name_pizza'
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'price_pizza'
  },
  description: {
    type: Sequelize.STRING,
    field: 'description_pizza'
  }
}, { sequelize, tableName: 'pizza', timestamps: false });

// make this available to our users in our Node applications
module.exports = Pizza;
