/* jshint esversion: 6 */
module.exports = (app, notifyCallback) => {
  const pizzaService = require('../controllers/pizza');

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
    pizzaService.getPizzaToppings(req.params.id)
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
      name: req.body.pizza,
      price: req.body.price,
      description: req.body.description,
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

  app.put('/api/pizzas/:id', (req, res) => {
    dataPizza = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    };

    pizzatService.updatePizza(req.params.id, dataPizza)
        .then( (pizza) => {
          notifyCallback('messages', 'pizza-updated');
          res.send(pizza);
        })
        .catch( (err) => {
          res.send({message: 'Error on update pizza.', error: err});
        });
  });

  app.delete('/api/pizzas/:id', (req, res) => {
    pizzaService.deletePizza(req.params.id)
        .then( (data) => {
          res.send(data);
        })
        .catch( (err) => {
          notifyCallback('messages', 'pizza-deleted');
          res.send({message: 'Error on delete pizza.', error: err});
        });
  });
};
