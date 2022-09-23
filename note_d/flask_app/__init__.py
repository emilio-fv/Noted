from flask import Flask
app = Flask(__name__)
app.secret_key = 'askdjf;lkaj'
app.config['SESSION_COOKIE_NAME'] = "Note-d's Cookie"
DATABASE = 'noted_db'