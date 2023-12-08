/* 
    Team Teal: Andrew Cook, Cheryl Moser, Petar Spasic
    Date: 2023-12-03
    AD320 Final Project
*/

module.exports = function(db) { 
    createItemsTable(db);   
    createUsersTable(db); 
}

function createItemsTable(db)
{
    db.run('CREATE TABLE items( \
        item_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
        category TEXT NOT NULL,\
        name TEXT NOT NULL,\
        price REAL,\
        brand_name TEXT,\
        photo_url TEXT,\
        rating_review TEXT\
    )', (err) => {
        if (err) {
            console.log("Items table already exists.");
        } else {
            console.log("Items table created");
        }
        insertItems(db);     
    });
}

function insertItems(db)
{
    db.all('SELECT * FROM items', [], (err, rows) => {
        if (err) {
            console.log("Unable to check data from items table.")
            console.log(err);
            return;
        }
        if (rows.length > 0)
        {
            console.log("Items data present.");
        }
        else{
            let insert = 'INSERT INTO items (item_id, category, name, price, brand_name, photo_url, rating_review) VALUES (?,?,?,?,?,?,?)';
            db.run(insert, [1, "Snowshoes", "mountain terrain", 179.95, "Atlas", "Atlas.PNG", "5.0"]);
            db.run(insert, [2, "Snowshoes", "rolling terrain", 136.73, "Komperdell", "Komperdell.PNG", "1.0"]);
            db.run(insert, [3, "Snowshoes", "flat terrain", 69.95, "Tubbs", "Tubs.PNG", "4.0"]);
            db.run(insert, [4, "Skis", "cross country", 70.93, "Fischer", "Fischer.PNG", "5.0"]);
            db.run(insert, [5, "Skis", "downhill", 449.95, "Rossignol", "Rossignol.PNG", "5.0"]);
            db.run(insert, [6, "Snow tube", "snow tube", 159.00, "Sonic", "Sonic.PNG", "4.5"]);
            db.run(insert, [7, "Bikes", "mountain", 279.29, "Co-op_Cycles", "Co-op_Cycles.PNG", "4.5"]);
            db.run(insert, [8, "Bikes", "road", 999.00, "Salsa", "SalsaA.PNG", "4.2"]);
            db.run(insert, [9, "Bikes", "gravel", 999.00, "Salsa", "SalsaB.PNG", "4.0"]);
            db.run(insert, [10, "Bikes", "recumbent", 2995.00, "Schwinn", "Schwinn.PNG", "4.5"]);
            db.run(insert, [11, "Bikes", "tandem", 2499.99, "Salsa", "SalsaC.PNG", "4.5"]);
            db.run(insert, [12, "Camping", "tent - 1 person", 337.39, "Big Agnes", "BigAgnes.PNG", "4.1"]);
            db.run(insert, [13, "Camping", "tent - 2 person", 185.00, "TheNorthFace", "TheNorthFace.PNG", "4.5"]);
            db.run(insert, [14, "Camping", "tent - 3 person", 179.73, "Klymit", "Klymit.PNG", "5.0"]);
            db.run(insert, [15, "Camping", "tent - 4 person", 188.89, "Eureka", "Eureka.PNG", "4.0"]);
            db.run(insert, [16, "Camping", "tent - 6 person", 117.73, "Alpine Mountain Gear", "AlpineMountainGear.PNG", "4.0"]);
            db.run(insert, [17, "Camping", "bear canister - S", 76.95, "BearVault", "BearVaultA.PNG", "4.2"]);
            db.run(insert, [18, "Camping", "bear canister - M", 83.95, "BearVault", "BearVaultB.PNG", "4.0"]);
            db.run(insert, [19, "Camping", "bear canister - L", 89.95, "BearVault", "BearVaultC.PNG", "4.5"]);
            db.run(insert, [20, "Camping", "bear canister - XL", 94.95, "BearVault", "BearVaultD.PNG", "4.0"]);
            db.run(insert, [21, "Camping", "daypack", 65.00, "Osprey", "Osprey.PNG", "4.6"]);
            db.run(insert, [22, "Camping", "overnight pack", 83.39, "Co-op Traverse", "Co-opTraverse.PNG", "4.5"]);
            db.run(insert, [23, "Camping", "backpacking pack", 239.95, "Granite Gear", "GraniteGear.PNG", "4.5"]);
            db.run(insert, [24, "Water sports", "canoe", 999.95, "Old Town", "OldTown.PNG", "4.0"]);
            db.run(insert, [25, "Water sports", "kayak - single", 1299.00, "EddyLine", "EddyLine.PNG", "4.5"]);
            db.run(insert, [26, "Water sports", "kayak - tandem", 599.95, "TAHE", "TAHE.PNG", "4.0"]);
            console.log("Inserted items data.");
        }
    });     
}

function createUsersTable(db)
{
    db.run('CREATE TABLE users( \
        email TEXT PRIMARY KEY NOT NULL,\
        password TEXT NOT NULL\
    )', (err) => {
        if (err) {
            console.log("Users table already exists.");
        } else {
            console.log("Users table created");
        }     
        insertUsers(db);
    });
}

function insertUsers(db)
{
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            console.log("Unable to check data from users table.")
            console.log(err);
            return;
        }
        if (rows.length > 0)
        {
            console.log("User data present.");
        }
        else{
            let insert = 'INSERT INTO users (email, password) VALUES (?,?)';
            db.run(insert, ["test@test.local", "$2b$10$mHyxY0311BFe71j/jb3pN.nCgZwgBSpk0JCLGrwP2KHnhbwaeUDV2"]);
            console.log("Inserted user data.");
        }
    });     
}