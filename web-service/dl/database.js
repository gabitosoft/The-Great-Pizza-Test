const Sequelize = require('sequelize');
const Op = Sequelize.Op
const config = require('./../config/db');

module.exports = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASSWORD,
  {
    host: config.db.options.HOST,
    dialect: config.db.options.dialect,
    pool: config.db.options.pool,
    operatorsAliases: {
      $and: Op.and,
      $or: Op.or,
      $eq: Op.eq,
      $gt: Op.gt,
      $lt: Op.lt,
      $lte: Op.lte,
      $like: Op.like
    }
  });
