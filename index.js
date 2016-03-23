var Rates = require('./lib/rates');

Rates.all()
  .then(function(rates){
    augmentedRates=rates.slice();
    route = Rates.routeToUsd(rates, 'AUD')
    console.log(route);

    newRate = {'from': route[0], 'to': route[route.length-1]}
    console.log("New Rate init: " + JSON.stringify(newRate))

    calculatedRate=1;
    for(var i=0; i<route.length-1 ; i++){
      from = route[i];
      to = route[i+1];
      rate = Rates.findRate(rates, from, to);
      console.log("from: " + from + " to: " + to + " " + rate['conversion'])
      calculatedRate = calculatedRate * rate['conversion']
    }

    newRate['conversion']= calculatedRate;

    console.log("New Rate: " + JSON.stringify(newRate))
  })

function log(string){
  return new Promise(function(resolve, reject){
    console.log(string);
    resolve();
  });
}