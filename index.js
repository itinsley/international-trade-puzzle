var Rates = require('./lib/rates');

Rates.all()
  .then(function(rates){
    Rates.augmentedRates(rates);
  })

function log(string){
  return new Promise(function(resolve, reject){
    console.log(string);
    resolve();
  });
}