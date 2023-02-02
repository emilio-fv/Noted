from flask_app import app
from flask import session, redirect
from functools import wraps
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import flask_app.config

def login_required(f): # Logged In User Check
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect('/login')
        return f(*args, **kwargs)
    return decorated_function

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials( # Spotify API Connection
    client_id = flask_app.config.CLIENT_ID, 
    client_secret = flask_app.config.CLIENT_SECRET)) 