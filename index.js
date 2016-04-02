var Promise = require("bluebird");
var parse = require('csv-parse');

var Rates = require('./lib/rates');
var RatesData = require('./lib/ratesData');
var Transactions = require('./lib/transactions');

var ratesFile = __dirname + '/puzzle/SAMPLE_RATES.xml';
var transFile = __dirname + '/puzzle/TRANS.csv';
var transFile = __dirname + '/puzzle/SAMPLE_TRANS.csv';

var fetchRates = RatesData.all(ratesFile);
var transStream = Transactions.stream(transFile);

var parse = require('csv-parse');

// // Now that setup is done, write data to the stream
// parser.write("root:x:0:0:root:/root:/bin/bash\n");
// parser.write("someone:x:1022:1022:a funny cat:/home/someone:/bin/bash\n");
// Close the readable stream



Transactions.findAllBySku(transStream, 'DM1182').then(function(trans){
  console.log(trans);
});


