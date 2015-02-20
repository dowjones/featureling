#featureling[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coverage-image]][coverage-url]

Feature handling package to assist in versioning an api. The package provides the necessary hooks to make a feature list avaliable. It was created to provide the concept of a feature to use for versioning your code. It is utilizing CLS to make the feature list available for an application. 


##Usage
There are two main methods.

create - Middleware to look at the Accept-Version header and determine available features. This list of feature is place in CLS for use later.

has - Checks if a version is available. This can be used to determine if custom code or legacy behavior needs to be applied.

##Examples

### create usage
Use the feature list in your application package.json and the Accept-Version header to determine features available.
```
app.use(require('featureling').create(require('./package.json').features));
```
### Feature List
Your feature list will look something like the following:
```
"features":{
  "1.x":[ "versions","health","lists"],
  "0.x":[ "health"]
}
```     
### has usage
You can then lookup to see if the feature is available.
```
  featureling.has("versions")
```

## License

[MIT](/LICENSE)



