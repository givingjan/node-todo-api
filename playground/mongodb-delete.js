const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(url,(err, db) => {
  if (err) {
    return console.log('Unalb to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  // db.collection('Users').deleteMany({
  //   name : 'Jan1'
  // }).then((result) => {
  //   console.log(result.result);
  // });

  // db.collection('Users').deleteOne({
  //   name : 'JanQQ'
  // }).then((result) => {
  //   console.log(result.result);
  // });

  db.collection('Users').findOneAndDelete({
    age : 28
  }).then((result) => {
    console.log(result);
  });

  db.close();
});
