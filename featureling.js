var cls = require('continuation-local-storage'),
  session = cls.createNamespace('featureling'),
  getNamespace = cls.getNamespace,
  semver = require('semver'),
  featureling = module.exports = {};

function getFeatures(version,featurelist) {
  if (version) {
    version = version.replace(/[^\d.]/g, '');
    for (var range in featurelist) {
      if (semver.satisfies(version,range)) return featurelist[range];
    }
  }
  return [];
};
featureling.create = function (featurelist)
{
  return function(req, res,next) {
    var features=[];
    if (req.headers && req.headers['accept-version'])
      features=getFeatures(req.headers['accept-version'].toString(),featurelist);
    session.run(function() {
      session.set('features',features);
      next();
    });
  }
}
featureling.has = function has(feature) {
  var features = getNamespace('featureling').get('features');
  if(typeof features !== 'undefined' &&  features.indexOf(feature) !== -1) return true;
  else return false;
}
