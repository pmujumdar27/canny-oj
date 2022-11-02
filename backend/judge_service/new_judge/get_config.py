from dotenv import load_dotenv
import os

load_dotenv()

def get_db_config():

    db_config = {}
    vars = ['host', 'database', 'user', 'password']

    for var in vars:
        db_config[var] = os.environ.get(var)

    return db_config