var xml2js = require('xml2js');
var fs     = require('fs');
var Promise = require("bluebird");

var _rates;

function all(){
  return new Promise(function(resolve, reject){
    if (_rates){
      console.log('memo')
      resolve(_rates)
    }
    else{
      console.log('initialising rates')
      var parser = new xml2js.Parser();
      fs.readFile(__dirname + '/RATES.xml', function(err, data) {
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

function distinct(){
  return new Promise(function(resolve, reject){
    all()
      .then(function(rates){
        _distinct={};
        rates.forEach(function(rate){
          _distinct[rate['from']]='';
          _distinct[rate['to']]='';
        })
        resolve(Object.keys(_distinct));
      })
  });
}

// rates()
//  .then(function(_rates){
//    rates = _rates;
//    console.log(rates)
//  })

module.exports = {
  all: all,
  distinct: distinct
}