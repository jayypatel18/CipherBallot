import sqlite3

def delete_votes():
    conn = sqlite3.connect('voting.db')
    cursor = conn.cursor()

    cursor.execute('DELETE FROM votes')

    conn.commit()

    conn.close()

    print("All entries deleted from the votes table.")

if __name__ == '__main__':
    delete_votes()