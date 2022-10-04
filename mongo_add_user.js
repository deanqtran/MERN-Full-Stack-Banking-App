const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log('Connected!');

    // database Name
    const dbName = 'myproject';
    const db = client.db(dbName);

    // new user
    var name = 'john';
    var email = 'john@hot.net';
    var password = 'secret';
    var balance = 0.00;
    var role = 'admin';


    // insert into users table
    var collection = db.collection('users');
    var doc = {name, email, password, balance, role};
    collection.insertOne(doc, {w:1}, function(err, result){
        console.log('Document inserted');
    });

    // read database
    console.log("users: ");
    var customers = db
        .collection('users')
        .find()
        .toArray(function(err, docs){
            console.log('Collection:', docs);

            // clean up
            client.close();
    });
});