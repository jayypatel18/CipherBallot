# app/routes.py
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
from .smpc import aggregate_votes
import asyncio
from datetime import datetime

bp = Blueprint('routes', __name__)

# Database setup
def get_db():
    conn = sqlite3.connect('voting.db')
    conn.row_factory = sqlite3.Row
    return conn

@bp.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    conn = get_db()
    cursor = conn.cursor()

    # Check if the username already exists
    existing_user = cursor.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
    if existing_user:
        conn.close()
        return jsonify({'error': 'Username already exists'}), 400

    # Insert the new user
    cursor.execute('INSERT INTO users (username, password) VALUES (?, ?)',
                   (username, generate_password_hash(password)))
    conn.commit()
    conn.close()

    return jsonify({'message': 'User registered successfully'})

@bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    conn = get_db()
    cursor = conn.cursor()
    user = cursor.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
    conn.close()

    if not user or not check_password_hash(user['password'], password):
        return jsonify({'error': 'Invalid username or password'}), 401

    return jsonify({'message': 'Login successful', 'user_id': user['id'], 'username': user['username']})

# app/routes.py
@bp.route('/vote', methods=['POST'])
def vote():
    data = request.json
    user_id = data.get('user_id')
    vote = data.get('vote')  # "Yes" or "No"

    if not user_id or not vote:
        return jsonify({'error': 'User ID and vote are required'}), 400

    conn = get_db()
    cursor = conn.cursor()

    # Check if the user has already voted
    existing_vote = cursor.execute('SELECT * FROM votes WHERE user_id = ?', (user_id,)).fetchone()
    if existing_vote:
        conn.close()
        return jsonify({'error': 'You have already voted'}), 400

    # Insert the vote with a timestamp
    cursor.execute('INSERT INTO votes (user_id, vote, timestamp) VALUES (?, ?, ?)',
                   (user_id, vote, datetime.now()))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Vote submitted successfully'})

@bp.route('/result', methods=['GET'])
def result():
    conn = get_db()
    cursor = conn.cursor()
    votes = cursor.execute('SELECT vote FROM votes').fetchall()
    conn.close()

    if not votes:
        return jsonify({'error': 'No votes submitted'}), 400

    try:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        total_yes = loop.run_until_complete(aggregate_votes([vote['vote'] for vote in votes]))
        loop.close()

        total_votes = len(votes)
        total_no = total_votes - total_yes

        return jsonify({
            'total_yes': total_yes,
            'total_no': total_no,
            'percentage_yes': (total_yes / total_votes) * 100,
            'percentage_no': (total_no / total_votes) * 100,
            'total_votes': total_votes,
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/vote-stats', methods=['GET'])
def vote_stats():
    conn = get_db()
    cursor = conn.cursor()
    stats = cursor.execute('''
        SELECT strftime("%Y-%m-%d %H:%M", timestamp) AS time, COUNT(*) AS count
        FROM votes
        GROUP BY strftime("%Y-%m-%d %H:%M", timestamp)
    ''').fetchall()
    conn.close()

    return jsonify([dict(stat) for stat in stats])

@bp.route('/logout', methods=['POST'])
def logout():
    # In a real-world app, you'd invalidate the session/token here
    return jsonify({'message': 'Logout successful'})