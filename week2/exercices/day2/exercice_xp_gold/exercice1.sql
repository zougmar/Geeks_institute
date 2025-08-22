-- Find out how many films there are for each rating.
SELECT rating, COUNT(*) AS film_count
FROM film
GROUP BY rating
ORDER BY rating;
-- Get a list of all the movies that have a rating of G or PG-13.
SELECT title, rating
FROM film
WHERE rating IN ('G', 'PG-13')
ORDER BY title;
-- Filter this list further: look for only movies that are under 2 hours long, and whose rental price (rental_rate) is under 3.00. Sort the list 

SELECT title, rating, length, rental_rate
FROM film
WHERE rating IN ('G', 'PG-13')
  AND length < 120
  AND rental_rate < 3.00
ORDER BY title;

-- Find a customer in the customer table, and change his/her details to your details, using SQL UPDATE.

UPDATE customer
SET first_name = 'Omar',
    last_name = 'Zouglah',
    email = 'omar.zouglah@example.com',
    active = 1
WHERE customer_id = 1;

-- Now find the customer’s address, and use UPDATE to change the address to your address (or make one up).
SELECT * 
FROM address
WHERE address_id = (
    SELECT address_id 
    FROM customer
    WHERE customer_id = 1
);

UPDATE address
SET address = '123 Main Street',
    district = 'Casablanca',
    city_id = 1,
    postal_code = '20000',
    phone = '0612345678'
WHERE address_id = (
    SELECT address_id 
    FROM customer
    WHERE customer_id = 1
);




