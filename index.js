var rates = require('./rates');


// Demonstrate memoisation of rates!
// rates.all()
//   .then(function(_rates){
//     console.log(_rates);
//     return new Promise(function(resolve, reject){
//       console.log(_rates)
//       resolve();
//     });
//   })
//   .then(function(){
//     rates.all()
//       .then(function(_rates){
//         console.log(_rates);
//       })
//   })

rates.all()
  .then(function(_rates){
    console.log(_rates);
  });