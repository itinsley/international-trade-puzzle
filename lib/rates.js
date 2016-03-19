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

function augmentedRates(rates){
  _indexed = indexed(rates);
  missingRates(_indexed, distinctCodes(rates)).forEach(function(code){
    idx = uniq_idx(code, 'USD')
    // console.log(idx);
    //Does this currency have a USD to it? if so reverse it
    //Does this currency have a related currency with a USD rate?
    //Recurse all other currencies until we find USD then come back, calculating rates..
    console.log(code);
  });

}

function nonUsdCodes(codes){
  const index = codes.indexOf('USD');
  codes.splice(index, 1)
  return codes;
}

function missingRates(indexed, codes){
  missingCodes=[];
  nonUsdCodes(codes).forEach(function(code){
    usdConversionIdx = uniq_idx(code, 'USD')
    if (indexed[usdConversionIdx]==undefined){
      missingCodes.push(code)
    }
  })
  return missingCodes;
}

function distinctCodes(rates){
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
  distinctCodes: distinctCodes,
  nonUsdCodes: nonUsdCodes,
  missingRates: missingRates,
  augmentedRates, augmentedRates
}