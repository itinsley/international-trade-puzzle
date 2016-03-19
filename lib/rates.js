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

function distinctCodes(){
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

function index(){
  return new Promise(function(resolve, reject){
    all()
      .then(function(rates){
        _index={};
        rates.forEach(function(rate){
          _index[rate['from']+'-'+rate['to']]=rate;
        })
        resolve(_index);
      })
  });
}

module.exports = {
  all: all,
  index: index,
  distinctCodes: distinctCodes
}