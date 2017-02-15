const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');



// User
var userId = '589d68c78e3c7a0f41b1a7ee';
User.findById(userId).then((user) => {
  if (!user) {
    return console.log('User Not Found!');
  }
  console.log('User by Id :',user);
}).catch((e) => {
  if (!ObjectID.isValid(userId)) {
    console.log('Id not found.');
  } else {
    console.log(e);
  }
});


// Todo
var id = '7s8a2d6efb605ac007a6c1c52';
//
// Todo.find({
//   _id : id
// }).then((todos) => {
//   // get array of objects
//   console.log('Todos :',todos);
// });
//
// Todo.findOne({
//   _id : id
// }).then((todo) => {
//   // get single object
//   console.log('Todos Find One :',todo);
// })

//
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     throw new Error('Id Not Found!');
//   }
//   console.log('Todos by Id',todo);
// }).catch((e) => {
//   if (!ObjectID.isValid(id)) {
//     console.log('Id not valid');
//   } else {
//     console.log(e);
//   }
// })
