var fs = require('fs');
var parse = require('csv-parse');
var Promise = require("bluebird");
var parser = parse({delimiter: ':'});


function stream(inputFile){
  return fs.createReadStream(inputFile);
}

function findAllBySku(stream, sku){
  var transactions = [];

  return new Promise(function(resolve, reject){

    parser.on('readable', function(){
      while(record = parser.read()){
        transactions.push(record);
      }
    });

    parser.on('error', function(err){
      reject(err.message);
    });

    stream.on('readable', function(){
      while(data = stream.read()){
        parser.write(data);
      }
    });

    stream.on('end', function(){
      parser.end();
    });

    parser.on('finish', function(){
      resolve(transactions);
    });

  });
}

function toTrans(line){
  return {
    'store': line[0],
    'sku': line[1],
    'amount': line[2],
  }
}

module.exports = {
  stream: stream,
  findAllBySku: findAllBySku
}