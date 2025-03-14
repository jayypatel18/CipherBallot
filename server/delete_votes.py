# delete_votes.py
import sqlite3

def delete_votes():
    # Connect to the database
    conn = sqlite3.connect('voting.db')
    cursor = conn.cursor()

    # Delete all entries from the votes table
    cursor.execute('DELETE FROM votes')

    # Commit the transaction
    conn.commit()

    # Close the connection
    conn.close()

    print("All entries deleted from the votes table.")

if __name__ == '__main__':
    delete_votes()