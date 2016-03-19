var rates = require('./rates');

rates.distinct()
  .then(log)
  .then(function(){
    console.log("not a promise so it stops here..")
  })


function log(string){
  return new Promise(function(resolve, reject){
    console.log(string);
    resolve();
  });
}