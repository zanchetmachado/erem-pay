var express = require('express');
var router = express.Router();

const mercadopago = require ('mercadopago');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

  mercadopago.configure({
    access_token: process.env.ACESS_TOKEN_MP
  });

  // Cria um objeto de preferência
  let preference = {
    items: [
      {
        title: 'Meu produto',
        unit_price: 100,
        quantity: 1,
      }
    ]
  };

  mercadopago.preferences.create(preference)
  .then(function(response){
  // Este valor substituirá a string "$$init_point$$" no seu HTML
    global.init_point = response.body.init_point;
  }).catch(function(error){
    console.log(error);
  });


});

module.exports = router;
