/* jshint esversion: 6 */
import { v4 as uuidv4 } from 'uuid';

module.exports = (app, notifyCallback) => {
  const pizzaService = require('../controllers/pizza');
  const pizzaToppingService = require('../controllers/pizza-topping');

  app.get('/api/pizzas', (req, res) => {
    pizzaService.getPizzas()
    .then( (pizzas) => {
      res.json(pizzas);
    })
    .catch( (err) => {
      console.log(err);
      res.json({message: 'Error on get pizzas', error: err});
    });
  });

  app.get('/api/pizzas/:id', (req, res) => {
    pizzaService.getPizza(req.params.id)
      .then( (pizza) => {
        res.json(pizza);
      })
      .catch( (err) => {
        console.log(err);
        res.json({message: 'Error on get pizza.', error: err});
      });
  });

  app.get('/api/pizzas/:id/toppings', (req, res) => {
    pizzaToppingService.getPizzaToppings(req.params.id)
      .then( (toppings) => {
        res.json(toppings);
      })
      .catch( (err) => {
        console.log(err);
        res.json({message: 'Error on get toppings of pizza.', error: err});
      });
  });

  app.post('/api/pizzas', (req, res) => {
    const newPizza = {
      id: uuidv4(),
      name: req.body._name,
      price: req.body._price,
      description: req.body._description,
    };

    pizzaService.createPizza(newPizza)
      .then( (pizza) => {
        notifyCallback('messages', 'pizza-created');
        res.json(pizza);
      })
      .catch( (err) => {
        console.log(err);
        res.json({message: 'Error on create pizza.', error: err});
      });
  });

  app.post('/api/pizzas/toppings', (req, res) => {
    const newPizzaTopping = {
      id_pizza_topping: uuidv4(),
      id_pizza: req.body.id_pizza,
      id_topping: req.body.id_topping,
    };

    pizzaToppingService.createPizzaTopping(newPizzaTopping)
      .then( (pizzaTopping) => {
        notifyCallback('messages', 'pizza-topping-created');
        res.json(pizzaTopping);
      })
      .catch( (err) => {
        console.log(err);
        res.json({message: 'Error on create pizza-topping.', error: err});
      });
  });

  app.put('/api/pizzas/:id', (req, res) => {
    dataPizza = {
      name: req.body._name,
      price: req.body._price,
      description: req.body._description,
    };

    pizzatService.updatePizza(req.params.id, dataPizza)
        .then( (pizza) => {
          notifyCallback('messages', 'pizza-updated');
          res.json(pizza);
        })
        .catch( (err) => {
          res.json({message: 'Error on update pizza.', error: err});
        });
  });

  app.delete('/api/pizzas/:id', (req, res) => {
    pizzaService.deletePizza(req.params.id)
        .then( (data) => {
          res.json(data);
        })
        .catch( (err) => {
          notifyCallback('messages', 'pizza-deleted');
          res.json({message: 'Error on delete pizza.', error: err});
        });
  });
};
