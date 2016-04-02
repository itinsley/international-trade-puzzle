var Promise = require("bluebird");
var parse = require('csv-parse');

var Rates = require('./lib/rates');
var RatesData = require('./lib/ratesData');
var Transactions = require('./lib/transactions');

var ratesFile = __dirname + '/puzzle/SAMPLE_RATES.xml';
var transFile = __dirname + '/puzzle/TRANS.csv';
var transFile = __dirname + '/puzzle/SAMPLE_TRANS.csv';

var fetchRatesData = RatesData.all(ratesFile);
var transStream = Transactions.stream(transFile);

var parse = require('csv-parse');

fetchRatesData.then(function(ratesData){
  rates = Rates.all(ratesData);
  console.log(rates)
})

Transactions.filterBySku(transStream, 'DM1182').then(function(trans){
  console.log(trans);
});


