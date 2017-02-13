
var express = require('express');
var bodyPaser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyPaser.json());

app.post('/todos', (req, res) => {
  console.log(req.body);
  var todo = new Todo({
    text : req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/list', (req, res) => {
  Todo.find().then((doc) => {
    res.send(doc);
  },(e) => {
    res.send(e);
  })
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {
  app
};

//
//
// new User({
//   email : 'justuser@gmail.com',
// }).save().then((doc) => {
//   console.log('User saved : ',doc);
// }, (e) => {
//   console.log('Unable to save user : ',e);
// });

//
// var newTodo = new Todo({
//   text : 'Catch it'
// });
//
// newTodo.save().then((doc) => {
//   console.log('Save todo :',doc);
// }, (e) => {
//   console.log(e);
// });
//
// new Todo({
//   text : 'node class',
// }).save().then((doc) => {
//   console.log('Save todo :',doc);
// }, (e) => {
//   console.log(e);
// });
