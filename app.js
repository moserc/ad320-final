/* 
    Team Teal: Andrew Cook, Cheryl Moser, Petar Spasic
    Date: 2023-12-03
    AD320 Final Project
*/

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
var fs = require("fs");
let db = new sqlite3.Database('./tbd.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the local database.');
  });

  app.get('/', function (req, res) {
   res.send("Backend is running.");
})


app.get('/item/list', function (req, res) {
    res.send("items 1-10");
 })

app.get('/user/list', function (req, res) {
   res.send("Users list");
})

app.post('/user/add', function (req, res) {
    res.send("Not implemented yet.")
 })

var server = app.listen(8081, function () {
   var port = server.address().port;
   console.log("Example app listening at http://localhost:%s", port)
})