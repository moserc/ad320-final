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
    
    db.all("SELECT transactions.transaction_id, transactions.customer_id, items.category || ': ' || items.name as name, transactions.checkout, transactions.checkin " + 
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
    let reservationCreated = await createReservation(customerId, itemId, checkout, checkin);
    if (reservationCreated) {
      let transactionId = await getTransactionIdByInsertion(customerId, itemId, checkout, checkin);
      if (transactionId != null) {
        return response.status(200).send(transactionId);
      } 
    }
    return response.status(400).send("Unable to reserve. Please try again.");
  }

  async function createReservation(customerId, itemId, checkout, checkin){
    return new Promise(async (resolve, reject) => {
      let insert = 'INSERT INTO transactions (customer_id, item_id, checkout, checkin) VALUES (?,?,?,?)';
      db.run(insert, [customerId, itemId, checkout, checkin], (err) => {
          if (err) {
              console.error(err);
              return resolve(false);
          }
          else 
          {
            return resolve(true);
          }
      });    
    });
  }

  function getTransactionIdByInsertion(customerId, itemId, checkout, checkin) {
    return new Promise(async (resolve, reject) => {
      db.all("SELECT transaction_id FROM transactions WHERE customer_id =? AND item_id =? AND checkout= ? AND checkin = ? " +
      "ORDER BY transaction_id DESC LIMIT 1", [customerId, itemId, checkout, checkin], (err, rows) => {
          if (err) {
              console.error(err);
              return resolve(null);
            }
            console.log('rows: ', rows);
            return resolve(rows[0]);
      })
    });
  }