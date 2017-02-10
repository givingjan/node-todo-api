const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(url,(err, db) => {
  if (err) {
    return console.log('Unalb to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  // db.collection('Todos').findOneAndUpdate({
  //   _id : new ObjectID('589c21f6d7bf42dc85bd8232')
  // },{
  //   $set : {
  //     completed : true
  //   }
  // }, {
  //   returnOriginal : false // false => 回傳update後的資料 , true =>回傳update前(original)的資料
  // }).then((result) => {
  //   console.log(result); // 根據returnOriginal參數得到的result.
  // });

  db.collection('Users').findOneAndUpdate({
    _id : new ObjectID('589c1ecc864b8b39707447d8')
  },{
    $set : {
      name : 'Lionel Messi'
    },
    $inc : {
      age : 1
    }
  }, {
    returnOriginal : false
  }).then((result) => {
    console.log(result);
  })
  db.close();
});
