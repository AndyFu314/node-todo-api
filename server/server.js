var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose, Schema} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((result) => {
        res.send(200, result);
    }, (e) => {
        res.send(400, `Unable to add todo: ${e}`);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send(200, {todos});
    }, (e) => {
        res.send(400, `Unable to fetch todo: ${e}`);
    })
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.send(400, `The user Id: ${id} is invalid`);
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
         return res.send(400, 'Todo not found');
        }

        res.send(200, {todo});
    }).catch((e) => {
        res.send(400, `Unable to fecth todo: ${e}`);
    })
})

app.listen(port, () => {
    console.log(`Started on port ${port}!!`);
});

module.exports = {app};