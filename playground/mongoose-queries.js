const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// var todoId = '5a8e5c870a43cf310fa2543f111';
var userId = '5a8d11234a870f18061d0d5c';

// if (!ObjectID.isValid(todoId)) {
//     console.log('Id not valid');
// }

// Todo.find({
//     _id: todoId
// }).then((todos) => {
//     console.log(`Todos: ${todos}`);
// });

// Todo.findOne({
//     completed: false
// }).then((todo) => {
//     console.log('Todo, ', todo);
// });

// Todo.findById(todoId).then((todo) => {
//     if (!todo){
//         return console.log('Todo not found.');
//     }
//     console.log('Todo By Id, ', todo);
// }).catch((e) => console.log(e));

// Find User by Id
if (!ObjectID.isValid(userId)) {
    console.log('The user Id is invalid');
}
User.findById(userId).then((user) => {
    if (!user) {
        return console.log('User not found.');
    }
    console.log('User By Id, ', JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));