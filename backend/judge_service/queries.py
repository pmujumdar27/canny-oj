def get_judge_next(cur):
    cur.execute("SELECT * FROM submissions WHERE status='IQ' ORDER BY created_at LIMIT 1")
    judge_next = cur.fetchall()
    return judge_next

def update_submission_status(cur, conn, id, status):
    sql = '''UPDATE submissions SET status =%s WHERE id=%s'''
    cur.execute(sql, (status, id))
    update_count = cur.rowcount
    conn.commit()
    return update_count

def get_submissions(cur):
    sql = '''SELECT * from submissions'''
    cur.execute(sql)
    return cur.fetchall()

if __name__=='__main__':
    import psycopg2
    from get_config import get_db_config
    conn = None
    try:
        db_config = get_db_config()
        print("DB Config: ", db_config)

        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**db_config)
        
        cur = conn.cursor()

        # ------------------------- RUN HERE --------------------------------

        update_cnt = update_submission_status(cur, conn, 2, 'IQ')
        update_cnt = update_submission_status(cur, conn, 3, 'IQ')
        update_cnt = update_submission_status(cur, conn, 4, 'IQ')

        # for submission in get_submissions(cur):
        #     print(submission)

        # -------------------------------------------------------------------


    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed!')