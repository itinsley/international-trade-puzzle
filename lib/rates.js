var Promise = require("bluebird");
var ratesData = require('./ratesData')

function all(){
  return new Promise(function(resolve, reject){
    ratesData.all()
      .then(function(_rates){
        newRates = currenciesWithoutUsdRate(_rates).map(function(currency){
          return calculateUsdRate(_rates, currency);
        });
        resolve(_rates.concat(newRates));
      });
    });
}

function calculateUsdRate(rates, currency){
  route = routeToUsd(rates, currency)
  newRate = {'from': route[0], 'to': route[route.length-1]}
  calculatedRate=1;
  for(var i=0; i<route.length-1 ; i++){
    from = route[i];
    to = route[i+1];
    rate = findRate(rates, from, to);
    calculatedRate = calculatedRate * rate['conversion']
  }
  newRate['conversion']=calculatedRate;
  return newRate;
}

function findRate(rates, from, to){
  results = rates.filter(function(rate){
    return (rate['from']==from && rate['to']==to)
  });

  if (results.length>1){
    return new Error("No unique currency pair for " + from + "-" + to)
  }
  else{
    return results[0];
  }
}

// I need this to be public so I can test it but it is not for public use.
function routeToUsd(rates, fromCurrency, route, processed){

  if (typeof processed=='undefined'){
    processed=[];
    route =[];
  }
  processed.push(fromCurrency);
  route.push(fromCurrency);

  if (fromCurrency=='USD'){
    return route;
  }
  else{
    nextToRate = toRates(rates, fromCurrency, processed)[0];
    route = routeToUsd(rates, nextToRate['to'], route, processed )
  }

  return route;

  function toRates(rates, currency, ignore){
    return rates.filter(function(rate){
      return (rate['from']==currency && ignore.indexOf(rate['to'])==-1)
    })
  }
}

function nonUsdCurrencies(rates){
  _currencies = currencies(rates);
  deleteElement(_currencies, 'USD');
  return _currencies;
}

function currenciesWithoutUsdRate(rates){
  return nonUsdCurrencies(rates).filter(function(currency){
    return hasNoUsdRate(rates, currency)
  })

  function hasNoUsdRate(rates, currency){
    result = rates.filter(function(rate){
      return (rate.to=='USD' && rate.from ==currency);
    })
    return (result.length ==0) ;
  }
}

function currencies(rates){
  _distinct={};
  rates.forEach(function(rate){
    _distinct[rate['from']]=rate;
    _distinct[rate['to']]=rate;
  })
  return Object.keys(_distinct);
}

//Array Specific
function deleteElement(array, element){
  index = array.indexOf(element);
  array.splice(index, 1);
}


module.exports = {
  all: all,
  currencies: currencies,
  nonUsdCurrencies: nonUsdCurrencies,
  currenciesWithoutUsdRate: currenciesWithoutUsdRate,
  routeToUsd: routeToUsd,
  findRate: findRate,
  calculateUsdRate: calculateUsdRate,

}