

var user = {
  name : 'Mr.QQ',
  age : 22
}

var {name} = user;

console.log(name);



// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = ObjectID();
// console.log(obj);

// mongo 會自動創造TodoApp資料庫 不用create.
const url = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(url,(err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');

  }

  console.log('Connected to MongoDB server - success.');

  // db.collection('Todos').insertOne({
  //   text : 'Something to do',
  //   completed : false,
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert to [Todos] collection.');
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });



  // Insert new doc into Users (name, age, location)
  // db.collection('Users').insertOne({
  //   name : 'Jan1',
  //   age : 28,
  //   location : 'Taipei',
  // },(err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert to [Users] collection.');
  //   }
  //   console.log('Insert to [Users] success');
  //   console.log(result.ops[0]._id);
  //   console.log(result.ops[0]._id.getTimestamp());
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });



  db.close();
});
