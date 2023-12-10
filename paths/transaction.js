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
}

//API functions
function getTransactionByCustomerAPI(request, response) {
    let cookie = req.headers.cookie;
    let session = cookie.split('; ');
    let customerId = sessionHelper.getSession(session);
    
    db.all("SELECT * FROM transactions WHERE customer_id = ?", [customerId], (err, rows) => {
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