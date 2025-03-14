import sqlite3

conn = sqlite3.connect('voting.db')
cursor = conn.cursor()

print("Users Table:")
cursor.execute('SELECT * FROM users')
for row in cursor.fetchall():
    print(row)

print("\nVotes Table:")
cursor.execute('SELECT * FROM votes')
for row in cursor.fetchall():
    print(row)

conn.close()