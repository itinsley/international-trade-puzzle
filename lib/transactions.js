var fs = require('fs');
var parse = require('csv-parse');
var Promise = require("bluebird");
var parser = parse({delimiter: ',', columns:true});


function stream(inputFile){
  return fs.createReadStream(inputFile);
}

function parseAmount(amountString){
  var amount = {};
  var values = amountString.split(" ");
  amount['value'] = values[0];
  amount['currencyCode'] = values[1];
  return amount;
}

function filterBySku(stream, sku){
  var yes = function(record){
    return (record['sku']==sku)
  }
  return filter(stream, yes);
}

function filter(stream, callback){
  var transactions = [];

  return new Promise(function(resolve, reject){

    parser.on('readable', function(){
      while(record = parser.read()){
        if (callback(record)){
          record['amount']=parseAmount(record['amount']);
          transactions.push(record);
        }
      }
    });

    parser.on('error', function(err){
      reject(err.message);
    });

    stream.on('readable', function(){
      while(data = stream.read()){
        parser.write(data);
      }
    });

    stream.on('end', function(){
      parser.end();
    });

    parser.on('finish', function(){
      resolve(transactions);
    });

  });
}

module.exports = {
  stream: stream,
  filterBySku: filterBySku
}