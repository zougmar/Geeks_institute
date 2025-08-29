from flask import Flask, render_template, request, redirect, url_for, flash
from database.index import connect_to_db
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()
app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')


@app.context_processor
def inject_current_year():
    return {'current_year': datetime.now().year}


# --------------------
# HOME PAGE
# --------------------
from flask import Flask, render_template, request, redirect, url_for, flash


app = Flask(__name__)
app.secret_key = "your_secret_key"

# -----------------------------
# CREATE ALBUM ROUTE
# ----------------------------- 
@app.route('/')
def index():
    search_query = request.args.get('search', '')
    page = int(request.args.get('page', 1))  # Current page
    per_page = 6  # Albums per page
    offset = (page - 1) * per_page

    conn = connect_to_db()
    if not conn:
        return render_template('index.html', albums=[], search_query=search_query, page=page, total_pages=1)

    cursor = conn.cursor()

    # Count total albums for pagination
    count_query = "SELECT COUNT(*) FROM albums"
    if search_query:
        count_query += " WHERE title ILIKE %s OR description ILIKE %s"
        cursor.execute(count_query, ('%' + search_query + '%', '%' + search_query + '%'))
    else:
        cursor.execute(count_query)
    total_albums = cursor.fetchone()[0]
    total_pages = (total_albums + per_page - 1) // per_page  # Ceiling division

    # Fetch albums with limit and offset
    query = """
        SELECT a.id, a.title, a.description, a.release_year, a.rating,
               g.name AS genre,
               COALESCE(STRING_AGG(ar.name, ', ' ORDER BY ar.name), 'Unknown') AS artists,
               a.image_url
        FROM albums a
        LEFT JOIN genres g ON a.genre_id = g.id
        LEFT JOIN albums_artists aa ON a.id = aa.album_id
        LEFT JOIN artists ar ON aa.artist_id = ar.id
    """
    if search_query:
        query += " WHERE a.title ILIKE %s OR a.description ILIKE %s"
    query += " GROUP BY a.id, g.name, a.image_url ORDER BY a.release_year DESC"
    query += " LIMIT %s OFFSET %s"

    if search_query:
        cursor.execute(query, ('%' + search_query + '%', '%' + search_query + '%', per_page, offset))
    else:
        cursor.execute(query, (per_page, offset))

    rows = cursor.fetchall()
    conn.close()

    albums = []
    for r in rows:
        albums.append({
            "id": r["id"],
            "title": r["title"],
            "description": r["description"],
            "release_year": r["release_year"],
            "rating": r["rating"],
            "genre": r["genre"],
            "artists": r["artists"],
            "image_url": r["image_url"] or f"https://picsum.photos/seed/{r['id']}/500/500"
        })

    return render_template('index.html', albums=albums, search_query=search_query, page=page, total_pages=total_pages)



