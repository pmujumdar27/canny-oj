import psycopg2
from get_config import get_db_config
import requests
import time
import os
from dotenv import load_dotenv

from judge import judge_problem
from queries import update_submission_status, get_judge_next

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

        urlnm = "http://localhost:8000/users/login"
        data = {
            "email": os.environ.get('judge_email'),
            "password": os.environ.get('judge_password')
        }
        r = requests.post(url=urlnm, json = data)
        resp = r.json()
        print("Login response: ", resp)
        token = resp['data']['accessToken']

        # return

        while(1):
            time.sleep(1)

            judge_next = get_judge_next(cur)

            print("Judge next: ", judge_next)

            # return

            if len(judge_next) < 1:
                continue

            submission = {
                'id': judge_next[0][0],
                'solution_file': judge_next[0][1],
                'user_id': judge_next[0][2],
                'problem_id': judge_next[0][3],
                'status': judge_next[0][4],
                'language': judge_next[0][5],
                'created_at': judge_next[0][6]
            }

            update_cnt = update_submission_status(cur, conn, submission['id'], 'RN')

            headers = {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": f"Bearer {token}"
                }

            prob_resp = requests.get(url=f"http://localhost:8000/problems/{submission['problem_id']}/tests", params=None, headers=headers)
            prob_data = prob_resp.json()['data']
            test_dir = "../web_api/test_io"
            submission_dir = "../web_api/"
            input_path = os.path.join(test_dir, prob_data['test_input'])
            output_path = os.path.join(test_dir, prob_data['test_output'])
            submission_path = os.path.join(submission_dir, submission['solution_file'])

            ret = judge_problem(input_path, output_path, submission_path, submission['language'])
            if ret[0].returncode==0:
                update_submission_status(cur, conn, submission['id'], 'AC')
                print(f"Submission ID: {submission['id']}\nStatus: {'AC'}")
            else:
                update_submission_status(cur, conn, submission['id'], ret[1])
                print(f"Submission ID: {submission['id']}\nStatus: {ret[1]}")


    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    else:
        print("Unexpected error")
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed!')

if __name__ == '__main__':
    connect()