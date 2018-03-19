require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose, Schema} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT

// middleware
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((result) => {
        res.send(result);
    }, (e) => {
        res.status(400).send(`Unable to add todo: ${e}`);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.send(400, `Unable to fetch todo: ${e}`);
    })
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send(`The todo Id: ${id} is invalid`);
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
         return res.status(400).send('Todo not found');
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send(`Unable to fecth todo: ${e}`);
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send(`The todo Id: ${id} is invalid`);
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(400).send('Todo not found');
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send(`Unable to delete todo: ${e}`);
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(400).send(`The todo Id: ${id} is invalid`);
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getUTCDate();
    } else {
        body.completedAt = null;
        body.completed = false;
    }

    Todo.findByIdAndUpdate(id, {$set:body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(400).send('Todo not found');
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send(`Unable to update todo: ${e}`);
    });
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then((result) => {
        return result.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.listen(port, () => {
    console.log(`Started on port ${port}!!`);
});

module.exports = {app};