const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log('Connected successfully to db server');

    // connect to myproject database
    db = client.db('myproject');
});

// create an user record for create request
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        console.log("dal.js - create(): ", name, email, password);

        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0, role: 'customer'};
        collection.insertOne(doc, {w:1}, function(err, result){
            err ? reject(err) : resolve(doc);
        });
    });
}
// return an user record for login request
function login(email, password) {
    return new Promise((resolve, reject) => {
        console.log("dal.js - login(): ", email, password);
        const users = db
            .collection('users')
            .find({email: `${email}`, password: `${password}`})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });
    });
}
// return an user record for deposit request
function deposit(email, amount) {
    return new Promise((resolve, reject) => {
        console.log("dal.js - deposit(): ", email, amount);
        const customers = db
            .collection('users')
            .find({email: `${email}`})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });
    });
}
// return an user record for deposit request
function update(email, balance) {
    return new Promise((resolve, reject) => {
        console.log("dal.js - update(): ", email, balance);

        const collection = db.collection('users');
        const doc = {email: `${email}`};
        const newbalance = { $set: {balance: `${balance}`}}
        collection.updateOne(doc, newbalance, function(err, result){
            err ? reject(err) : resolve(doc);
        });
    });
}
// return all user records for all request
function all() {
    return new Promise((resolve, reject) => {
        console.log("dal.js - all()");
        const users = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    });
}
// return all user records for exist request
function exist(email) {
    return new Promise((resolve, reject) => {
        console.log("dal.js - exist(): ", email);
        const users = db
            .collection('users')
            .find({email: `${email}`})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });
    });
}

module.exports = {create, all, login, deposit, update, exist, };