/* jshint esversion: 6 */
const pizzaTopping = require('../data-layer/models/pizza-topping');

module.exports = {

  getPizzaToppings: (id) => {
    return pizzaTopping.findAll({ where: { id_pizza: id } });
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
