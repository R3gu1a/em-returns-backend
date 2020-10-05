var express = require('express')
var cors = require('cors');
var app = express()
app.use(cors());

const faker = require('faker');

app.get('/client', function (req, res) {
    console.log('got request for client..');
    res.send({apis: 'http://localhost:3004'});
})
app.post('/auth', function (req, res) {
    let user = {
        username: req.username,
        rememberUser: req.rememberUser,
        authToken: faker.random.uuid()
    };
    res.send(JSON.stringify(user));
})
app.get('/', function (req, res) {
    res.send('hello world')
})
app.listen(3004, function () {
    console.log('Example app listening on port 3004!');
});

module.exports = app;