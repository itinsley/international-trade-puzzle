var xml2js = require('xml2js');
var fs     = require('fs');
var Promise = require("bluebird");

module.exports =

function ratesData(file){
  return {
    'all': all
  }

  function all(){
    var rates;
    return new Promise(function(resolve, reject){
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

    });
  }

}

