/* global require module */
/* jshint esversion: 6 */

const Sequelize = require('sequelize');
const db = require('../database');
const Model = Sequelize.Model;
const sequelize = db;

class Topping extends Model {}
Topping.init({
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    field: 'id_topping'
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'name_topping'
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    field: 'price_topping'
  },
  description: {
    type: Sequelize.STRING,
    field: 'description_topping'
  }
}, { sequelize, tableName: 'topping', timestamps: false });

// make this available to our users in our Node applications
module.exports = Topping;
