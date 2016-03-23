var Rates = require('./lib/rates');

Rates.all()
  .then(function(rates){
    // console.log(Rates.routeToUsd(rates, 'AUD'))
    console.log(Rates.routeToUsd(rates, 'EUR'))
    console.log(Rates.routeToUsd(rates, 'AUD'))
    console.log(Rates.nonUsdCurrencies(rates))
  })

function log(string){
  return new Promise(function(resolve, reject){
    console.log(string);
    resolve();
  });
}