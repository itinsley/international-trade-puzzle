var Rates = require('./lib/rates');
var RatesData = require('./lib/ratesData');
var Transactions = require('./lib/transactions');

var fileName = __dirname + '/puzzle/RATES.xml';

RatesData.all(fileName)
  .then(function(rates){
    console.log("Rates including cross rates");
    console.log(rates);
    console.log("Transactions");
    console.log(Transactions.all());
  })
