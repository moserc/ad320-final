/* 
    Team Teal: Andrew Cook, Cheryl Moser, Petar Spasic
    Date: 2023-12-03
    AD320 Final Project
*/

module.exports = function(db) { 
    createItemsTable(db);   
    createCustomersTable(db); 
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

function createCustomersTable(db)
{
    db.run('CREATE TABLE customers( \
        customer_id	INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
        email	TEXT,\
        password	TEXT\
    )', (err) => {
        if (err) {
            console.log("Customers table already exists.");
        } else {
            console.log("Customers table created");
        }     
        insertCustomers(db);
    });
}

function insertCustomers(db)
{
    db.all('SELECT * FROM customers', [], (err, rows) => {
        if (err) {
            console.log("Unable to check data from customers table.")
            console.log(err);
            return;
        }
        if (rows.length > 0)
        {
            console.log("Customers data present.");
        }
        else{
            let insert = 'INSERT INTO customers (customer_id, email, password) VALUES (?,?,?)';
            db.run(insert, [1,"jtorkbob@sbcglobal.net", "$2b$10$UQ1bf7DkPfnpRQ0UfrkQy.M14eryR9nEcRwcj4.00bjdO0agYYxF2"]);
            db.run(insert, [2,"pgolle@verizon.net", "$2b$10$sTEBpkVogvyc1Lmu9ZqhtuDuCqj6vE9yHN1gYbf2pWi/MIVLpOI3K"]);
            db.run(insert, [3, "stevelim@yahoo.ca", "$2b$10$G8KsCjN..caJ1xmP/m69TuXmdDk0ac9n1mzql/IWvd80epSwM1sP2"]);
            db.run(insert, [4, "parents@yahoo.com", "$2b$10$T0H5SnB4eNseP0qVNRmlvOSSlg/4P4/xuFlTnoIbcaNVhj8pS4KYq"]);
            db.run(insert, [5, "steve@outlook.com",  "$2b$10$l8qU00gQSayO22e/3Xj8HufPTdSWKQBODW9wfh.iRTRzkT.JqmJwK"]);
            db.run(insert, [6, "dexter@hotmail.com", "$2b$10$SGhLkkygMqfEk/jT1IeXtuCQbr8L5z0QKxdrujK7SvEu5k5pUzFha"]);
            db.run(insert, [7, "noticias@verizon.net", "$2b$10$s/FvlGAUEvkTOTGsC6PlmOx/i4KCojrCaw23jfHRFvD8shuPOVbI2"]);
            db.run(insert, [8, "world@gmail.com", "$2b$10$Bb0xTtYRPwGITRK0Agbnk.fQSMeE/gHC59Zx8LhDGshTP6z1BhX2W"]);
            db.run(insert, [9, "gravyface@optonline.net", "$2b$10$UKwRRM7NTt/szlzL2Dr2BOZB8rVMNmwR9mM.QC3hWj617g9tyiUX6"]);
            db.run(insert, [10, "pemungkah@me.com", "$2b$10$UXfoGHsVDTpNWcutvNDWg.bbH2yTqFO2bE09Jx6hQiNtaiYWKtJW2"]);
            db.run(insert, [11, "denton@outlook.com", "$2b$10$t8xf1uyfNmSOH9rfuaBvPelqCJF1S2RHdjR1L8a2rQOJVArv8JpTa"]);
            db.run(insert, [12, "dimensio@icloud.com", "$2b$10$wSvwCF7JqcorzaMQF3s12eVlbabP09nrX.u9SaIbqmZzn4OaZxDzy"]);
            db.run(insert, [13, "floxy@att.net", "$2b$10$cOCjFtyObKPMWcYepjqcR.fsZKB51H14Xan/CkLhpmwc8x0GypfTS"]);
            db.run(insert, [14, "tedrlord@yahoo.com",  "$2b$10$Es.yNCNq1L0y1eKHmTDj4OWbc2fR2i08l4t7oTpd7EjKbKNJIJwUe"]);
            db.run(insert, [15, "glenz@aol.com", "$2b$10$sh4TcdHLbsc/yY7YqD9uD.UPDCai9YnwSBdhmm6nLkGsux5KwclH6"]);
            db.run(insert, [16, "scotfl@live.com", "$2b$10$Iz.9lMw8Z8Vwiw/NFmUIrO1z6fbEP727kuL.gvrv2.0ITtizvedkC"]);
            db.run(insert, [17, "smpeters@live.com", "$2b$10$cE31HbE2ypmC83gJeR.8YOZUU9HiseCKWeponqWe.Eop4Jx0vfyvW"]);
            db.run(insert, [18, "jginspace@optonline.net", "$2b$10$hft9G3Djga5iPnJ/L5YbEe5k6ySPlw9ODIN.Qd/dcDFuOFE4JuZIO"]);
            db.run(insert, [19, "marcs@att.net", "$2b$10$Vl0RjOGTpMNg0COxk0Nuk./rIkTKcMDGGIDuZkBSQjHqrQDGKmSkO"]);
            db.run(insert, [20, "parkes@icloud", "$2b$10$kMejYo26foxxekOGO2nSouhzqhqCT158IlEanjvv7sActWN/.NCNK"]);
            db.run(insert, [21, "msroth@optonline.net", "$2b$10$QLSNkcH6a7VAqaRKAAUk1uuwAsReEMQ4UkU5b/JOTDDRGdbAfAQeC"]);
            db.run(insert, [22, "miyop@att.net", "$2b$10$XZ3fKHL3RcguaGvqsU/6lePcFpMfXYN6cDI5tv/V9L3.Uz5ePr8Rq"]);
            db.run(insert, [23, "mkearl@comcast.net", "$2b$10$6URt.SpVKOn7tkmEPNvOHOT4j3flPdAOQKTX3d1QhBwnzMGY5Idjq"]);
            db.run(insert, [24, "sagal@verzion.net", "$2b$10$qNYJbC31p1ygvk59w2yXTepoLIvazy.XibN5240dkydIUGYBGHLN."]);
            db.run(insert, [25, "jaarnial@hotmail.com", "$2b$10$j558xYBRy7MrswHDDSg3yeFJ67E2Sgt1MThFEN92Ij/zIstX8F0Yy"]);
            db.run(insert, [26, "padme@att.net", "$2b$10$CqAvqFG.FKHn2sjLbBsZIeGXykplfHFqF03wiwJOhbz8i0TDTI3US"]);
            db.run(insert, [27,"test@test.local", "$2b$10$mHyxY0311BFe71j/jb3pN.nCgZwgBSpk0JCLGrwP2KHnhbwaeUDV2"]);
            console.log("Inserted customers data.");
        }
    });     
}

