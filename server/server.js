var express = require('express');
var bodyParser = require('body-parser');

var {mongoose, Schema} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();

// middleware
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((result) => {
        res.send(200, result);
    }, (e) => {
        console.log(e);
        res.send(400, `Unable to add todo: ${e}`);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000!!');
});