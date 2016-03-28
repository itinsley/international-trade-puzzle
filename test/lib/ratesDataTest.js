var expect    = require("chai").expect;
var assert    = require("chai").assert;
var ratesData = require("../../lib/ratesData");

describe("RatesData", function() {

  var rates;

  before(function(done){
    ratesData.all(__dirname + '/../fixtures/rates.xml')
      .then(function(_rates){
        rates = _rates;
        done();
      });
  })

  describe("All", function(){
    it("should return rates from input RATES.xml file", function() {
      expect(rates.length).to.eql(6);
    });
    it("should parse conversion as float", function() {
      expect(typeof rates[0]['conversion']).to.eql('number');
    });
  });
})