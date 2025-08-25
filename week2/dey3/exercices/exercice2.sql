-- Example: Change the language of a few films to French
UPDATE film
SET language_id = (
    SELECT language_id FROM language WHERE name = 'French'
)
WHERE film_id IN (1, 2, 3);

-- Which foreign keys (references) are defined for the customer table? How does this affect the way in which we INSERT into the customer table?

When inserting a new customer, the store_id and address_id must already exist in their respective tables, otherwise the insert will fail.

-- We created a new table called customer_review. Drop this table. Is this an easy step, or does it need extra checking?
DROP TABLE customer_review;
-- Find out how many rentals are still outstanding (ie. have not been returned to the store yet).

SELECT COUNT(*) AS outstanding_rentals
FROM rental
WHERE return_date IS NULL;
-- Find the 30 most expensive movies which are outstanding (ie. have not been returned to the store yet)

SELECT f.title, f.replacement_cost
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL
ORDER BY f.replacement_cost DESC
LIMIT 30;

-- The 1st film : The film is about a sumo wrestler, and one of the actors is Penelope Monroe.

SELECT f.title
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE a.first_name = 'Penelope' AND a.last_name = 'Monroe'
  AND (f.title ILIKE '%sumo%' OR f.description ILIKE '%sumo%');

-- The 2nd film : A short documentary (less than 1 hour long), rated “R”.
SELECT title
FROM film
WHERE length < 60
  AND rating = 'R';
-- The 3rd fil

SELECT DISTINCT f.title
FROM rental r
JOIN payment p ON r.rental_id = p.rental_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan'
AND p.amount > 4.00
AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01';
-- The 4th film : His friend Matthew Mahan watched this film, as well. It had the word “boat” in the title or description, and it looked like it was a very expensive DVD to replace.



SELECT DISTINCT f.title, f.replacement_cost
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan'
  AND (f.title ILIKE '%boat%' OR f.description ILIKE '%boat%')
ORDER BY f.replacement_cost DESC
LIMIT 1;
