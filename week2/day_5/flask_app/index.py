from flask import Flask, render_template, request, redirect, url_for, flash
from database.index import connect_to_db
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')


# --------------------
# HOME PAGE - list albums
# --------------------
@app.route('/', methods=['GET'])
def index():
    conn = connect_to_db()
    if not conn:
        return render_template('index.html', albums=[])

    cursor = conn.cursor()
    cursor.execute("""
        SELECT a.id, a.title, a.description, a.release_year, a.rating,
               g.name AS genre,
               STRING_AGG(ar.name, ', ') AS artists,
               a.image_url
        FROM albums a
        LEFT JOIN genres g ON a.genre_id = g.id
        LEFT JOIN albums_artists aa ON a.id = aa.album_id
        LEFT JOIN artists ar ON aa.artist_id = ar.id
        GROUP BY a.id, g.name, a.image_url
        ORDER BY a.release_year DESC
    """)
    rows = cursor.fetchall()
    conn.close()

    albums = []
    for r in rows:
        albums.append({
            "id": r[0],
            "title": r[1],
            "description": r[2],
            "release_year": r[3],
            "rating": r[4],
            "genre": r[5],
            "artists": r[6],
            "image_url": r[7] if r[7] else f"https://picsum.photos/seed/{r[0]}/500/500"
        })

    return render_template('index.html', albums=albums)


# --------------------
# DASHBOARD
# --------------------
@app.route('/dashboard')
def dashboard():
    conn = connect_to_db()
    if not conn:
        return render_template('dashboard.html',
                               albums=[],
                               total_albums=0,
                               total_artists=0,
                               total_genres=0,
                               total_plays=0,
                               genre_data=[],
                               year_data=[])

    cursor = conn.cursor()
    
    # Fetch albums for table
    cursor.execute("""
        SELECT a.id, a.title, a.description, a.release_year, a.rating,
               g.name AS genre,
               STRING_AGG(ar.name, ', ') AS artists,
               a.image_url
        FROM albums a
        LEFT JOIN genres g ON a.genre_id = g.id
        LEFT JOIN albums_artists aa ON a.id = aa.album_id
        LEFT JOIN artists ar ON aa.artist_id = ar.id
        GROUP BY a.id, g.name, a.image_url
        ORDER BY a.release_year DESC
    """)
    albums = cursor.fetchall()
    
    # Stats
    cursor.execute("SELECT COUNT(*) FROM artists")
    total_artists = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM genres")
    total_genres = cursor.fetchone()[0]
    total_albums = len(albums)
    total_plays = 1200  # Example

    # Albums per genre
    cursor.execute("""
        SELECT COALESCE(g.name, 'Unknown') AS genre, COUNT(a.id)
        FROM albums a
        LEFT JOIN genres g ON a.genre_id = g.id
        GROUP BY genre
        ORDER BY COUNT(a.id) DESC
    """)
    genre_data = cursor.fetchall()

    # Albums per year
    cursor.execute("""
        SELECT COALESCE(a.release_year, 0) AS year, COUNT(a.id)
        FROM albums a
        GROUP BY year
        ORDER BY year
    """)
    year_data = cursor.fetchall()

    conn.close()

    return render_template('dashboard.html',
                           albums=albums,
                           total_albums=total_albums,
                           total_artists=total_artists,
                           total_genres=total_genres,
                           total_plays=total_plays,
                           genre_data=genre_data,
                           year_data=year_data)


# --------------------
# CHARTS PAGE (OPTIONAL)
# --------------------
@app.route('/charts')
def charts_page():
    conn = connect_to_db()
    if not conn:
        return render_template('charts.html', genre_data=[], year_data=[])

    cursor = conn.cursor()

    # Albums per genre
    cursor.execute("""
        SELECT COALESCE(g.name, 'Unknown') AS genre, COUNT(a.id)
        FROM albums a
        LEFT JOIN genres g ON a.genre_id = g.id
        GROUP BY genre
        ORDER BY COUNT(a.id) DESC
    """)
    genre_data = cursor.fetchall()

    # Albums per year
    cursor.execute("""
        SELECT COALESCE(a.release_year, 0) AS year, COUNT(a.id)
        FROM albums a
        GROUP BY year
        ORDER BY year
    """)
    year_data = cursor.fetchall()

    conn.close()
    return render_template('charts.html', genre_data=genre_data, year_data=year_data)


