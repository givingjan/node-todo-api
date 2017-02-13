const expect = require('expect');
const supertest = require('supertest');


const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
  Todo.remove({}).then( () => {
    done();
  });
});

describe('POST / todos', () => {
  it('should create a new todo event.', (done) => {
    supertest(app)
    .post('/todos')
    .send({text : 'cc'})
    .expect((res) => {
      expect(res.body.text).toBe('cc');
    })
    .expect(200)
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find().then((todos) => {
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
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(0);
        done();
      }).catch((e) => {
        done();
      });
    });
  });
});
