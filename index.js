var Promise = require("bluebird");
var parse = require('csv-parse');

var Rates = require('./lib/rates');
var RatesData = require('./lib/ratesData');
var Transactions = require('./lib/transactions');

var ratesFile = __dirname + '/puzzle/SAMPLE_RATES.xml';
var transFile = __dirname + '/puzzle/SAMPLE_TRANS.csv';

var ratesFile = __dirname + '/puzzle/RATES.xml';
var transFile = __dirname + '/puzzle/TRANS.csv';

var fetchRatesData = RatesData.all(ratesFile);
var transStream = Transactions.stream(transFile);
var fetchTrans = Transactions.filterBySku(transStream, 'DM1182');

Promise.all([fetchRatesData, fetchTrans])
  .then(function(results){
    var ratesData    = results[0]
    var transactions = results[1]
    var rates = Rates.all(ratesData);

    total = transactions.map(function(transaction){
      return usdAmount(rates, transaction['amount']['currencyCode'], transaction['amount']['value']);
    }).reduce(function(previousValue, currentValue, currentIndex, array) {
      return previousValue + currentValue;
    });

    console.log(total.toFixed(2));
  })


function usdAmount(rates, currency, amount){
  if (currency=='USD'){
    return Number(amount);
  }
  else{
    conversion = Rates.findRate(rates, currency, 'USD')['conversion'];
    var val =  +(conversion* amount).toFixed(2);
    return val;
  }
}