# --------------------
# ALBUM DETAIL
# --------------------
@app.route('/albums/<int:id>', methods=['GET'])
def album_detail(id):
    conn = connect_to_db()
    if not conn:
        return render_template('details.html', album=None)

    cursor = conn.cursor()
    cursor.execute("""
        SELECT a.*, g.name AS genre,
               STRING_AGG(ar.name, ', ') AS artists
        FROM albums a
        LEFT JOIN genres g ON a.genre_id = g.id
        LEFT JOIN albums_artists aa ON a.id = aa.album_id
        LEFT JOIN artists ar ON aa.artist_id = ar.id
        WHERE a.id = %s
        GROUP BY a.id, g.name
    """, (id,))
    album = cursor.fetchone()
    conn.close()

    return render_template('details.html', album=album)


# --------------------
# CREATE ALBUM
# --------------------
@app.route('/create', methods=['POST', 'GET'])
def create():
    conn = connect_to_db()
    if not conn:
        return render_template('create.html', error='DB connection failed')

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM genres ORDER BY name")
    genres = cursor.fetchall()

    if request.method == 'POST':
        title = request.form.get('title')
        description = request.form.get('description')
        release_year = request.form.get('release_year')
        rating = request.form.get('rating')
        genre_id = request.form.get('genre_id')
        image_url = request.form.get('image_url')
        genre_id = int(genre_id) if genre_id else None

        if not title or not description or not release_year or not rating:
            flash("All fields are required", "red")
            return render_template('create.html', genres=genres)

        cursor.execute("""
            INSERT INTO albums (title, description, release_year, rating, genre_id, image_url)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (title, description, release_year, rating, genre_id, image_url))
        conn.commit()
        conn.close()

        flash("Album created successfully!", "blue")
        return redirect(url_for('index'))

    return render_template('create.html', genres=genres)


# --------------------
# EDIT ALBUM
# --------------------
@app.route('/edit/<int:id>', methods=['POST', 'GET'])
def edit(id):
    conn = connect_to_db()
    if not conn:
        flash("Database connection failed.", "red")
        return redirect(url_for('index'))

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM albums WHERE id = %s", (id,))
    album_row = cursor.fetchone()

    if not album_row:
        flash("Album not found.", "red")
        conn.close()
        return redirect(url_for('index'))

    album = {
        "id": album_row[0],
        "title": album_row[1],
        "description": album_row[2],
        "release_year": album_row[3],
        "rating": album_row[4],
        "genre_id": album_row[5],
        "image_url": album_row[6]
    }

    cursor.execute("SELECT * FROM genres ORDER BY name")
    genres_rows = cursor.fetchall()
    genres = [{"id": g[0], "name": g[1]} for g in genres_rows]

    if request.method == 'POST':
        title = request.form.get('title', 'no title')
        description = request.form.get('description', 'no description')
        release_year = int(request.form.get('release_year', 0))
        rating = float(request.form.get('rating', 0))
        genre_id = request.form.get('genre_id')
        genre_id = int(genre_id) if genre_id else None
        image_url = request.form.get('image_url', 'no image')

        cursor.execute("""
            UPDATE albums
            SET title=%s, description=%s, release_year=%s, rating=%s, genre_id=%s, image_url=%s
            WHERE id=%s
        """, (title, description, release_year, rating, genre_id, image_url, id))
        conn.commit()
        conn.close()

        flash("Album updated successfully!", "blue")
        return redirect(url_for('index'))

    conn.close()
    return render_template('edit.html', album=album, genres=genres)


# --------------------
# DELETE ALBUM
# --------------------
@app.route('/delete/<int:id>', methods=['POST'])
def delete(id):
    conn = connect_to_db()
    if not conn:
        return redirect(url_for('index'))

    cursor = conn.cursor()
    cursor.execute("DELETE FROM albums WHERE id = %s", (id,))
    conn.commit()
    conn.close()

    flash("Album deleted successfully", "blue")
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, port=5001)
