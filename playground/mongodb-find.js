const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(url,(err, db) => {
  if (err) {
    return console.log('Unable to connnect MongoDB server.');
  }

  console.log('Connected to MongoDB server - Success.');

  // db.collection('Todos').find();
  // db.collection('Todos').find({
  //   _id : new ObjectID('589c21f6d7bf42dc85bd8232')
  // }).toArray().then((docs) => {
  //   console.log('Fetch Data Success.');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos. ',err);
  // });

  db.collection('Users').find({
    name : 'Jan',
  }).toArray().then((docs) => {
    console.log(JSON.stringify(docs, null,2));
  }, (err) => {
    console.log('Unable to fetch data.');
  })

  // db.collection('Todos').find().count().then((count) => {
  //   console.log('count is ',count);
  // }, (err) => {
  //   console.log('Unable to fetch count', err);
  // })
  db.close();

});
