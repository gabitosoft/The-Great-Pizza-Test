/* global require module */
/* jshint esversion: 6 */

const Sequelize = require('sequelize');
const db = require('../database');
const Model = Sequelize.Model;
const sequelize = db;

class PizzaTopping extends Model {}
PizzaTopping.init({
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    field: 'id_pizza_topping'
  },
  amount: {
    type: Sequelize.STRING,
    field: 'id_pizza',
    references: 'pizza',
    referencesKey: 'id_pizza'
  }
}, { sequelize, tableName: 'pizza_topping', timestamps: false });

// make this available to our users in our Node applications
module.exports = PizzaTopping;
