/* jshint esversion: 6 */
const pizzaTopping = require('../data-layer/models/pizza-topping');

module.exports = {

  getPizzaToppings: () => {
    return pizzaTopping.findAll();
  },

  getPizzaTopping: (id) => {
    return pizzaTopping.findByPk(id);
  },

  createPizzaTopping: (newPizzaTopping) => {
    return pizzaTopping.create(newPizzaTopping);
  },

  updatePizzaTopping: (id, updatePizzaTopping) => {
    return pizzaTopping.update(updatePizzaTopping, { where: id });
  },

  deletePizzaTopping: (id) => {
    return pizzaTopping.destroy({ where: { id: id } });
  },
};
