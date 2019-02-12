DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Silver Cuff Bracelet", "Jewelry", 24.99, 34),
  ("Onyx Stud Earrings", "Jewelry", 19.99, 76),
  ("Copper Wrapped Amethyst Necklace", "Jewelry", 34.99, 28),
  ("15 lb Kettlebell", "Fitness", 23.99, 27),
  ("Premium Yoga Mat", "Fitness", 29.99, 85),
  ("Coffee Grinder", "Kitchen", 14.99, 176),
  ("Silicone Baking Mats", "Kitchen", 9.99, 97),
  ("Digital Food Scales", "Kitchen", 12.99, 58),
  ("Waterproof Bluetooth Speaker", "Electronics", 18.99, 32),
  ("Glass Screen Protector", "Electronics", 8.99, 87);

SELECT * FROM products;