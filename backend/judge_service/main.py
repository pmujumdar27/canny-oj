import psycopg2
from get_config import get_db_config
import requests
import time
import os
from dotenv import load_dotenv

load_dotenv()

def connect():
    conn = None
    try:
        db_config = get_db_config()
        print("DB Config: ", db_config)

        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**db_config)
        
        cur = conn.cursor()

        # ------------------ Check if cursor is working fine --------------------
        print('PostgreSQL database version:')
        cur.execute('SELECT version()')
        db_version = cur.fetchone()
        print(db_version)
        # -----------------------------------------------------------------------

        urlnm = "http://localhost:3000/users/login"
        data = {
            "email": os.environ.get('judge_email'),
            "password": os.environ.get('judge_password')
        }
        r = requests.post(url=urlnm, json = data)
        print(type(r.json()))
        resp = r.json()
        token = resp['tokens']['accessToken']

        while(True):
            time.sleep(1)
            cur.execute("SELECT * FROM submissions WHERE status='IQ' ORDER BY created_at LIMIT 1")
            judge_next = cur.fetchall()

            headers = {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": f"Bearer {token}"
                }

            prob = requests.get(url=f"http://localhost:3000/problems/{judge_next[0][3]}/tests", params=None, headers=headers)
            print(prob.json())


    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed!')

if __name__ == '__main__':
    connect()