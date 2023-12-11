/* 
    Team Teal: Andrew Cook, Cheryl Moser, Petar Spasic
    Date: 2023-12-03
    AD320 Final Project
*/

let db = null;

module.exports = function(database) { 
    db = database;
    initializeDatabase();   
}

async function initializeDatabase()
{
    console.log("---Starting database initialization.--")
    await createItemsTable();
    await createCustomersTable();
    await createTransactionsTable();
    await createFeedbackTable();
    console.log("---Completed database initialization.--")
}

function createItemsTable()
{
    return new Promise((resolve) => {
        db.run('CREATE TABLE items( \
            item_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            category TEXT NOT NULL,\
            name TEXT NOT NULL,\
            price REAL,\
            brand_name TEXT,\
            photo_url TEXT\
        )', async (err) => {
            if (err) {
                console.log("Items table already exists.");
            } else {
                console.log("Items table created");
            }
            await insertItems();     
            return resolve();
        });
    });
}

async function insertItems()
{
    let doesItemsExsist = await doesDataExsit("items");
    if (doesItemsExsist) {
        console.log("Items data present.");
    }
    else {
        let insert = 'INSERT INTO items (item_id, category, name, price, brand_name, photo_url) VALUES (?,?,?,?,?,?)';
        let statement = db.prepare(insert);
        db.serialize(function(){
            statement.run([1, "Snowshoes", "mountain terrain", 17.00, "Atlas", "atlas.png"]);
            statement.run([2, "Snowshoes", "rolling terrain", 13.00, "komperdell", "komperdell.png"]);
            statement.run([3, "Snowshoes", "flat terrain", 6.00, "Tubbs", "tubs.png"]);
            statement.run([4, "Skis", "cross country", 7.00, "Fischer", "fischer.png"]);
            statement.run([5, "Skis", "downhill", 44.00, "Rossignol", "rossignol.png"]);
            statement.run([6, "Snow tube", "snow tube",15.00, "Sonic", "sonic.png"]);
            statement.run([7, "Bikes", "mountain",27.00, "Co-op_Cycles", "co-op_cycles.png"]);
            statement.run([8, "Bikes", "road",99.00, "Salsa", "salsaa.png"]);
            statement.run([9, "Bikes", "gravel",99.00, "Salsa", "salsab.png"]);
            statement.run([10, "Bikes", "recumbent", 299.00, "PERFORMER", "performer.png"]);
            statement.run([11, "Bikes", "tandem", 249.00, "Salsa", "salsac.png"]);
            statement.run([12, "Camping", "tent - 1 person", 33.00, "Big Agnes", "bigagnes.png"]);
            statement.run([13, "Camping", "tent - 2 person", 18.00, "TheNorthFace", "thenorthface.png"]);
            statement.run([14, "Camping", "tent - 3 person", 17.00, "Klymit", "klymit.png"]);
            statement.run([15, "Camping", "tent - 4 person", 18.00, "Eureka", "eureka.png"]);
            statement.run([16, "Camping", "tent - 6 person", 11.00, "Alpine Mountain Gear", "alpinemountaingear.png"]);
            statement.run([17, "Camping", "bear canister - S", 7.00, "BearVault", "bearvaulta.png"]);
            statement.run([18, "Camping", "bear canister - M", 8.00, "BearVault", "bearvaultb.png"]);
            statement.run([19, "Camping", "bear canister - L", 8.00, "BearVault", "bearvaultc.png"]);
            statement.run([20, "Camping", "bear canister - XL", 9.00, "BearVault", "bearvaultd.png"]);
            statement.run([21, "Camping", "daypack", 6.00, "Osprey", "osprey.png"]);
            statement.run([22, "Camping", "overnight pack", 8.00, "Co-op Traverse", "co-optraverse.png"]);
            statement.run([23, "Camping", "backpacking pack", 23.00, "Granite Gear", "granitegear.png"]);
            statement.run([24, "Water sports", "canoe", 99.00, "Old Town", "oldtown.png"]);
            statement.run([25, "Water sports", "kayak - single", 129.00, "EddyLine", "eddyline.png"]);
            statement.run([26, "Water sports", "kayak - tandem", 59.00, "TAHE", "tahe.png"]);
        });
        statement.finalize();
        console.log("Inserted items data.");
    }   
}

