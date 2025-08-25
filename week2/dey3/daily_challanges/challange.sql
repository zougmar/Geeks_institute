-- PARTIE 1

-- Create 2 tables 
CREATE TABLE Customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE CustomerProfile (
    id SERIAL PRIMARY KEY,
    isLoggedIn BOOLEAN DEFAULT FALSE,
    customer_id INT UNIQUE REFERENCES Customer(id) ON DELETE CASCADE
);
-- Insert those customers

INSERT INTO Customer (first_name, last_name)
VALUES 
('John', 'Doe'),
('Jerome', 'Lalu'),
('Lea', 'Rive');

-- Insert those customer profiles, use subqueries

INSERT INTO CustomerProfile (isLoggedIn, customer_id)
VALUES 
(TRUE, (SELECT id FROM Customer WHERE first_name = 'John' AND last_name = 'Doe')),
(FALSE, (SELECT id FROM Customer WHERE first_name = 'Jerome' AND last_name = 'Lalu'));

-- The first_name of the LoggedIn customers
SELECT c.first_name
FROM Customer c
JOIN CustomerProfile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = TRUE;

-- All the customers first_name and isLoggedIn columns - even the customers those who don’t have a profile.
SELECT c.first_name, cp.isLoggedIn
FROM Customer c
LEFT JOIN CustomerProfile cp ON c.id = cp.customer_id;

-- The number of customers that are not LoggedIn
SELECT COUNT(*)
FROM Customer c
LEFT JOIN CustomerProfile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = FALSE OR cp.isLoggedIn IS NULL;
-- PARTIE 2
-- 1. Create Book table
CREATE TABLE Book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL
);
-- 2. Insert books
INSERT INTO Book (title, author)
VALUES 
('Alice In Wonderland', 'Lewis Carroll'),
('Harry Potter', 'J.K Rowling'),
('To kill a mockingbird', 'Harper Lee');

-- 3. Create Student table (with age check constraint)
CREATE TABLE Student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    age INT CHECK (age <= 15)
);
-- 4. Insert students

INSERT INTO Student (name, age)
VALUES
('John', 12),
('Lera', 11),
('Patrick', 10),
('Bob', 14);
-- 5. Create a table named Library

CREATE TABLE Library (
    book_fk_id INT REFERENCES Book(book_id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    student_fk_id INT REFERENCES Student(student_id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    borrowed_date DATE,
    PRIMARY KEY (book_fk_id, student_fk_id, borrowed_date)
);
--6. Add 4 records in the junction table, use subqueries.


INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date)
VALUES
((SELECT book_id FROM Book WHERE title = 'Alice In Wonderland'),
 (SELECT student_id FROM Student WHERE name = 'John'),
 '2022-02-15'),

((SELECT book_id FROM Book WHERE title = 'To kill a mockingbird'),
 (SELECT student_id FROM Student WHERE name = 'Bob'),
 '2021-03-03'),

((SELECT book_id FROM Book WHERE title = 'Alice In Wonderland'),
 (SELECT student_id FROM Student WHERE name = 'Lera'),
 '2021-05-23'),

((SELECT book_id FROM Book WHERE title = 'Harry Potter'),
 (SELECT student_id FROM Student WHERE name = 'Bob'),
 '2021-08-12');

-- 7. Display the data
-- Select all the columns from the junction table
SELECT * FROM Library;
-- Select the name of the student and the title of the borrowed books
SELECT s.name, b.title
FROM Library l
JOIN Student s ON l.student_fk_id = s.student_id
JOIN Book b ON l.book_fk_id = b.book_id;
-- Select the average age of the children, that borrowed the book Alice in Wonderland
SELECT AVG(s.age) AS avg_age
FROM Library l
JOIN Student s ON l.student_fk_id = s.student_id
JOIN Book b ON l.book_fk_id = b.book_id
WHERE b.title = 'Alice In Wonderland';

-- Delete a student from the Student table, what happened in the junction table ?
DELETE FROM Student WHERE name = 'Bob';
-- Because of ON DELETE CASCADE, Bob’s records in Library are automatically deleted.