# --------------------
# DASHBOARD
# --------------------
@app.route('/dashboard')
def dashboard():
    conn = connect_to_db()
    if not conn:
        return render_template('dashboard.html',
                               albums=[], total_albums=0, total_artists=0,
                               total_genres=0, total_plays=0, genre_data=[], year_data=[])

    cursor = conn.cursor()
    # Fetch albums
    cursor.execute("""
        SELECT a.id, a.title, a.description, a.release_year, a.rating,
               g.name AS genre,
               COALESCE(STRING_AGG(ar.name, ', ' ORDER BY ar.name), 'Unknown') AS artists,
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
    total_plays = 1200  # placeholder

    # Albums per genre
    cursor.execute("""
        SELECT COALESCE(g.name, 'Unknown') AS genre, COUNT(a.id)
        FROM albums a
        LEFT JOIN genres g ON a.genre_id = g.id
        GROUP BY genre
        ORDER BY COUNT(a.id) DESC
    """)
    genre_data = [{'label': g, 'count': c} for g, c in cursor.fetchall()]

    # Albums per year
    cursor.execute("""
        SELECT COALESCE(a.release_year, 0) AS year, COUNT(a.id)
        FROM albums a
        GROUP BY year
        ORDER BY year
    """)
    year_data = [{'label': y, 'count': c} for y, c in cursor.fetchall()]

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
# ALBUM DETAILS
# --------------------
@app.route('/albums/<int:id>')
def album_detail(id):
    conn = connect_to_db()
    if not conn:
        return render_template('details.html', album=None)

    cursor = conn.cursor()
    cursor.execute("""
        SELECT a.id, a.title, a.description, a.release_year, a.rating,
               a.genre_id, a.image_url,
               g.name AS genre,
               COALESCE(STRING_AGG(ar.name, ', ' ORDER BY ar.name), 'Unknown') AS artists
        FROM albums a
        LEFT JOIN genres g ON a.genre_id = g.id
        LEFT JOIN albums_artists aa ON a.id = aa.album_id
        LEFT JOIN artists ar ON aa.artist_id = ar.id
        WHERE a.id = %s
        GROUP BY a.id, g.name
    """, (id,))
    album = cursor.fetchone()
    conn.close()

    if album:
        album = dict(album)
        album['image_url'] = album['image_url'] or f"https://picsum.photos/seed/{album['id']}/800/600"

    return render_template('details.html', album=album)


# --------------------
# CREATE ALBUM
# --------------------
from psycopg2.extras import DictCursor

@app.route('/create', methods=['GET', 'POST'])
def create():
    conn = connect_to_db()
    if not conn:
        flash("Database connection failed.", "red")
        return render_template('create.html', genres=[])

    cursor = conn.cursor(cursor_factory=DictCursor)  # Use DictCursor
    cursor.execute("SELECT * FROM genres ORDER BY name LIMIT 10")
    genres = [{"id": r["id"], "name": r["name"]} for r in cursor.fetchall()]

    if request.method == 'POST':
        title = request.form.get('title')
        description = request.form.get('description')
        release_year = request.form.get('release_year')
        rating = request.form.get('rating')
        genre_id = request.form.get('genre_id')
        image_url = request.form.get('image_url')
        genre_id = int(genre_id) if genre_id else None

        if not title or not description or not release_year or not rating:
            flash("All fields are required.", "red")
            return render_template('create.html', genres=genres)

        cursor.execute("""
            INSERT INTO albums (title, description, release_year, rating, genre_id, image_url)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (title, description, release_year, rating, genre_id, image_url))
        conn.commit()  # Make sure to commit changes
        conn.close()
        flash("Album created successfully!", "blue")
        return redirect(url_for('index'))

    conn.close()
    return render_template('create.html', genres=genres)



# --------------------
# EDIT ALBUM
# --------------------
@app.route('/edit/<int:id>', methods=['GET', 'POST'])
def edit(id):
    conn = connect_to_db()
    if not conn:
        flash("Database connection failed.", "red")
        return redirect(url_for('index'))

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM albums WHERE id=%s", (id,))
    album = cursor.fetchone()
    if not album:
        flash("Album not found.", "red")
        conn.close()
        return redirect(url_for('index'))

    # Fetch all genres
    cursor.execute("SELECT * FROM genres ORDER BY name")
    genres = cursor.fetchall()

    # Fetch all artists from DB
    cursor.execute("SELECT * FROM artists ORDER BY name")
    all_artists = cursor.fetchall()

    # Fetch current album artists
    cursor.execute("SELECT artist_id FROM albums_artists WHERE album_id=%s", (id,))
    current_artist_ids = [row["artist_id"] for row in cursor.fetchall()]

    if request.method == 'POST':
        title = request.form.get('title')
        description = request.form.get('description')
        release_year = int(request.form.get('release_year', 0))
        rating = float(request.form.get('rating', 0))
        genre_id = request.form.get('genre_id')
        genre_id = int(genre_id) if genre_id else None
        image_url = request.form.get('image_url')

        selected_artists = request.form.getlist('artist_ids')
        selected_artists = [int(aid) for aid in selected_artists]

        # Update album
        cursor.execute("""
            UPDATE albums
            SET title=%s, description=%s, release_year=%s, rating=%s, genre_id=%s, image_url=%s
            WHERE id=%s
        """, (title, description, release_year, rating, genre_id, image_url, id))

        # Update album artists
        cursor.execute("DELETE FROM albums_artists WHERE album_id=%s", (id,))
        for aid in selected_artists:
            cursor.execute("INSERT INTO albums_artists (album_id, artist_id) VALUES (%s, %s)", (id, aid))

        conn.close()
        flash("Album updated successfully!", "blue")
        return redirect(url_for('album_detail', id=id))

    conn.close()
    return render_template('edit.html', album=album, genres=genres, all_artists=all_artists, current_artist_ids=current_artist_ids)


# --------------------
# DELETE ALBUM
# --------------------
@app.route('/delete/<int:id>', methods=['POST'])
def delete(id):
    conn = connect_to_db()
    if not conn:
        return redirect(url_for('index'))

    cursor = conn.cursor()
    cursor.execute("DELETE FROM albums WHERE id=%s", (id,))
    conn.close()
    flash("Album deleted successfully.", "blue")
    return redirect(url_for('index'))


if __name__ == "__main__":
    app.run(debug=True, port=5001)
