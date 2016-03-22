var Rates = require('./lib/rates');

Rates.all()
  .then(function(rates){
    console.log(Rates.routeToUsd(rates, 'AUD'))
  })

function log(string){
  return new Promise(function(resolve, reject){
    console.log(string);
    resolve();
  });
}