const expect = require('expect');
const supertest = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
  {
    _id : new ObjectID(),
    text : 'First test todo',
  },
  {
    _id : new ObjectID(),
    text : 'Second test todo',
  }
];

beforeEach((done) => {
  Todo.remove({}).then( () => {
    return Todo.insertMany(todos);
  }).then(() => {
    done();
  });
});

describe('POST / todos', () => {
  it('should create a new todo event.', (done) => {
    supertest(app)
    .post('/todos/add')
    .send({text : 'cc'})
    .expect(200)
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      expect(res.body.text).toBe('cc');
      Todo.find({
        text : 'cc',
      }).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe('cc');
        done();
      }).catch((e) => {
        done(e);
      });
    });
  });

  it('should not create todo with invalid body data', (done) => {
    supertest(app)
    .post('/todos')
    .send({})
    .expect(400)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done());
  });
});

describe('GET / todos', () => {
  it('should get all todos', (done) => {
    supertest(app)
    .get('/todos')
    .send({})
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done());
  });
});

describe('GET / todos/id/id:', () => {
  it('should get todo by id', (done) => {
    supertest(app)
    .get(`todos/id/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      console.log(res.body);
      expect(res.body.obj.text).toBe(todos[0].text)
    })
    .end(done());
  });

  it('should return 400 if todo not found',(done) => {
    var hexId = new ObjectID().toHexString();
    supertest(app)
    .get(`todos/id/${hexId}`)
    .expect(400)
    .end(done());
  });

  it('should return 400 if todo`s format is wrong.',(done) => {
    supertest(app)
    .get(`todos/id/123`)
    .expect(400)
    .end(done());
  });
});

describe('DELETE /todos/id/id:', () => {
  it('should delete todo by id', (done) => {
    supertest(app)
    .delete(`todos/id/${todos[0]._id.toHexString()}`)
    .expect(200)
    .end((err, res) => {
      Todo.find({}).then((doc) => {
        expect(doc.length).toBe(2);
      })
      done();
    }).catch((e) => {
      done();
    });
  });
});


// describe('GET / todos/id:',() => {
//   it('should get todo by Id',(done) => {
//     supertest(app)
//     // .get(`todos/id/${todos[0]._id.toHexString()}`)
//     .get('/todos')
//     .expect(200)
//     .end(done);
//   });
// });
