//var proxyquire = require('proxyquire').noCallThru();
var featureling = require('../featureling');

describe('check featureling', function () {
  var req, res;

  beforeEach(function () {
    req = {method: 'GET'};
    res = {};
    req.headers={'accept-version': "1.3.0"};
  });
  it('should be true', function (done) {
    req.url = '/';
    featureling.create({"1.x":[ "feature:b", "feature:a"],
     "0.x":[ "feature:c"]})(req,res,function(){
       featureling.has("feature:b").should.equal(true);
       done();
    });
   });
  it('should be false', function (done) {
    req.url = '/';
    featureling.create({"0.x":[ "feature:b", "feature:a"],
     "0.x":[ "feature:c"]})(req,res,function(){
       featureling.has("feature:b").should.equal(false);
       done();
    });
   });
  it('should be false with blank header', function (done) {
    req.url = '/';
    req.headers={'accept-version': "1.3.0"};
    featureling.create({"0.x":[ "feature:b", "feature:a"],
     "0.x":[ "feature:c"]})(req,res,function(){
       featureling.has("feature:b").should.equal(false);
       done();
    });
   });
});

