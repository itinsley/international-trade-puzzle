var xml2js = require('xml2js');
var fs     = require('fs');
var Promise = require("bluebird");


function all(file){
  console.log("file: " + file)
  var rates;
  return new Promise(function(resolve, reject){
    if (rates){
      resolve(rates)
    }
    else{
      var parser = new xml2js.Parser({'explicitArray': false});
      fs.readFile(file, function(err, data) {
        parser.parseString(data, function (err, result) {
          if (err){
            console.log("ERROR")
            reject(err);
          } else{
            rates = result['rates']['rate'];

            for (var i = 0; i < rates.length; i++) {
              conversion = parseFloat(rates[i]['conversion']);
              rates[i]['conversion'] = conversion;
            }

            resolve(rates);
          }
        });
      });
    }
  });
}

module.exports = {
  all:all
}