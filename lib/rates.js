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

// function augmentedRates(rates){
//   _indexed = indexed(rates);
//   missingRates(_indexed, currencies(rates)).forEach(function(currency){
//     currency = uniq_idx(code, 'USD')
//     // console.log(idx);
//     //Does this currency have a USD to it? if so reverse it
//     //Does this currency have a related currency with a USD rate?
//     //Recurse all other currencies until we find USD then come back, calculating rates..
//     console.log(code);
//   });

// }

function nonUsdCurrencies(rates){
  currencies = currencies(rates);
  index = currencies.indexOf('USD');
  currencies.splice(index, 1)
  return currencies;
}

function hasNoUsdRate(currency, rates){
  result = rates.filter(function(rate){
    return (rate.to=='USD' && rate.from ==currency);
  })
  console.log(currency + ": " + result.length)
  return (result.length ==0) ;
}

function currenciesWithoutUsdRate(rates){
  return nonUsdCurrencies(rates).filter(function(currency){
    console.log("testing:"+currency)
    return hasNoUsdRate(currency, rates)
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

function indexed(rates){
  _indexed={};
  rates.forEach(function(rate){
    idx = uniq_idx(rate['from'], rate['to']);
    _indexed[idx]=rate;
  })
  return _indexed;
}

function uniq_idx(from, to){
  return from+'-'+to;
}

module.exports = {
  all: all,
  indexed: indexed,
  currencies: currencies,
  nonUsdCurrencies: nonUsdCurrencies,
  currenciesWithoutUsdRate: currenciesWithoutUsdRate
}