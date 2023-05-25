# Standard Library Imports
from flask_app import app
from flask import session, redirect
from functools import wraps

# Resource Imports
import flask_app.config.config

# Spotipy  Imports
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

# Logged In User Check
def login_required(f): 
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect('/login')
        return f(*args, **kwargs)
    return decorated_function

# Spotify API Connection
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials( 
    client_id = flask_app.config.config.CLIENT_ID, 
    client_secret = flask_app.config.config.CLIENT_SECRET)) 