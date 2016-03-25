var Rates = require('./lib/rates');

Rates.all()
  .then(function(rates){
    console.log("Rates including cross rates");
    console.log(rates);
  })
