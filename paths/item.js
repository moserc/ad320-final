/* 
    Team Teal: Andrew Cook, Cheryl Moser, Petar Spasic
    Date: 2023-12-03
    AD320 Final Project
*/

const items = [
    {
        id: 1,
        category: "Snowshoes",
        name: "mountain terrain",
        price: 10,
        brand: "MSR",
        photoUrl: "https://www.rei.com/media/d4d1e523-af54-426d-b812-f22921cb41b6.jpg",
        rating: 4.5
    },
    {
        id: 2,
        category: "Snowshoes",
        name: "rolling terrain",
        price: 8,
        brand: "Atlas",
        photoUrl: "https://www.rei.com/media/ad4ecc80-49ce-4508-b457-65fccafbc21e.jpg",
        rating: 4.8
    },
    {
        id: 3,
        category: "Snowshoes",
        name: "rolling terrain",
        price: 6,
        brand: "TSL Snowshoes",
        photoUrl: "https://www.rei.com/media/a7ac78ff-ad5a-4843-8807-c56740885a89.jpg",
        rating: 4.2
    },
    {
        id: 4,
        category: "Skis",
        name: "cross country",
        price: 15,
        brand: "Salomon",
        photoUrl: "https://www.rei.com/media/3c720a80-134f-4522-bef5-17cbb3df0e2b.jpg",
        rating: .5
    }
]

module.exports = function(app) { 
    app.get('/item', getItemsAPI);
    app.get('/item/category/', getCategoryAPI)
    app.get('/item/id/:id', getItemByIdAPI);    
}

//API functions
function getItemsAPI(request, response) {
    response.json(items);
}

function getItemByIdAPI(request, response) {
    let id = request.params.id;
    
    let item = items
        .find(i => i.id == id);

    response.json(item);
}

function getCategoryAPI(request, response) {
    let categories = items
        .map(({category}) => category)
        .filter((value, index, current_value) => current_value.indexOf(value) === index);

    response.json(categories);
}

