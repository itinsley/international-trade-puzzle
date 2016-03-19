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
      console.log('initialising rates')
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

function distinctCodes(rates){
  _distinct={};
  rates.forEach(function(rate){
    _distinct[rate['from']]='';
    _distinct[rate['to']]='';
  })
  return Object.keys(_distinct);
}

function indexed(rates){
  _indexed={};
  rates.forEach(function(rate){
    _indexed[rate['from']+'-'+rate['to']]=rate;
  })
  return _indexed;
}

module.exports = {
  all: all,
  indexed: indexed,
  distinctCodes: distinctCodes
}