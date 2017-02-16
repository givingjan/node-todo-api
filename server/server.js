const {ObjectID} = require('mongodb');

var express = require('express');
var bodyPaser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyPaser.json());

app.post('/todos/add', (req, res) => {
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

// Get All Todos
app.get('/todos', (req, res) => {
  Todo.find().then((doc) => {
    res.send(doc);
  },(e) => {
    res.send(e);
  })
});

// Get Individual Todo
app.get('/todos/id/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  console.log(id);
  Todo.findById(id).then((doc) => {
    if(!doc) {
      return []
    }
    res.send(doc);
  }).catch((e) => {
    console.log(e);
    res.status(400).send();
  });
})

app.get('/todos/completed/:completed',(req, res) => {
  var c = req.params.completed

  Todo.find({
    completed : c
  }).then((doc) => {
    res.send(doc);
  }).catch((e) => {
    console.log(e);
    res.send(e);
  });
})



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
