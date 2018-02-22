const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findOneAndRemove({_id: '5a8e917b6e2f354f3b1512e3'}).then((todo) => {
//     console.log(todo);
// });

// Todo.findByIdAndRemove
Todo.findByIdAndRemove('5a8e917a6e2f354f3b1512e2').then((todo) => {
    console.log(todo);
});