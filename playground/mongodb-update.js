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

    // findOneAndUpdate
    //
    // client.db(dbName).collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5a870ffbdfe0f92ad0a2ccd9')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    // updateOne
    //
    client.db(dbName).collection('Users').updateOne({
        _id: new ObjectID('5a87dd3e242ddf387cdb2c29')
    }, {
        $set: {
            name: 'Andy'
        },
        $inc: {
            age: -1
        }
    }).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to update users', err);
    });

    // client.close();
});