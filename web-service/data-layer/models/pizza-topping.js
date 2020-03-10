/* global require module */
/* jshint esversion: 6 */

const Sequelize = require('sequelize');
const db = require('../database');
const Model = Sequelize.Model;
const sequelize = db;

class PizzaTopping extends Model {}
PizzaTopping.init({
  id_pizza_topping: {
    type: Sequelize.STRING,
    primaryKey: true,
    field: 'id_pizza_topping'
  },
  id_pizza: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'id_pizza'
  },
  id_topping: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'id_topping'
  },
}, { sequelize, tableName: 'pizza_topping', timestamps: false });

// make this available to our users in our Node applications
module.exports = PizzaTopping;
