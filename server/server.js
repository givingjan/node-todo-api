const {ObjectID} = require('mongodb');

var express = require('express');
var bodyPaser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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

  console.log(res);
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


// delete
app.delete('/todos/id/:id',(req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send({
      success : false,
      errorMsg : 'Id is Invalid.'
    });
  }
  Todo.findByIdAndRemove(id).then((doc) => {
    if (!doc) {
      return res.status(400).send({
        success : false,
        errorMsg : 'Id Not Found'
      });
    }
    res.send({
      success : true,
      todo : doc
    });
  }).catch((e) => {
    console.log(e);
    res.status(400).send({
      success : false,
      errorMsg : 'Id is Invalid'
    });
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
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
