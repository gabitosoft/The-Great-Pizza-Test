/* jshint esversion: 6 */
const topping = require('../data-layer/models/topping');

module.exports = {

  getToppings: () => {
    return topping.findAll();
  },

  getTopping: (id) => {
    return topping.findByPk(id);
  },

  createTopping: (newTopping) => {
    return topping.create(newTopping);
  },

  updateTopping: (id, updateTopping) => {
    return topping.update(updateTopping, { where: id });
  },

  deleteTopping: (id) => {
    return topping.destroy({ where: { id: id } });
  },
};
