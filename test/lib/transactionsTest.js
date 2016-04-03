var expect       = require("chai").expect;
var assert       = require("chai").assert;
var stream       = require("stream");
var transactions = require("../../lib/transactions");
var rates        = require("../../lib/rates");

describe("Transactions", function() {

  var transFile = __dirname + '/../fixtures/trans.csv';
  var Transactions = transactions(transFile);

  describe("filteredBySku", function(){
    // var transStream = transactions.stream(transFile);

    it("should return transactions with provided sku", function(done) {
      Transactions.fetchFilteredBySku('DM1182')
        .then(function(result){
          expect(result.length).to.eql(3)
          done();
        })
    });
  });

  describe("totalUsd", function(){
    rates=[ { from: 'AUD', to: 'USD', conversion: 1.5 },
            { from: 'CAD', to: 'USD', conversion: 2 }]
    trans=[ { amount: { value: 10, currencyCode: 'AUD' } },
            { amount: { value: 20, currencyCode: 'CAD' } }]

    it("should calculate total in USD for transactions", function() {
      result = Transactions.totalUsd(trans, rates);
      expect(result).to.eql(55.00);
    });
  });

});