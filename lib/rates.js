var xml2js = require('xml2js');
var fs     = require('fs');
var Promise = require("bluebird");

var _rates;

function all(){
  return new Promise(function(resolve, reject){
    if (_rates){
      resolve(_rates)
    }
    else{
      var parser = new xml2js.Parser({'explicitArray': false});
      fs.readFile(__dirname + '/../puzzle/RATES.xml', function(err, data) {
        parser.parseString(data, function (err, result) {
          if (err){
            console.log("ERROR")
            reject(err);
          } else{
            _rates = result['rates']['rate'];
            resolve(_rates);
          }
        });
      });
    }
  });
}

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
}

function toRates(rates, currency, ignore){
  return rates.filter(function(rate){
    return (rate['from']==currency && ignore.indexOf(rate['to'])==-1)
  })
}

function nonUsdCurrencies(rates){
  _currencies = currencies(rates);
  deleteElement(_currencies, 'USD');
  return _currencies;
}

function hasNoUsdRate(rates, currency){
  result = rates.filter(function(rate){
    return (rate.to=='USD' && rate.from ==currency);
  })
  return (result.length ==0) ;
}

function currenciesWithoutUsdRate(rates){
  return nonUsdCurrencies(rates).filter(function(currency){
    return hasNoUsdRate(rates, currency)
  })
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
  routeToUsd: routeToUsd
}