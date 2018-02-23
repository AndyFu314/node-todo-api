const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server.js');
const {Todo} = require('../models/todo.js');

const dummyTodos = [{
    _id: new ObjectID(),
    text: 'First todo for test case'
}, {
    _id: new ObjectID(),
    text: 'Second todo for test case'
}];

// remove all data before testing then add two dummy document
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(dummyTodos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                // assert result with real data
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo document', (done) => {
        request(app)
            .get(`/todos/${dummyTodos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(dummyTodos[0].text);
            })
            .end(done);
    });

    it('should return 400 if todo not found', (done) => {
        var newId = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${newId}`)
            .expect(400)
            .end(done);
    });

    it('should return 400 for non-object ids', (done) => {
        request(app)
            .get('/todos/12345')
            .expect(400)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var todoId = dummyTodos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${todoId}`)
            .expect(200)
            .expect((res) => {
                console.log(res);
                expect(res.body.todo.text).toBe(dummyTodos[1].text);
            })
            .end((err, res) => {
                if (err){
                    return done(err);
                }

                Todo.findById(todoId).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });

    it('should return 400 if todo not found', (done) => {
        var newId = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${newId}`)
            .expect(400)
            .end(done);
    });

    it('should return 400 if object id is invalid', (done) => {
        request(app)
            .delete('/todos/12345')
            .expect(400)
            .end(done);
    });
});