function createCustomersTable()
{
    return new Promise((resolve) => {
        db.run('CREATE TABLE customers( \
            customer_id	INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            email	TEXT,\
            password	TEXT\
        )', async (err) => {
            if (err) {
                console.log("Customers table already exists.");
            } else {
                console.log("Customers table created");
            }     
            await insertCustomers();
            return resolve();
        });
    });
}

async function insertCustomers()
{
    let doesCustomersExsist = await doesDataExsit("customers");
    if (doesCustomersExsist) {
        console.log("Customers data present.");
    }
    else {
        let insert = 'INSERT INTO customers (customer_id, email, password) VALUES (?,?,?)';
        let statement = db.prepare(insert);
        db.serialize(function(){            
            statement.run([1,"jtorkbob@sbcglobal.net", "$2b$10$UQ1bf7DkPfnpRQ0UfrkQy.M14eryR9nEcRwcj4.00bjdO0agYYxF2"]);
            statement.run([2,"pgolle@verizon.net", "$2b$10$sTEBpkVogvyc1Lmu9ZqhtuDuCqj6vE9yHN1gYbf2pWi/MIVLpOI3K"]);
            statement.run([3, "stevelim@yahoo.ca", "$2b$10$G8KsCjN..caJ1xmP/m69TuXmdDk0ac9n1mzql/IWvd80epSwM1sP2"]);
            statement.run([4, "parents@yahoo.com", "$2b$10$T0H5SnB4eNseP0qVNRmlvOSSlg/4P4/xuFlTnoIbcaNVhj8pS4KYq"]);
            statement.run([5, "steve@outlook.com",  "$2b$10$l8qU00gQSayO22e/3Xj8HufPTdSWKQBODW9wfh.iRTRzkT.JqmJwK"]);
            statement.run([6, "dexter@hotmail.com", "$2b$10$SGhLkkygMqfEk/jT1IeXtuCQbr8L5z0QKxdrujK7SvEu5k5pUzFha"]);
            statement.run([7, "noticias@verizon.net", "$2b$10$s/FvlGAUEvkTOTGsC6PlmOx/i4KCojrCaw23jfHRFvD8shuPOVbI2"]);
            statement.run([8, "world@gmail.com", "$2b$10$Bb0xTtYRPwGITRK0Agbnk.fQSMeE/gHC59Zx8LhDGshTP6z1BhX2W"]);
            statement.run([9, "gravyface@optonline.net", "$2b$10$UKwRRM7NTt/szlzL2Dr2BOZB8rVMNmwR9mM.QC3hWj617g9tyiUX6"]);
            statement.run([10, "pemungkah@me.com", "$2b$10$UXfoGHsVDTpNWcutvNDWg.bbH2yTqFO2bE09Jx6hQiNtaiYWKtJW2"]);
            statement.run([11, "denton@outlook.com", "$2b$10$t8xf1uyfNmSOH9rfuaBvPelqCJF1S2RHdjR1L8a2rQOJVArv8JpTa"]);
            statement.run([12, "dimensio@icloud.com", "$2b$10$wSvwCF7JqcorzaMQF3s12eVlbabP09nrX.u9SaIbqmZzn4OaZxDzy"]);
            statement.run([13, "floxy@att.net", "$2b$10$cOCjFtyObKPMWcYepjqcR.fsZKB51H14Xan/CkLhpmwc8x0GypfTS"]);
            statement.run([14, "tedrlord@yahoo.com",  "$2b$10$Es.yNCNq1L0y1eKHmTDj4OWbc2fR2i08l4t7oTpd7EjKbKNJIJwUe"]);
            statement.run([15, "glenz@aol.com", "$2b$10$sh4TcdHLbsc/yY7YqD9uD.UPDCai9YnwSBdhmm6nLkGsux5KwclH6"]);
            statement.run([16, "scotfl@live.com", "$2b$10$Iz.9lMw8Z8Vwiw/NFmUIrO1z6fbEP727kuL.gvrv2.0ITtizvedkC"]);
            statement.run([17, "smpeters@live.com", "$2b$10$cE31HbE2ypmC83gJeR.8YOZUU9HiseCKWeponqWe.Eop4Jx0vfyvW"]);
            statement.run([18, "jginspace@optonline.net", "$2b$10$hft9G3Djga5iPnJ/L5YbEe5k6ySPlw9ODIN.Qd/dcDFuOFE4JuZIO"]);
            statement.run([19, "marcs@att.net", "$2b$10$Vl0RjOGTpMNg0COxk0Nuk./rIkTKcMDGGIDuZkBSQjHqrQDGKmSkO"]);
            statement.run([20, "parkes@icloud", "$2b$10$kMejYo26foxxekOGO2nSouhzqhqCT158IlEanjvv7sActWN/.NCNK"]);
            statement.run([21, "msroth@optonline.net", "$2b$10$QLSNkcH6a7VAqaRKAAUk1uuwAsReEMQ4UkU5b/JOTDDRGdbAfAQeC"]);
            statement.run([22, "miyop@att.net", "$2b$10$XZ3fKHL3RcguaGvqsU/6lePcFpMfXYN6cDI5tv/V9L3.Uz5ePr8Rq"]);
            statement.run([23, "mkearl@comcast.net", "$2b$10$6URt.SpVKOn7tkmEPNvOHOT4j3flPdAOQKTX3d1QhBwnzMGY5Idjq"]);
            statement.run([24, "sagal@verzion.net", "$2b$10$qNYJbC31p1ygvk59w2yXTepoLIvazy.XibN5240dkydIUGYBGHLN."]);
            statement.run([25, "jaarnial@hotmail.com", "$2b$10$j558xYBRy7MrswHDDSg3yeFJ67E2Sgt1MThFEN92Ij/zIstX8F0Yy"]);
            statement.run([26, "padme@att.net", "$2b$10$CqAvqFG.FKHn2sjLbBsZIeGXykplfHFqF03wiwJOhbz8i0TDTI3US"]);
            statement.run([27,"test@test.local", "$2b$10$mHyxY0311BFe71j/jb3pN.nCgZwgBSpk0JCLGrwP2KHnhbwaeUDV2"]);
        });
        statement.finalize();
        console.log("Inserted customers data.");
    }
}

