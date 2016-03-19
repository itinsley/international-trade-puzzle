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

  describe("distinctCodes", function(){
    it("should return list of unique currency codes", function() {
      codes = Rates.distinctCodes(rates);
      console.log(codes)
      assert.deepEqual(codes, ['AUD', 'CAD', 'EUR', 'USD']);
    });
  });

});
