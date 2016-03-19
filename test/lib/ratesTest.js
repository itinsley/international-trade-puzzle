var expect    = require("chai").expect;
var assert    = require("chai").assert;
var Rates = require("../../lib/rates");

describe("Rates", function() {

  describe("Indexing rates", function() {
    it("should index all rates by Currency Code", function() {
      Rates.index().then(function(indexed){
        expect(Object.keys(indexed).length).to.equal(6);
      });
    });
    it("should store an instance of each rate object", function() {
      Rates.index().then(function(indexed){
        console.log(indexed);
        audCad = indexed['AUD-CAD'];
        expect(audCad['from']).to.equal('AUD');
        expect(audCad['to']).to.equal('CAD');
        expect(audCad['conversion']).to.equal('1.0079');
      });
    });
  });

  describe("distinctCodes", function(){
    it("should return list of unique currency codes", function() {
      Rates.distinctCodes().then(function(codes){
        assert.deepEqual(codes, ['AUD', 'CAD', 'EUR', 'USD']);
      });
    });
  });

});
