var express = require('express')
var cors = require('cors');
var app = express()
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const faker = require('faker');
const authenticate = (authToken, userName, pwd) => {
   if(authToken) {
       return true;
   }
   else if(userName && pwd) {
       if(userName === 'abc' && pwd === 'abc') {
           return true;
       }
   }
   return false;
};
app.get('/client', function (req, res) {
    console.log(req.body);
    console.log('got request for client..');
    res.send({apis: 'http://localhost:3004'});
})
app.post('/auth', function (req, res) {
    console.log(req.body);
    let {username, rememberUser, password} = req.body;
    if(authenticate(null, username, password)) {
        let user = {
            username: req.username,
            rememberUser: req.rememberUser,
            authToken: faker.random.uuid()
        };
        res.send(JSON.stringify(user));
    }
    else {
        res.sendStatus(401);
    }
});
app.post('/getTasks', function (req, res) {
    console.log(req.body);
    if(authenticate(req.body.authToken)) {
        res.send(JSON.stringify({
            task: 'task',
        }));
    }
});
app.get('/', function (req, res) {
    res.send('hello world')
})
app.listen(3004, function () {
    console.log('Example app listening on port 3004!');
});

module.exports = app;