function createTransactionsTable()
{
    return new Promise((resolve) => {
        db.run('CREATE TABLE transactions (\
            transaction_id	INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            customer_id	INTEGER NOT NULL,\
            item_id	INTEGER NOT NULL,\
            checkout DATE,\
            checkin	DATE,\
	        FOREIGN KEY("item_id") REFERENCES "items"("item_id"),\
            FOREIGN KEY("customer_id") REFERENCES "customers"("customer_id")\
        )', async (err) => {
            if (err) {
                console.log("Transactions table already exists.");
            } else {
                console.log("Transactions table created");
            }     
            await insertTransactions();
            return resolve();
        });
    });
}

async function insertTransactions()
{
    let doesTransactionsExsist = await doesDataExsit("transactions");
    if (doesTransactionsExsist) {
        console.log("Transactions data present.");
    }
    else {
        let insert = 'INSERT INTO transactions (transaction_id, customer_id, item_id, checkout, checkin) VALUES (?,?,?,?,?)';
        let statement = db.prepare(insert);
        db.serialize(function(){            
            statement.run([1, 1, 15, "2021-02-07", "2022-02-20"]);
            statement.run([2, 1, 7, "2021-02-07", "2022-01-25"]);
            statement.run([3, 3, 21,  "2021-03-10", "2023-04-02"]);
            statement.run([4, 16, 25, "2021-01-25", "2023-07-06"]);
            statement.run([5, 5, 26,  "2021-02-05", "2022-04-02"]);
            statement.run([6, 10, 9, "2021-01-10", "2023-06-10"]);
            statement.run([7, 7, 5, "2021-05-05", "2023-07-02"]);
            statement.run([8, 18, 13, "2021-01-05","2023-08-11"]);
            statement.run([9, 25, 10, "2021-02-05", "2023-05-19"]);
            statement.run([10, 25, 11, "2021-02-05", "2023-10-08"]);
            statement.run([11, 24, 6, "2021-02-05", "2023-04-02"]);
            statement.run([12, 19, 23, "2021-02-01", "2023-05-01"]);
            statement.run([13, 15, 8, "2021-01-11", "2023-03-09"]);
            statement.run([14, 13, 12, "2021-02-21", "2022-04-23"]);
            statement.run([15, 20, 14, "2021-01-05", "2022-04-04"]);
            statement.run([16, 21, 16, "2021-02-09", "2023-04-06"]);
            statement.run([17, 22, 17, "2021-02-03", "2023-04-01"]);
            statement.run([18, 23, 6, "2021-02-03", "2022-04-01"]);
            statement.run([19, 6, 20, "2021-02-05", "2022-04-02"]);
            statement.run([20, 8, 1, "2021-02-05", "2022-04-02"]);
            statement.run([21, 9, 22, "2022-01-02", "2023-02-05"]);
            statement.run([22, 11, 2, "2021-02-01", "2022-04-03"]);
            statement.run([23, 4, 24, "2022-09-02", "2023-08-05"]);
            statement.run([24, 12, 3, "2022-01-02", "2023-02-05"]);
            statement.run([25, 14, 19, "2022-01-09", "2023-02-05"]);
            statement.run([26, 13, 18, "2022-01-08", "2023-02-05"]);
        });
        statement.finalize();
        console.log("Inserted transactions data.");
    }
}

