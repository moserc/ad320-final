/* 
    Team Teal: Andrew Cook, Cheryl Moser, Petar Spasic
    Date:
    AD320 Final Project
*/
CREATE TABLE "items" (
	"item_id"	INTEGER NOT NULL UNIQUE,
	"category"	TEXT,
	"name"	TEXT,
	"price"	REAL,
	"brand_name"	TEXT,
	"photo_url"	TEXT,
	"rating_review"	TEXT,
	PRIMARY KEY("item_id" AUTOINCREMENT)
);

INSERT INTO items 
(category, name, price, brand_name, photo_url, rating_review)
VALUES
("Snowshoes","mountain terrain",179.95, "Atlas", "Atlas.PNG", "5.0"),
("Snowshoes","rolling terrain",136.73, "Komperdell", "Komperdell.PNG", "1.0"),
("Snowshoes","flat terrain",69.95, "Tubbs", "Tubs.PNG", "4.0"),
("Skis","cross country",70.93, "Fischer", "Fischer.PNG", "5.0"),
("Skis","downhill",449.95, "Rossignol", "Rossignol.PNG", "5.0"),
("Snow tube","snow tube",159.00, "Sonic", "Sonic.PNG", "4.5"),
("Bikes","mountain",279.29, "Co-op_Cycles", "Co-op_Cycles.PNG", "4.5"),
("Bikes","road",999.00, "Salsa", "SalsaA.PNG", "4.2"),
("Bikes","gravel",999.00, "Salsa", "SalsaB.PNG", "4.0"),
("Bikes","recumbent",2995.00, "Schwinn", "Schwinn.PNG", "4.5"),
("Bikes","tandem",2499.99, "Salsa", "SalsaC.PNG", "4.5"),
("Camping","tent - 1 person",337.39, "Big Agnes", "BigAgnes.PNG", "4.1"),
("Camping","tent - 2 person",185.00, "TheNorthFace", "TheNorthFace.PNG", "4.5"),
("Camping","tent - 3 person",179.73, "Klymit", "Klymit.PNG", "5.0"),
("Camping","tent - 4 person",188.89, "Eureka", "Eureka.PNG", "4.0"),
("Camping","tent - 6 person",117.73, "Alpine Mountain Gear", "AlpineMountainGear.PNG", "4.0"),
("Camping","bear canister - S",76.95, "BearVault", "BearVaultA.PNG", "4.2"),
("Camping","bear canister - M",83.95, "BearVault", "BearVaultB.PNG", "4.0"),
("Camping","bear canister - L",89.95, "BearVault", "BearVaultC.PNG", "4.5"),
("Camping","bear canister - XL",94.95, "BearVault", "BearVaultD.PNG", "4.0"),
("Camping","daypack",65.00, "Osprey", "Osprey.PNG", "4.6"),
("Camping","overnight pack",83.39, "Co-op Traverse", "Co-opTraverse.PNG", "4.5"),
("Camping","backpacking pack",239.95, "Granite Gear", "GraniteGear.PNG", "4.5"),
("Water sports","canoe",999.95, "Old Town", "OldTown.PNG", "4.0"),
("Water sports","kayak - single",1299.00, "EddyLine", "EddyLine.PNG", "4.5"),
("Water sports","kayak - tandem",599.95, "TAHE", "TAHE.PNG", "4.0");

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
(546, 41, "2021-02-07", "2022-02-20"),
(546, 33, "2021-02-07", "2022-01-25"),
(548, 47,  "2021-03-10", "2023-04-02"),
(561, 51, "2021-01-25", "2023-07-06"),
(550, 52,  "2021-02-05", "2022-04-02"),
(555, 35, "2021-01-10", "2023-06-10"),
(552, 31, "2021-05-05", "2023-07-02"),
(563, 39, "2021-01-05","2023-08-11"),
(570, 36, "2021-02-05", "2023-05-19"),
(570, 37, "2021-02-05", "2023-10-08"),
(569, 32, "2021-02-05", "2023-04-02"),
(564, 49, "2021-02-01", "2023-05-01"),
(560, 34, "2021-01-11", "2023-03-09"),
(558, 38, "2021-02-21", "2022-04-23"),
(565, 40, "2021-01-05", "2022-04-04"),
(566, 42, "2021-02-09", "2023-04-06"),
(567, 43, "2021-02-03", "2023-04-01"),
(568, 32, "2021-02-03", "2022-04-01"),
(551, 46, "2021-02-05", "2022-04-02"),
(553, 27, "2021-02-05", "2022-04-02"),
(554, 48, "2022-01-02", "2023-02-05"),
(556, 28, "2021-02-01", "2022-04-03"),
(549, 50, "2022-09-02", "2023-08-05"),
(557, 29, "2022-01-02", "2023-02-05"),
(559, 45, "2022-01-09", "2023-02-05"),
(558, 44, "2022-01-08", "2023-02-05");

CREATE TABLE "feedback" (
	"feedback_id"	INTEGER NOT NULL UNIQUE,
	"customer_id"	INTEGER NOT NULL,
	"item_id"	INTEGER NOT NULL,
	"comments"	TEXT,
	PRIMARY KEY("feedback_id" AUTOINCREMENT),
	FOREIGN KEY("customer_id") REFERENCES "customers"("customer_id"),
	FOREIGN KEY("item_id") REFERENCES "items"("item_id")
);

INSERT INTO feedback
(customer_id, item_id, comments)
VALUES
(546, 41, "Snowshoes fit me well."),
(546, 33, "I like the product. I have nothing to add."),
(548, 47,  "I like the product. I have nothing to add."),
(561, 51, "I like the product. I have nothing to add."),
(550, 52,  "I like the product. I have nothing to add."),
(555, 35, "I like the product. I have nothing to add."),
(552, 31, "I like the product. I have nothing to add."),
(563, 39, "I like the product. I have nothing to add."),
(570, 36, "I like the product. I have nothing to add."),
(570, 37, "I like the product. I have nothing to add."),
(569, 32, "I like the product. I have nothing to add."),
(564, 49, "I like the product. I have nothing to add."),
(560, 34, "Road bike is great!"),
(558, 38, "The  tent is easy to set up!"),
(565, 40,"The  tent is easy to set up!"),
(566, 42, "The  tent is easy to set up!"),
(567, 43, "The bear canister is too small"),
(568, 32, "I like the product. I have nothing to add."),
(551, 46, "I like the product . I have nothing to add."),
(553, 27, "I like the product. I have nothing to add."),
(554, 48, "I like the product. I have nothing to add."),
(556, 28, "Snowshoes are too loose for me "),
(549, 50, "I like the product. I have nothing to add"),
(557, 29, "I like the product. I have nothing to add."),
(559, 45,"I like the product. I have nothing to add."),
(558, 44, "I like the product. I have nothing to add.");
