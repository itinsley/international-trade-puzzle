var Promise = require("bluebird");
var dataSources = require('./lib/dataSources')(__dirname + '/puzzle');
var Rates = require('./lib/rates');
var Transactions = require('./lib/transactions');


var transStream = Transactions.stream(dataSources.transFile);
var fetchTrans = Transactions.filterBySku(transStream, 'DM1182');

console.log(fetchTrans)

Promise.all([dataSources.fetchRatesData, fetchTrans])
  .then(function(results){
    var ratesData    = results[0]
    var transactions = results[1]
    var rates = Rates.all(ratesData);

    console.log(Transactions.totalUsd(transactions, rates));
  })
