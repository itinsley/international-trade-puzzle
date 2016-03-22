var expect    = require("chai").expect;
var assert    = require("chai").assert;
var Rates = require("../../lib/rates");

describe("Rates", function() {

  var rates;
  before(function(done){
    Rates.all()
      .then(function(_rates){
        rates = _rates;
        done();
      });
  })

  describe("Indexing rates", function() {
    it("should index all rates by Currency Code", function() {
      indexed = Rates.indexed(rates);
      expect(Object.keys(indexed).length).to.equal(6);
    });
    it("should store an instance of each rate object", function() {
      indexed = Rates.indexed(rates);
      audCad = indexed['AUD-CAD'];
      expect(audCad['from']).to.equal('AUD');
      expect(audCad['to']).to.equal('CAD');
      expect(audCad['conversion']).to.equal('1.0079');
    });
  });

  describe("Currencies", function(){
    it("should return list of unique currency codes", function() {
      codes = Rates.currencies(rates);
      assert.deepEqual(codes, ['AUD', 'CAD', 'EUR', 'USD']);
    });
  });

  describe("nonUsdCurrencies", function(){
    it("should return currency codes without USD", function() {
      codes = Rates.currencies(rates);
      result = Rates.nonUsdCurrencies(codes)
      assert.deepEqual(result, ['AUD', 'CAD', 'EUR']);
    });
  });

  describe("currenciesWithoutUsdRate", function(){
    it.only("should return list of currency codes that don't have a USD rate", function() {
      codes = Rates.currenciesWithoutUsdRate(rates);
      assert.deepEqual(codes, ['AUD', 'EUR']);
    });
  });


});
