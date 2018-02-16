// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

MongoClient.connect(url, (err, client) => {
    if (err) {
        console.log('Unable to connect to mongo MongoDB server.', err);
        return 0;
    }
    console.log('Connect to MongoDB server.');
    
    // client.db(dbName).collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    client.db(dbName).collection('Users').insertOne({
        name: 'Andy',
        age: 27,
        location: 'Taipei'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert user', err);
        }

        console.log(JSON.stringify(result.ops[0]._id, undefined, 2));
    })

    client.close();
});