const expect = require('expect');
const supertest = require('supertest');


const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
  {
    text : 'First test todo',
  },
  {
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
    .post('/todos')
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
  it('sould get all todos', (done) => {
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
