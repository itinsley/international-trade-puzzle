var Promise = require("bluebird");
var parse = require('csv-parse');

var Rates = require('./lib/rates');
var RatesData = require('./lib/ratesData');
var Transactions = require('./lib/transactions');

var ratesFile = __dirname + '/puzzle/SAMPLE_RATES.xml';
var transFile = __dirname + '/puzzle/SAMPLE_TRANS.csv';

var fetchRatesData = RatesData.all(ratesFile);
var transStream = Transactions.stream(transFile);
var fetchTrans = Transactions.filterBySku(transStream, 'DM1182');

Promise.all([fetchRatesData, fetchTrans])
  .then(function(results){
    var ratesData    = results[0]
    var transactions = results[1]
    var rates = Rates.all(ratesData);

    console.log(Transactions.totalUsd(transactions, rates));
  })

