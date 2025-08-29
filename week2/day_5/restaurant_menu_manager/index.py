from flask import Flask, render_template, request, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import logout_user
import psycopg2
import psycopg2.extras 
import os
from dotenv import load_dotenv
from datetime import datetime
from functools import wraps
import math
load_dotenv()
ITEMS_PER_PAGE = 6
app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')

# -----------------------------
# Database configuration
# -----------------------------
DB_HOST = os.getenv("PGHOST")
DB_NAME = os.getenv("PGDATABASE")
DB_USER = os.getenv("PGUSER")
DB_PASS = os.getenv("PGPASSWORD")
DB_SSLMODE = os.getenv("PGSSLMODE", "require")


# -----------------------------
# Context processor
# -----------------------------
@app.context_processor
def inject_now():
    return {'now': datetime.now}


# -----------------------------
# Database connection
# -----------------------------
def get_db_connection():
    conn = psycopg2.connect(
        host=DB_HOST,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASS,
        sslmode=DB_SSLMODE,
        cursor_factory=psycopg2.extras.DictCursor
    )
    return conn

# -----------------------------
# ROUTES
# -----------------------------
@app.route('/')
def home():
    return redirect(url_for('menu'))

@app.route('/menu')
def menu():
    search_query = request.args.get('search', '').strip()
    page = request.args.get('page', 1, type=int)  # current page, default 1

    conn = get_db_connection()
    cursor = conn.cursor()  # or use DictCursor if needed

    # Base query with COALESCE
    base_query = """
        FROM menu_items m
        LEFT JOIN images i ON m.id = i.menu_item_id
    """

    # Count total items for pagination
    if search_query:
        cursor.execute("SELECT COUNT(*) " + base_query + 
                       " WHERE m.name ILIKE %s OR m.category ILIKE %s",
                       (f'%{search_query}%', f'%{search_query}%'))
    else:
        cursor.execute("SELECT COUNT(*) " + base_query)
    total_items = cursor.fetchone()[0]
    total_pages = math.ceil(total_items / ITEMS_PER_PAGE)

    # Fetch current page items
    offset = (page - 1) * ITEMS_PER_PAGE
    select_query = """
        SELECT 
            m.id, 
            m.name, 
            m.price, 
            m.category, 
            COALESCE(i.image_url, m.image_url) AS image_url
    """ + base_query

    if search_query:
        select_query += " WHERE m.name ILIKE %s OR m.category ILIKE %s ORDER BY m.id LIMIT %s OFFSET %s"
        cursor.execute(select_query, (f'%{search_query}%', f'%{search_query}%', ITEMS_PER_PAGE, offset))
    else:
        select_query += " ORDER BY m.id LIMIT %s OFFSET %s"
        cursor.execute(select_query, (ITEMS_PER_PAGE, offset))

    items = cursor.fetchall()
    cursor.close()
    conn.close()

    return render_template('menu.html', 
                           items=items, 
                           search_query=search_query, 
                           page=page, 
                           total_pages=total_pages)
@app.route('/add', methods=['GET', 'POST'])
def add_item():
    if request.method == 'POST':
        name = request.form['name']
        price = request.form['price']
        category = request.form['category']
        image_url = request.form.get('image_url')

        if not name or not price or not category:
            flash('Please fill in all fields.', 'danger')
            return redirect(url_for('add_item'))

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO Menu_Items (name, price, category, image_url) VALUES (%s, %s, %s, %s)",
            (name, price, category, image_url)
        )
        conn.commit()
        cursor.close()
        conn.close()
        flash(f'Item "{name}" added successfully!', 'success')
        return redirect(url_for('menu'))

    return render_template('add_item.html')


