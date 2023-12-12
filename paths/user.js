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
      app.post('/api/user/review', postItemReview);
  }

  /**
   * @api {post} /api/user/login/ Login
   * @apiName postLoginAPI
   * @apiGroup User
   *
   * @apiBody {String} email Users email.
   * @apiBody {String} password Users password.
   *
   * @apiSuccess {Redirect} Redirects to home page.
   * @apiSuccess {Cookie} session Sets the session cookie with the session guid.
   */
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

  

async function postItemReview(request, response) {   
  let sessionId = request.cookies['session'];    
  let customerId = sessionHelper.getSession(sessionId);
  let transactionId = request.body.transactionId; 
  let rating = request.body.rating;
  let review_text = request.body.review_text;
  let itemId = await getItemId(transactionId);
  if (itemId == null)
  {
    return response.status(400).send("Unable to process review. Please try again.");
  }
  await createRating(customerId, itemId, rating, review_text);
  return response.redirect('/');
}

async function createRating(customerId, itemId, rating, review_text){
  return new Promise(async (resolve, reject) => {
    let insert = 'INSERT INTO feedback (customer_id, item_id, rating_review, comments) VALUES (?,?,?,?)';
    db.run(insert, [customerId, itemId, rating, review_text], (err) => {
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

function getItemId(transactionId) {
  return new Promise(async (resolve, reject) => {
    db.all("SELECT item_id FROM transactions WHERE transaction_id = ?", [transactionId], (err, rows) => {
        if (err) {
            console.error(err);
            return resolve(null);
          }
          return resolve(rows[0].item_id);
    })
  });
}
