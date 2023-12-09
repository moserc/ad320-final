/* 
    Team Teal: Andrew Cook, Cheryl Moser, Petar Spasic
    Date: 12/09/2023
    AD320 Final Project
*/
CREATE TABLE "items" (
	"item_id"	INTEGER NOT NULL UNIQUE,
	"category"	TEXT,
	"name"	TEXT,
	"price"	REAL,
	"brand_name"	TEXT,
	"photo_url"	TEXT,
	PRIMARY KEY("item_id" AUTOINCREMENT)
);

INSERT INTO items 
(category, name, price, brand_name, photo_url)
VALUES
("Snowshoes","mountain terrain",17.00, "Atlas", "atlas.png"),
("Snowshoes","rolling terrain",13.00, "komperdell", "komperdell.png"),
("Snowshoes","flat terrain",6.00, "Tubbs", "tubs.png"),
("Skis","cross country",7.00, "Fischer", "fischer.png"),
("Skis","downhill",44.00, "Rossignol", "rossignol.png"),
("Snow tube","snow tube",15.00, "Sonic", "sonic.png"),
("Bikes","mountain",27.00, "Co-op_Cycles", "co-op_cycles.png"),
("Bikes","road",99.00, "Salsa", "salsaa.png"),
("Bikes","gravel",99.00, "Salsa", "salsab.png"),
("Bikes","recumbent",299.00, "PERFORMER", "performer.png"),
("Bikes","tandem",249.00, "Salsa", "salsac.png"),
("Camping","tent - 1 person",33.00, "Big Agnes", "bigagnes.png"),
("Camping","tent - 2 person",18.00, "TheNorthFace", "thenorthface.png"),
("Camping","tent - 3 person",17.00, "Klymit", "klymit.png"),
("Camping","tent - 4 person",18.00, "Eureka", "eureka.png"),
("Camping","tent - 6 person",11.00, "Alpine Mountain Gear", "alpinemountaingear.png"),
("Camping","bear canister - S",7.00, "BearVault", "bearvaulta.png"),
("Camping","bear canister - M",8.00, "BearVault", "bearvaultb.png"),
("Camping","bear canister - L",8.00, "BearVault", "bearvaultc.png"),
("Camping","bear canister - XL",9.00, "BearVault", "bearvaultd.png"),
("Camping","daypack",6.00, "Osprey", "osprey.png"),
("Camping","overnight pack",8.00, "Co-op Traverse", "co-optraverse.png"),
("Camping","backpacking pack",23.00, "Granite Gear", "granitegear.png"),
("Water sports","canoe",99.00, "Old Town", "oldtown.png"),
("Water sports","kayak - single",129.00, "EddyLine", "eddyline.png"),
("Water sports","kayak - tandem",59.00, "TAHE", "tahe.png");

CREATE TABLE "customers" (
	"customer_id"	INTEGER NOT NULL UNIQUE,
	"email"	TEXT,
	"username"	TEXT,
	PRIMARY KEY("customer_id" AUTOINCREMENT)
);

INSERT INTO customers
(email, username)
VALUES
("jtorkbob@sbcglobal.net", "jtorkbob"),
("pgolle@verizon.net", "pgolle"),
("stevelim@yahoo.ca", "stevelim"),
("parents@yahoo.com", "parents"),
("steve@outlook.com",  "steve"),
("dexter@hotmail", "dexter"),
("noticias@verizon.net", "noticias"),
("world@gmail.com", "world"), 
("gravyface@optonline.net", "gravyface"),
("pemungkah@me.com", "pemungah"),
("denton@outlook.com", "denton"),
("dimensio@icloud.com", "dimensio"),
("floxy@att.net", "floxy"),
("tedrlord@yahoo.com",  "tedrlord"),
("glenz@aol.com", "glenz"),
("scotfl@live.com", "scotfl"),
("smpeters@live.com", "smpeters"),
("jginspace@optonline.net", "jginspace"),
("marcs@att.net", "marcs"),
("parkes@icloud", "parkes"),
("msroth@optonline.net", "msroth"),
("miyop@att.net", "miyop"),
("mkearl@comcast.net", "mkearl"),
("sagal@verzion.net", "sagal"),
("jaarnial@hotmail.com", "jaarnial"),
("padme@att.net", "padme");