@app.route('/update/<int:item_id>', methods=['GET', 'POST'])
def update_item(item_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, price, category, image_url FROM Menu_Items WHERE id = %s", (item_id,))
    item = cursor.fetchone()

    if not item:
        flash('Item not found.', 'danger')
        cursor.close()
        conn.close()
        return redirect(url_for('menu'))

    if request.method == 'POST':
        name = request.form['name']
        price = request.form['price']
        category = request.form['category']
        image_url = request.form.get('image_url')

        cursor.execute(
            "UPDATE Menu_Items SET name = %s, price = %s, category = %s, image_url = %s WHERE id = %s",
            (name, price, category, image_url, item_id)
        )
        conn.commit()
        cursor.close()
        conn.close()
        flash('Item updated successfully!', 'success')
        return redirect(url_for('menu'))

    cursor.close()
    conn.close()
    return render_template('update_item.html', item=item)


@app.route('/delete/<int:item_id>')
def delete_item(item_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Menu_Items WHERE id = %s", (item_id,))
    conn.commit()
    cursor.close()
    conn.close()
    flash('Item deleted successfully!', 'success')
    return redirect(url_for('menu'))


# -----------------------------
# Dashboard
# -----------------------------
@app.route('/dashboard')
def dashboard():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM Menu_Items;")
    total_items = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(DISTINCT category) FROM Menu_Items;")
    total_categories = cursor.fetchone()[0]

    cursor.execute("SELECT category, AVG(price) FROM Menu_Items GROUP BY category ORDER BY category;")
    category_avg_prices = cursor.fetchall()
    category_avg_prices = [(cat, float(avg or 0)) for cat, avg in category_avg_prices]
    max_avg_price = max((avg for _, avg in category_avg_prices), default=1)

    cursor.execute("SELECT id, name, price, category, image_url FROM Menu_Items ORDER BY id DESC LIMIT 5;")
    recent_items = cursor.fetchall()

    cursor.close()
    conn.close()

    return render_template(
        'dashboard.html',
        total_items=total_items,
        total_categories=total_categories,
        category_avg_prices=category_avg_prices,
        max_avg_price=max_avg_price,
        recent_items=recent_items
    )


# -----------------------------
# LOGIN / LOGOUT / SIGNUP
# -----------------------------
def login_required_custom(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'username' not in session:
            flash('Please log in to access this page.', 'danger')
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT username, password FROM users WHERE username=%s', (username,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if user and check_password_hash(user[1], password):
            session['username'] = user[0]
            flash('Logged in successfully!', 'success')
            return redirect(url_for('profile'))
        else:
            flash('Invalid username or password', 'danger')
            return redirect(url_for('login'))

    return render_template('login.html')


@app.route('/logout')
def logout():
    session.pop('username', None)
    flash("Logged out successfully.", "success")
    return redirect(url_for('login'))


@app.route('/profile')
@login_required_custom
def profile():
    return render_template('profile.html', username=session.get('username'))


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        hashed_password = generate_password_hash(password)

        conn = get_db_connection()
        cursor = conn.cursor()
        try:
            cursor.execute(
                "INSERT INTO users (username, password) VALUES (%s, %s)",
                (username, hashed_password)
            )
            conn.commit()
            flash("Account created successfully!", "success")
            return redirect(url_for('login'))
        except Exception as e:
            conn.rollback()
            flash(f"Error: {e}", "danger")
        finally:
            cursor.close()
            conn.close()

    return render_template('signup.html')


# -----------------------------
# ONE-TIME: Create initial admin user
# -----------------------------
def create_admin_user():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT id FROM users WHERE username=%s', ('admin',))
    if cursor.fetchone() is None:
        hashed_password = generate_password_hash("admin123")
        cursor.execute(
            'INSERT INTO users (username, password, created_at) VALUES (%s, %s, NOW())',
            ('admin', hashed_password)
        )
        conn.commit()
        print("Admin user created.")
    else:
        print("Admin user already exists.")
    cursor.close()
    conn.close()


# -----------------------------
# MAIN
# -----------------------------
if __name__ == '__main__':
    # Only run this once to create admin, then comment it out
    # create_admin_user()
    app.run(debug=True, port=5001)
