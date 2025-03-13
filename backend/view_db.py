# view_db.py
import sqlite3

# Connect to the database
conn = sqlite3.connect('voting.db')
cursor = conn.cursor()

# Fetch and print data from the users table
print("Users Table:")
cursor.execute('SELECT * FROM users')
for row in cursor.fetchall():
    print(row)

# Fetch and print data from the votes table
print("\nVotes Table:")
cursor.execute('SELECT * FROM votes')
for row in cursor.fetchall():
    print(row)

# Close the connection
conn.close()