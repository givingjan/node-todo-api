const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// 3 method for delete

// Remove All
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

Todo.findOneAndRemove({text : 'Sleep Sleep'}).then((todo) => {
  if (!todo) {
    return console.log('Todo Not Found!');
  }
  console.log(todo);
}).catch((e) => {
  console.log('error');
})

//58a524dd7982bfa634a0f6d4
Todo.findByIdAndRemove('58a524dd7982bfa634a0f6d4').then((todo) => {
  if (!todo) {
    return console.log('Todo Not Found!');
  }

  console.log(todo);
}).catch((e) => {
  console.log('Invalid ID.');
})
