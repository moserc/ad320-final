/* 
    Team Teal: Andrew Cook, Cheryl Moser, Petar Spasic
    Date: 2023-12-03
    AD320 Final Project
*/

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
let db = new sqlite3.Database('./tbd.db', (err) => {
   if (err) {
     console.error(err.message);
   }
   console.log('Connected to the local database.');
 });

require('./paths/item')(app, db);
require('./paths/transaction')(app, db);
require('./database')(db);

var fs = require("fs");


app.get('/api', function (req, res) {
   res.send("Backend is running.");
});

app.get('/api/user/list', function (req, res) {
   res.send("Users list");
});

app.post('/api/user/add', function (req, res) {
    res.send("Not implemented yet.")
 });

 app.use(express.static('public'))
 app.use(express.static('SqLImages'))

var server = app.listen(8081, function () {
   var port = server.address().port;
   console.log("Example app listening at http://localhost:%s/api", port)
});