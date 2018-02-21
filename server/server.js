var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp123');

var todoSchema = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
}, {
    collection: 'Todo123'
});

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})

var Todo = mongoose.model('Todo', todoSchema);
var User = mongoose.model('User', userSchema);

// var otherTodo = new Todo({
//     text: '  Edit this code  '
// });

// otherTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//     console.log('Unable to save:', e);
// });

var user = new User({
    name: 'Andy',
    email: 'andy.fu@udngroup.com.tw   '
});
user.save().then((doc) => {
    console.log('Added user', doc);
}, (e) => {
    console.log('Unable to add user: ', e);
});