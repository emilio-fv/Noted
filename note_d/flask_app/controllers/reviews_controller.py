from flask_app import app
from flask import render_template, request, redirect, session, flash
from flask_app.models.review_model import Review # Import Review Class from models file
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pprint

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id="a52ad4c033704801a62d8b13207b7246",
                                                           client_secret="ef58fd4346734fc784202140e2a7c08e"))

@app.route('/reviews/new/<album_id>') # Route for new review form w/ album data 
def new_review(album_id):
    print(album_id)
    # Get album title and populate 
    album_results = sp.album(album_id)
    album_data = {
        "album_id": album_results['id'],
        "album_name": album_results['name']
    }
    return render_template('review_new.html', album_data=album_data)

@app.route('/reviews/create/<album_id>', methods=['POST']) # Route for processing new review form data
def create_review(album_id):
    print(request.form)
    print(session['user_id'])
    review_data = {
        **request.form,
        "album_id": album_id,
        "user_id": session['user_id']
    }
    Review.create(review_data) # Instantiate Review 
    return redirect('/dashboard')