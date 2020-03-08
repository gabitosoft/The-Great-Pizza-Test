/* jshint esversion: 6 */
const pizza = require('../data-layer/models/pizza');

module.exports = {

  getPizzas: () => {
    return pizza.findAll();
  },

  getPizza: (id) => {
    return pizza.findByPk(id);
  },

  createPizza: (newPizza) => {
    return pizza.create(newPizza);
  },

  updatePizza: (id, updatePizza) => {
    return pizza.update(updatePizza, { where: id });
  },

  deletePizza: (id) => {
    return pizza.destroy({ where: { id: id } });
  },
};
