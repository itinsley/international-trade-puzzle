var Promise = require('bluebird');
var Rates = require('./rates');
var ratesData = require('./ratesData');
var Transactions = require('./transactions');

module.exports =

function dataSources(folder){
  var ratesFile = folder + '/RATES.xml';
  var RatesData = ratesData(ratesFile);

  var transFile = folder + '/TRANS.csv';

  return {

    ratesFile: ratesFile,
    transFile: transFile,
    fetchRatesData: RatesData.all()

  }
}