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

    // Fetch document with the specific id in Todos
    //
    // client.db(dbName).collection('Todos').find({
    //     _id: new ObjectID('5a86e8e34077624188cef274')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // Get the count of all documents in Todos
    //
    // client.db(dbName).collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // Fetch document with the specific name in Users
    //
    client.db(dbName).collection('Users').find({
        name: 'Andy'
    }).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err)
    });

    // client.close();
});