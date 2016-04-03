var Promise = require("bluebird");
var dataSources = require('./lib/dataSources')(__dirname + '/puzzle');
var Transactions = require('./lib/transactions');

dataSources.fetchRates()
  //Fetch rates first as they would be used as a dependency
  .then(function(rates){
    //Transactions are fetched as a promise as they are a filtered stream
    fetchTrans = Transactions.fetchFilteredBySku(dataSources.transactionsStream, 'DM1182')
    fetchTrans.then(function(transactions){
      var result = Transactions.totalUsd(transactions, rates);
      console.log(result);
    })
  });
