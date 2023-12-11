/* 
    Team Teal: Andrew Cook, Cheryl Moser, Petar Spasic
    Date: 2023-12-03
    AD320 Final Project
*/

var sessionHelper = require('../session');
let db = null;

module.exports = function(app, database) { 
    db = database;
    app.get('/api/transaction/user/', getTransactionByCustomerAPI);
    app.get('/api/transaction/item/:item', getTransactionByItemAPI);
    app.post('/api/transaction/reserve', postReserveAPI);  
}

//API functions
function getTransactionByCustomerAPI(request, response) {
    let sessionId = request.cookies['session'];    
    let customerId = sessionHelper.getSession(sessionId);
    
    db.all("SELECT transactions.transaction_id, transactions.customer_id, items.name as name, transactions.checkout, transactions.checkin " + 
        "FROM transactions LEFT JOIN items ON transactions.item_id = items.item_id WHERE transactions.customer_id = ? " +
        "ORDER BY transactions.checkin DESC", [customerId], (err, rows) => {
        if (err) {
            console.error(err);
            return response.status(500).send('An error occurred while fetching data from the database');
          }
          return response.json(rows);
    })
}

function getTransactionByItemAPI(request, response) {
    let itemId = request.params.item;
    db.all("SELECT * FROM transactions WHERE item_id = ?", [itemId], (err, rows) => {
        if (err) {
            console.error(err);
            return response.status(500).send('An error occurred while fetching data from the database');
          }
          return response.json(rows);
    })
}

async function postReserveAPI(request, response) {   
    let sessionId = request.cookies['session'];    
    let customerId = sessionHelper.getSession(sessionId);
    let itemId = request.body.itemId; 
    let checkout = request.body.checkout;
    let checkin = request.body.checkin;
    await createReservation(customerId, itemId, checkout, checkin);
    return response.redirect('/');
  }

  async function createReservation(customerId, itemId, checkout, checkin){
    return new Promise(async (resolve, reject) => {
      let insert = 'INSERT INTO transactions (customer_id, item_id, checkout, checkin) VALUES (?,?,?,?)';
      db.run(insert, [customerId, itemId, checkout, checkin], (err) => {
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