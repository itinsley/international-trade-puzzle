var Promise = require("bluebird");
var fs = require('fs');
var parse = require('csv-parse');
var parser = parse({delimiter: ',', columns:true});
var Rates = require("./rates")

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

function fetchFilteredBySku(stream, sku){
  var bySku = function(record){
    return (record['sku']==sku)
  }
  return filter(stream, bySku);
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

function totalUsd(transactions, rates){

  value = transactions.map(function(transaction){
    return Rates.usdAmount(rates, transaction['amount']['currencyCode'], transaction['amount']['value']);
  }).reduce(function(previousValue, currentValue, currentIndex, array) {
    return previousValue + currentValue;
  });
  return +value.toFixed(2)

}

module.exports = {
  stream: stream,
  fetchFilteredBySku: fetchFilteredBySku,
  totalUsd: totalUsd
}