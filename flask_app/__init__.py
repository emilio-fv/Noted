# Standard Library Imports
from flask import Flask 

# Instantiate WSGI App
app = Flask(__name__) 

# App Configuration
app.secret_key = 'askdjf;lkaj'
app.config['SESSION_COOKIE_NAME'] = "Note-d's Cookie"
DATABASE = 'noted_db'