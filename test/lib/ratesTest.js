var expect    = require("chai").expect;
var assert    = require("chai").assert;
var Rates = require("../../lib/rates");

describe("Rates", function() {

  var rates = [
    {"from":"AUD","to":"CAD","conversion":1.0079},
    {"from":"AUD","to":"EUR","conversion":0.7439},
    {"from":"CAD","to":"AUD","conversion":0.9921},
    {"from":"CAD","to":"USD","conversion":1.009},
    {"from":"EUR","to":"AUD","conversion":1.3442},
    {"from":"USD","to":"CAD","conversion":0.9911}]

  describe("Currencies", function(){
    it("should return list of unique currency codes", function() {
      codes = Rates.currencies(rates);
      assert.deepEqual(codes, ['AUD', 'CAD', 'EUR', 'USD']);
    });
  });

  describe("nonUsdCurrencies", function(){
    it("should return currency codes without USD", function() {
      result = Rates.nonUsdCurrencies(rates)
      assert.deepEqual(result, ['AUD', 'CAD', 'EUR']);
    });
  });

  describe("currenciesWithoutUsdRate", function(){
    it("should return list of currency codes that don't have a USD rate", function() {
      codes = Rates.currenciesWithoutUsdRate(rates);
      assert.deepEqual(codes, ['AUD', 'EUR']);
    });
  });

  describe("routeToUsd", function(){
    it("should find a route to the USD from provided currency", function() {
      route = Rates.routeToUsd(rates, 'AUD')
      assert.deepEqual(route, [ 'AUD', 'CAD', 'USD' ]);
      route = Rates.routeToUsd(rates, 'EUR')
      assert.deepEqual(route, [ 'EUR', 'AUD', 'CAD', 'USD' ]);
    });
  });

});
