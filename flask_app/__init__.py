from flask import Flask # Import Flask class

app = Flask(__name__) # Instantiate WSGI application 

app.secret_key = 'askdjf;lkaj'
app.config['SESSION_COOKIE_NAME'] = "Note-d's Cookie"
DATABASE = 'noted_db'