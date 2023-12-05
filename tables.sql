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