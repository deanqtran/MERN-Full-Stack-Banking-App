var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// a route to create an account record for create request
app.get('/account/create/:name/:email/:password', function(req, res){
    dal.create(req.params.name, req.params.email, req.params.password)
        .then((user) => {
            console.log(user);
            res.send(user);
        });
});

// a route to return an account record for login request
app.get('/account/login/:email/:password', function(req, res) {
    dal.login(req.params.email, req.params.password)
        .then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

// a route to return an account record for deposit request
app.get('/account/deposit/:email/:amount', function(req, res) {
    dal.deposit(req.params.email, req.params.amount)
        .then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

// a route for withdraw request
app.get('/account/withdraw/:email/:password/:amount', function(req, res) {
    res.send({
        email: req.params.email,
        password: req.params.password,
        amount: req.params.amount
    });
});

// a route to return an account record for update request
app.get('/account/update/:email/:balance', function(req, res) {
    dal.update(req.params.email, req.params.balance)
        .then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

// a route for balance request
app.get('/account/balance/:email/:password', function(req, res) {
    res.send({
        email: req.params.email,
        password: req.params.password
    });
});

// a route to return all account records for all request
app.get('/account/all', function(req, res) {
    dal.all()
        .then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

// a route to return all account records for email exist request
app.get('/account/exist/:email', function(req, res) {
    dal.exist(req.params.email)
        .then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);