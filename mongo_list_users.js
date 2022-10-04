const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log('Connected!');

    // database Name
    const dbName = 'myproject';
    const db = client.db(dbName);

    // read database
    console.log("users:");
    var customers = db
        .collection('users')
        .find()
        .toArray(function(err, docs){
            console.log('Collection:', docs);

            // clean up
            client.close();
    });
});