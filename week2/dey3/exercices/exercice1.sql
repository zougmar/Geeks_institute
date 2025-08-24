-- Get a list of all the languages, from the language table.
select * from language;
-- Get a list of all films joined with their languages – select the following details : film title, description, and language name.
select film.title, film.description, language.name 
from film
JOIN language ON film.language_id = language.language_id;

-- Get all languages, even if there are no films in those languages – select the following details : film title, description, and language name.
 select film.title, film.description, language.name
 from language
 left join film ON language.language_id = film.language_id;
--  Create a new table called new_film with the following columns : id, name. Add some new films to the table.
create table new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO new_film (name)
VALUES ('Inception'), ('Interstellar'), ('The Dark Knight');


select * from new_film;


CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,
    film_id INT NOT NULL,
    language_id INT NOT NULL,
    title VARCHAR(255),
    score INT CHECK (score BETWEEN 1 AND 10),
    review_text TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (film_id) REFERENCES new_film(id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES language(language_id)
);

-- Add 2 movie reviews. Make sure you link them to valid objects in the other tables.
INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES
(1, 1, 'Amazing Sci-Fi', 9, 'Inception is a mind-bending thriller.'),
(2, 1, 'Masterpiece', 10, 'Interstellar is visually stunning and emotional.');

-- Add 2 movie reviews. Make sure you link them to valid objects in the other tables.
INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES
(3, 1, 'Epic Conclusion', 9, 'The Dark Knight concludes the trilogy with a bang.'),
(1, 2, 'Unbelievable', 10, 'Inception is a cinematic masterpiece.');

-- Lorsque vous supprimez un film de la table new_film, toutes ses critiques associées dans 
-- la table customer_review sont également supprimées automatiquement .