var Promise = require('bluebird');
var Rates = require('./rates');
var ratesData = require('./ratesData');
var transactions = require('./transactions');

module.exports =

function dataSources(folder){
  var ratesFile = folder + '/RATES.xml';
  var transFile = folder + '/TRANS.csv';
  var RatesData = ratesData(ratesFile);

  return {
    ratesFile: ratesFile,
    transFile: transFile,
    fetchRates: fetchRates
  };

  function fetchRates(){
    return RatesData.all()
      .then(Rates.all)
  }
}