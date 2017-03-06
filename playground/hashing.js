const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var data = {
  id : 10
};

// var token = jwt.sign(data, '123abc');
// console.log(token);


// var decoded = jwt.verify(token,'123abc');
// console.log(decoded);
var tt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGI2OTY4MmExN2MxZDI5MjkzN2Y0YzIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDg4MzYxMDkwfQ.ll3OFg7igODKGwpkmAN0DhSEsWhFtdCoMdOCeUNouK8';
var decoded = jwt.verify(tt,'abc123');
console.log(decoded);



// var msg = 'I am User 9527';
// var hash = SHA256(msg).toString();
//
//
// console.log(hash.length);
//
// var data = {
//   id : 4
// };
//
// var token = {
//   data : data,
//   hash : SHA256(JSON.stringify(data) + 'key').toString()
// }
//
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'key').toString();
//
// if (resultHash === token.hash) {
//   console.log('Data was Not change');
// } else {
//   console.log('Data was changed, Dont trust!');
// }
