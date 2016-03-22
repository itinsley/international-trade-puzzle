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


processed = [];
function routeToUsd(rates, fromCurrency, route){
  if (!route){
    route =[];
  }
  processed.push(fromCurrency);
  route.push(fromCurrency);

  if (route.indexOf('USD')!=-1){
    //Found
    console.log("Found. Route: " + route.join('>'))
    return route;
  }
  else{
    console.log('still searchin: '+ JSON.stringify(route))
    toRates = exchToRates(rates, fromCurrency, processed);
    toRates.forEach(function(rate){
      route = routeToUsd(rates, rate['to'], route )
    })
  }

  return route;
}

function exchToRates(rates, currency, processed){
  return rates.filter(function(rate){
    return (rate['from']==currency && processed.indexOf(rate['to'])==-1)
  })
}


function nonUsdCurrencies(rates){
  _currencies = currencies(rates);
  index = _currencies.indexOf('USD');
  _currencies.splice(index, 1)
  return _currencies;
}

function hasNoUsdRate(rates, currency){
  result = rates.filter(function(rate){
    return (rate.to=='USD' && rate.from ==currency);
  })
  console.log(currency + ": " + result.length)
  return (result.length ==0) ;
}

function currenciesWithoutUsdRate(rates){
  return nonUsdCurrencies(rates).filter(function(currency){
    console.log("testing:"+currency)
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


module.exports = {
  all: all,
  currencies: currencies,
  nonUsdCurrencies: nonUsdCurrencies,
  currenciesWithoutUsdRate: currenciesWithoutUsdRate,
  routeToUsd: routeToUsd
}