CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100),
    price NUMERIC(10,2)
);
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);
INSERT INTO customers (first_name, last_name) VALUES
('Greg', 'Jones'),
('Sandra', 'Jones'),
('Scott', 'Scott'),
('Trevor', 'Green'),
('Melanie', 'Johnson');

INSERT INTO items (item_name, price) VALUES
('Small Desk', 100),
('Large Desk', 300),
('Fan', 80);


--All the customers
SELECT * FROM customers; 	

--All the items.
SELECT * FROM items; 

--All the items with a price above 80 (80 not included).
SELECT * FROM items 
WHERE price > 80;

--All the items with a price below 300. (300 included)
SELECT * FROM items 
WHERE price < 300;

--All customers whose last name is ‘Smith’ (What will be your outcome?).
SELECT * FROM customers
WHERE last_name = 'Smith';

--All customers whose last name is ‘Jones’.
SELECT * FROM customers 
WHERE last_name = 'Jones';

--All customers whose firstname is not ‘Scott’.
SELECT * FROM customers
WHERE first_name <> 'Scott';

