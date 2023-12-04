/* 
    Team Teal: Andrew Cook, Cheryl Moser, Petar Spasic
    Date: 2023-12-03
    AD320 Final Project
*/

const transactions = [
    {
        id: 1,
        customer: 1,
        item: 1,
        checkin: new Date("2023-12-10"),
        checkout: new Date("2023-12-08"),
    },
    {
        id: 2,
        customer: 1,
        item: 2,
        checkin: new Date("2023-12-10"),
        checkout: new Date("2023-12-08"),
    },
    {
        id: 3,
        customer: 2,
        item: 1,
        checkin: new Date("2023-12-04"),
        checkout: new Date("2023-12-02"),
    }
]

module.exports = function(app) { 
    app.get('/transaction/user/', getTransactionByUserAPI)
    app.get('/transaction/item/:item', getTransactionByItemAPI);    
}

//API functions
function getTransactionByUserAPI(request, response) {
    let user = 1;
    
    let results = transactions
        .filter(transaction => transaction.user == user);

    response.json(results);
}

function getTransactionByItemAPI(request, response) {
    let item = request.params.item;
    let results = transactions
        .filter(transaction => transaction.item == item);

    response.json(results);
}