CREATE TABLE "transactions" (
	"transaction_id"	INTEGER NOT NULL UNIQUE,
	"customer_id"	INTEGER NOT NULL,
	"item_id"	INTEGER NOT NULL,
	"checkout"	TEXT,
	"checkin"	TEXT,
	PRIMARY KEY("transaction_id" AUTOINCREMENT),
	FOREIGN KEY("item_id") REFERENCES "items"("item_id"),
	FOREIGN KEY("customer_id") REFERENCES "customers"("customer_id")
);

INSERT INTO transactions
(customer_id, item_id, checkout, checkin)
VALUES 
(1, 15, "2021-02-07", "2022-02-20"),
(1, 7, "2021-02-07", "2022-01-25"),
(3, 21,  "2021-03-10", "2023-04-02"),
(16, 25, "2021-01-25", "2023-07-06"),
(5, 26,  "2021-02-05", "2022-04-02"),
(10, 9, "2021-01-10", "2023-06-10"),
(7, 5, "2021-05-05", "2023-07-02"),
(18, 13, "2021-01-05","2023-08-11"),
(25, 10, "2021-02-05", "2023-05-19"),
(25, 11, "2021-02-05", "2023-10-08"),
(24, 6, "2021-02-05", "2023-04-02"),
(19, 23, "2021-02-01", "2023-05-01"),
(15, 8, "2021-01-11", "2023-03-09"),
(13, 12, "2021-02-21", "2022-04-23"),
(20, 14, "2021-01-05", "2022-04-04"),
(21, 16, "2021-02-09", "2023-04-06"),
(22, 17, "2021-02-03", "2023-04-01"),
(23, 6, "2021-02-03", "2022-04-01"),
(6, 20, "2021-02-05", "2022-04-02"),
(8, 1, "2021-02-05", "2022-04-02"),
(9, 22, "2022-01-02", "2023-02-05"),
(11, 2, "2021-02-01", "2022-04-03"),
(4, 24, "2022-09-02", "2023-08-05"),
(12, 3, "2022-01-02", "2023-02-05"),
(14, 19, "2022-01-09", "2023-02-05"),
(13, 18, "2022-01-08", "2023-02-05");

CREATE TABLE "feedback" (
	"feedback_id"	INTEGER NOT NULL UNIQUE,
	"customer_id"	INTEGER NOT NULL,
	"item_id"	INTEGER NOT NULL,
	"comments"	TEXT,
	"rating_review"	INTEGER,
	PRIMARY KEY("feedback_id" AUTOINCREMENT),
	FOREIGN KEY("customer_id") REFERENCES "customers"("customer_id"),
	FOREIGN KEY("item_id") REFERENCES "items"("item_id")
);

INSERT INTO feedback
(customer_id, item_id, comments, rating_review)
VALUES
(1, 15, "Snowshoes fit me well.", 5), 
(1, 7, "Bike gears are not working properly", 1),
(3, 21,  "I like the product. I have nothing to add.", 4),
(16, 25, "I like the product. I have nothing to add.", 5 ),
(5, 26,  "I like the product. I have nothing to add.", 5),
(10, 9, "I like the product. I have nothing to add.", 5),
(7, 5, "I like the product. I have nothing to add.", 5),
(18, 13, "I like the product. I have nothing to add.", 4),
(25, 10, "I like the product. I have nothing to add.", 4),
(25, 11, "I like the product. I have nothing to add.", 4),
(24, 6, "I like the product. I have nothing to add.", 5),
(19, 23, "I like the product. I have nothing to add.", 5),
(15, 8, "Road bike is great!", 4),
(13, 12, "The  tent is easy to set up!", 5),
(20, 14,"The  tent is easy to set up!", 5),
(21, 16, "The  tent is easy to set up!", 4),
(22, 17, "The bear canister is too small", 2),
(23, 6, "I like the product. I have nothing to add.", 5),
(6, 20, "I like the product . I have nothing to add.", 4),
(8, 1, "I like the product. I have nothing to add.", 4),
(9, 22, "I like the product. I have nothing to add.", 4),
(11, 2, "Snowshoes are too loose for me ", 2),
(4, 24,"I like the product. I have nothing to add", 5),
(12, 3, "I like the product. I have nothing to add.", 4),
(14, 19,"I like the product. I have nothing to add.", 5),
(13, 18, "I like the product. I have nothing to add.", 4);


SELECT * 
FROM items;

UNION

SELECT AVG(rating_review)
FROM feedback;