function createFeedbackTable()
{
    return new Promise((resolve) => {
        db.run('CREATE TABLE feedback (\
            feedback_id	INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            customer_id	INTEGER NOT NULL,\
            item_id	INTEGER NOT NULL,\
            comments TEXT,\
            rating_review	INTEGER,\
	        FOREIGN KEY("item_id") REFERENCES "items"("item_id"),\
            FOREIGN KEY("customer_id") REFERENCES "customers"("customer_id")\
        )', async (err) => {
            if (err) {
                console.log("Feedback table already exists.");
            } else {
                console.log("Feedback table created");
            }     
            await insertFeedback();
            return resolve();
        });
    });
}

async function insertFeedback()
{
    let doesFeedbackExsist = await doesDataExsit("feedback");
    if (doesFeedbackExsist) {
        console.log("Feedback data present.");
    }
    else {
        let insert = 'INSERT INTO feedback (feedback_id, customer_id, item_id, comments, rating_review) VALUES (?,?,?,?,?)';
        let statement = db.prepare(insert);
        db.serialize(function(){            
            statement.run([1, 1, 15, "Snowshoes fit me well.", 5]);
            statement.run([2, 1, 7, "Bike gears are not working properly", 1]);
            statement.run([3, 3, 21,  "I like the product. I have nothing to add.", 4]);
            statement.run([4, 16, 25, "I like the product. I have nothing to add.", 5 ]);
            statement.run([5, 5, 26,  "I like the product. I have nothing to add.", 5]);
            statement.run([6, 10, 9, "I like the product. I have nothing to add.", 5]);
            statement.run([7, 7, 5, "I like the product. I have nothing to add.", 5]);
            statement.run([8, 18, 13, "I like the product. I have nothing to add.", 4]);
            statement.run([9, 25, 10, "I like the product. I have nothing to add.", 4]);
            statement.run([10, 25, 11, "I like the product. I have nothing to add.", 4]);
            statement.run([11, 24, 6, "I like the product. I have nothing to add.", 5]);
            statement.run([12, 19, 23, "I like the product. I have nothing to add.", 5]);
            statement.run([13, 15, 8, "Road bike is great!", 4]);
            statement.run([14, 13, 12, "The  tent is easy to set up!", 5]);
            statement.run([15, 20, 14,"The  tent is easy to set up!", 5]);
            statement.run([16, 21, 16, "The  tent is easy to set up!", 4]);
            statement.run([17, 22, 17, "The bear canister is too small", 2]);
            statement.run([18, 23, 6, "I like the product. I have nothing to add.", 5]);
            statement.run([19, 6, 20, "I like the product . I have nothing to add.", 4]);
            statement.run([20, 8, 1, "I like the product. I have nothing to add.", 4]);
            statement.run([21, 9, 22, "I like the product. I have nothing to add.", 4]);
            statement.run([22, 11, 2, "Snowshoes are too loose for me ", 2]);
            statement.run([23, 4, 24,"I like the product. I have nothing to add", 5]);
            statement.run([24, 12, 3, "I like the product. I have nothing to add.", 4]);
            statement.run([25, 14, 19,"I like the product. I have nothing to add.", 5]);
            statement.run([26, 13, 18, "I like the product. I have nothing to add.", 4]);
        });
        statement.finalize();
        console.log("Inserted feedback data.");
    }
}

function doesDataExsit(tableName) {
    return new Promise((resolve, reject) => {
        let selectQuery = 'SELECT * FROM ' + tableName;
        db.all(selectQuery, [], (err, rows) => {
            if (err) {
                console.log("Unable to check data from items table.")
                console.log(err);
                return reject(err);
            }
            if (rows.length > 0)
            {
                return resolve(true);
            }
            else{
                return resolve(false);
            }
        });
    });
}

