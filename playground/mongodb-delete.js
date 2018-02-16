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

    // dleleteMany
    //
    // client.db(dbName).collection('Todos').deleteMany({
    //     text: 'Walk the dog'
    // }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Unable to delete todos', err);
    // });

    // deleteOne
    //
    // client.db(dbName).collection('Todos').deleteOne({
    //     text: 'Walk the dog'
    // }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Unable to delete todos', err);
    // });

    // findOneAndDelete
    //
    // client.db(dbName).collection('Todos').findOneAndDelete({
    //     completed: false
    // }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Unable to delete todos', err);
    // });

    // Delete document with the specific id in Users
    // 
    // client.db(dbName).collection('Users').findOneAndDelete({
    //     _id: new ObjectID('5a870737dfe0f92ad0a2ccd1')
    // }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Unable to delete users', err);
    // }); 

    // Delete documents with the specific name in Users
    //
    client.db(dbName).collection('Users').deleteMany({
        name: 'Andy'
    }).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to delete users', err);
    });

    // client.close();
});