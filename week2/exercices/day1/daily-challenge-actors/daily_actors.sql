CREATE TABLE actors(
 actor_id SERIAL PRIMARY KEY,
 first_name VARCHAR (50) NOT NULL,
 last_name VARCHAR (100) NOT NULL,
 age DATE NOT NULL,
 number_oscars SMALLINT NOT NULL
);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('Matt','Damon','08/10/1970', 5);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES('George','Clooney','06/05/1961', 2);

-- Add two more female actors in the table actors. Add them one by one
INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES ('Meryl', 'Streep', '22/06/1949', 3);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES ('Scarlett', 'Johansson', '22/11/1984', 1);

-- Add three more actors, add all of them in one query !
INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES 
('Leonardo', 'DiCaprio', '11/11/1974', 1),
('Natalie', 'Portman', '09/06/1981', 1),
('Brad', 'Pitt', '18/12/1963', 2);

SELECT count(*) FROM actors;

SELECT * FROM actors;


