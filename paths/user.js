/* 
    Team Teal: Andrew Cook, Cheryl Moser, Petar Spasic
    Date: 2023-12-03
    AD320 Final Project
*/

const cookieName = 'session';
const bcrypt = require("bcrypt");
var sessionHelper = require('../session');
  let db = null;

  module.exports = function(app, database) { 
      db = database;
      app.post('/api/user/login/', postLoginAPI);
      app.post('/api/user/logout', postLogoutAPI);
      app.post('/api/user/register', postRegisterAPI);
  }

  async function postLoginAPI(request, response) {    
    let email = request.body.email;
    let password = request.body.password;

    db.all("SELECT * FROM customers WHERE email = ?", [email], (err, rows) => {
        if (err) {
            console.error(err);
            return response.status(500).send('An error occurred while fetching data from the database');
          }
          if (rows.length != 1)
          {
            return response.status(401).send('Email or password doesn\'t match.');
          }
          if (bcrypt.compare(password, rows[0].password)) {
            let sessionId = sessionHelper.createSession(rows[0].customer_id);
            response.cookie(cookieName, sessionId, {maxAge: 360000});
            return response.redirect('/');
          }
          return response.status(401).send('Email or password doesn\'t match.');
    });
  }

  function postLogoutAPI(request, response) {
    response.clearCookie(cookieName);
    return response.redirect('/');
  }

  async function postRegisterAPI(request, response) {    
    let email = request.body.email;
    let password = request.body.password;

    let customerId = await getUser(email);
    if (customerId == null)
    {
      await createUser(email, password);
    }
    else { 
      return response.status(500).send('An error occurred while fetching data from the database');
    }

    customerId = await getUser(email);
    if (customerId == null)
    {
      return response.status(500).send('An error occurred while fetching data from the database');
    }
    else {
      let sessionId = sessionHelper.createSession(customerId);
      response.cookie(cookieName, sessionId, {maxAge: 360000});
      return response.redirect('/');
    }
  }

  function getUser(email){
    return new Promise((resolve, reject) => {
    db.all("SELECT * FROM customers WHERE email = ?", [email], (err, rows) => {
      if (err) {
          console.error(err);
          return resolve(null);
        }
        if (rows.length != 1)
        {
          return resolve(null);
        }
        return resolve(rows[0].customer_id);
      });
    });
  }

  async function createUser(email, password){
    return new Promise(async (resolve, reject) => {
      let salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(password, salt);

      let insert = 'INSERT INTO customers (email, password) VALUES (?,?)';
      db.run(insert, [email, hashedPassword], (err) => {
          if (err) {
              console.error(err);
              return resolve(null);
          }
          else 
          {
            return resolve(null);
          }
      });    
    });
  }
