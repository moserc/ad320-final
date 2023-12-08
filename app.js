/* 
    Team Teal: Andrew Cook, Cheryl Moser, Petar Spasic
    Date: 2023-12-03
    AD320 Final Project
*/

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser')

const app = express();
let db = new sqlite3.Database('./tbd.db', (err) => {
   if (err) {
     console.error(err.message);
   }
   console.log('Connected to the local database.');
 });



var fs = require("fs");

app.get('/api', function (req, res) {
   res.send("Backend is running.");
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));
app.use(express.static('SqLImages'));
app.use(cookieParser());
app.use(express.urlencoded());

require('./paths/item')(app, db);
require('./paths/transaction')(app, db);
require('./paths/user')(app, db);
require('./database')(db);

var server = app.listen(8081, function () {
   var port = server.address().port;
   console.log("Example app listening at http://localhost:%s/api", port)
});