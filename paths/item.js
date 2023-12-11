/* 
    Team Teal: Andrew Cook, Cheryl Moser, Petar Spasic
    Date: 2023-12-03
    AD320 Final Project
*/

let db = null;

module.exports = function(app, database) { 
    db = database;
    app.get('/api/item', getItemsAPI);
    app.get('/api/item/category/', getAllCategoryAPI);
    app.get('/api/item/category/:category', getItemByCategoryAPI);
    app.get('/api/item/id/:id', getItemByIdAPI);    
    app.get('/api/item/search/:query', getItemBySearch);
}

//API functions
function getItemsAPI(request, response) {    
    db.all("SELECT items.item_id, items.category, items.name, items.price, items.brand_name, items.photo_url, AVG(feedback.rating_review) as rating_review " +
    "FROM items LEFT JOIN feedback ON items.item_id = feedback.item_id GROUP BY feedback.item_id ORDER BY items.item_id ASC", (err, rows) => {
        if (err) {
            console.error(err);
            return response.status(500).send('An error occurred while fetching data from the database');
          }
          return response.json(rows);
    })
}

function getItemByIdAPI(request, response) {
    let id = request.params.id;
    
    db.all("SELECT items.item_id, items.category, items.name, items.price, items.brand_name, items.photo_url, AVG(feedback.rating_review) as rating_review " +
    "FROM items LEFT JOIN feedback ON items.item_id = feedback.item_id WHERE items.item_id = ? GROUP BY feedback.item_id", [id], (err, rows) => {
        if (err) {
            console.error(err);
            return response.status(500).send('An error occurred while fetching data from the database');
          }
          return response.json(rows);
    });
}

function getItemByCategoryAPI(request, response) {
    let category = request.params.category;    

    db.all("SELECT items.item_id, items.category, items.name, items.price, items.brand_name, items.photo_url, AVG(feedback.rating_review) as rating_review " +
    "FROM items LEFT JOIN feedback ON items.item_id = feedback.item_id WHERE items.category = ? GROUP BY feedback.item_id ORDER BY items.item_id ASC", [category], (err, rows) => {
        if (err) {
            console.error(err);
            return response.status(500).send('An error occurred while fetching data from the database');
          }
          return response.json(rows);
    });
}

function getAllCategoryAPI(request, response) {
    db.all("SELECT category FROM items GROUP BY category", (err, rows) => {
        if (err) {
            console.error(err);
            return response.status(500).send('An error occurred while fetching data from the database');
          }
          return response.json(rows.map(({category}) => category)
              .filter((value, index, current_value) => current_value.indexOf(value) === index));
    })
}

function getItemBySearch(request, response) {
    let query = request.params.query;
    query = '%' + query +'%';

    db.all("SELECT items.item_id, items.category, items.name, items.price, items.brand_name, items.photo_url, AVG(feedback.rating_review) as rating_review " +
    "FROM items LEFT JOIN feedback ON items.item_id = feedback.item_id WHERE items.brand_name like ? OR items.category like ? OR items.name like ? " +
    "GROUP BY feedback.item_id ORDER BY items.item_id ASC", [query, query, query], (err, rows) => {
        if (err) {
            console.error(err);
            return response.status(500).send('An error occurred while fetching data from the database');
          }
          return response.json(rows);
    });
}