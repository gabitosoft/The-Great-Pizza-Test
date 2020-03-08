/* jshint esversion: 6 */
module.exports = (app, notifyCallback) => {
  const toppingService = require('../controllers/topping');

  app.get('/api/toppings', (req, res) => {
    toppingService.getToppings()
    .then( (topping) => {
      res.json(topping);
    })
    .catch( (err) => {
      console.log(err);
      res.json({message: 'Error on get topping', error: err});
    });
  });

  app.get('/api/toppings/:id', (req, res) => {
    toppingService.getTopping(req.params.id)
      .then( (topping) => {
        res.json(topping);
      })
      .catch( (err) => {
        console.log(err);
        res.json({message: 'Error on get topping.', error: err});
      });
  });

  app.post('/api/toppings', (req, res) => {
    const newTopping = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    };

    toppingService.createTopping(newTopping)
      .then( (topping) => {
        notifyCallback('messages', 'topping-created');
        res.json(topping);
      })
      .catch( (err) => {
        console.log(err);
        res.json({message: 'Error on create topping.', error: err});
      });
  });

  app.put('/api/topping/:id', (req, res) => {
    dataTopping = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    };

    toppingService.updateTopping(req.params.id, dataTopping)
        .then( (topping) => {
          notifyCallback('messages', 'topping-updated');
          res.send(topping);
        })
        .catch( (err) => {
          res.send({message: 'Error on update topping.', error: err});
        });
  });

  app.delete('/api/topping/:id', (req, res) => {
    toppingService.deleteTopping(req.params.id)
        .then( (data) => {
          res.send(data);
        })
        .catch( (err) => {
          notifyCallback('messages', 'topping-deleted');
          res.send({message: 'Error on delete topping.', error: err});
        });
  });
};
