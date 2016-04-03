var Promise = require("bluebird");
var fs = require('fs');
var parse = require('csv-parse');
var parser = parse({delimiter: ',', columns:true});
var Rates = require("./rates")


module.exports =

function Transactions(file){
  return {
    fetchFilteredBySku: fetchFilteredBySku,
    totalUsd: totalUsd
  }

  function stream(){
    return fs.createReadStream(file);
  }

  function parseAmount(amountString){
    var amount = {};
    var values = amountString.split(" ");
    amount['value'] = values[0];
    amount['currencyCode'] = values[1];
    return amount;
  }

  function fetchFilteredBySku(sku){
    var bySku = function(record){
      return (record['sku']==sku)
    }
    return filter(bySku);
  }

  function filter(callback){
    stream = stream();

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

}