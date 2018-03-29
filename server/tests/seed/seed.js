const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const dummyUsers = [{
    _id: userOneId,
    email: 'first@example.com',
    password: 'userOnePassword',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'second@example.com',
    password: 'userTwoPassword',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, 'abc123').toString()
    }]
}];

const dummyTodos = [{
    _id: new ObjectID(),
    text: 'First todo for test case',
    _creatorId: userOneId
}, {
    _id: new ObjectID(),
    text: 'Second todo for test case',
    completed: true,
    completedAt: 777,
    _creatorId: userTwoId
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(dummyTodos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(dummyUsers[0]).save();
        var userTwo = new User(dummyUsers[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done());
};

module.exports = {dummyUsers, populateUsers, dummyTodos, populateTodos};