-- Genres
CREATE TABLE IF NOT EXISTS genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Artists
CREATE TABLE IF NOT EXISTS artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Albums
CREATE TABLE IF NOT EXISTS albums (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    release_year INT,
    rating DECIMAL(2,1),
    genre_id INT REFERENCES genres(id) ON DELETE SET NULL
);

-- Join table between albums and artists
CREATE TABLE IF NOT EXISTS albums_artists (
    album_id INT REFERENCES albums(id) ON DELETE CASCADE,
    artist_id INT REFERENCES artists(id) ON DELETE CASCADE,
    PRIMARY KEY (album_id, artist_id)
);

INSERT INTO genres (name) VALUES ('Rock'), ('Jazz'), ('Pop')
ON CONFLICT DO NOTHING;

INSERT INTO artists (name) VALUES ('Artist A'), ('Artist B')
ON CONFLICT DO NOTHING;

INSERT INTO albums (title, description, release_year, rating, genre_id)
VALUES
('My First Album', 'Debut release description', 2022, 4.5, 1),
('Another Album', 'Second release description', 2023, 4.0, 2)
ON CONFLICT DO NOTHING;

INSERT INTO albums_artists (album_id, artist_id)
VALUES (1, 1), (1, 2), (2, 2)
ON CONFLICT DO NOTHING;
