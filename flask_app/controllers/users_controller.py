from flask_app import app
from flask import render_template, request, redirect, session, flash, jsonify
from flask_bcrypt import Bcrypt
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pprint
from flask_app.models.user_model import User
from flask_app.models.review_model import Review
import constants

# Initialize Bcrypt object
bcrypt = Bcrypt(app) 

# ==== Spotify API ====
CLIENT_ID = constants.CLIENT_ID
CLIENT_SECRET = constants.CLIENT_SECRET
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET))

# ==== Login & Registration ====
# TODO: Route for splash page

@app.route('/') # ROUTE: login/register page
def index():
    # TODO: Check if usre is logged in
    return render_template('login_register.html')

@app.route('/register', methods=['POST']) # ROUTE: register user
def register():
    if not User.validate(request.form): # Validate form data
        return redirect('/')
    hashed_password = bcrypt.generate_password_hash(request.form['password']) # Hash password
    data = {
        **request.form,
        'password': hashed_password
    }
    id = User.create(data) # Add user to database
    session['user_id'] = id # Initialize session
    return redirect('/dashboard') # Redirect to dashboard

@app.route('/users/login', methods=['POST']) # ROUTE: login user
def login():
    user_in_db = User.get_one_by_email({'email': request.form['email']}) # Validate email
    if not user_in_db:
        flash('Invalid login info', "log")
        return redirect('/')
    if not bcrypt.check_password_hash(user_in_db.password, request.form['password']): # Validate password
        flash("Invalid login info", "log")
        return redirect('/')
    session['user_id'] = user_in_db.id # Initialize session
    return redirect('/dashboard') # Redirect: Dashboard

@app.route('/users/logout') # ROUTE: logout user
def logout():
    session.clear() # Clear session
    return redirect('/') # Redirect to register/login page

# ==== Dashboard ====
@app.route('/dashboard') # ROUTE: dashboard
def dashboard():
    if 'user_id' not in session: # Check if user not logged in
        return redirect('/')
    logged_user = User.get_one_by_id({'id': session['user_id']}) # Get user's data
    logged_user_reviews = Review.get_all_by_user_id({'user_id': session['user_id']}) # Get user's reviews
    for review in logged_user_reviews:
        album_results = sp.album(review.album_id) # Get album data for each review
        album_data = {
            "album_id": album_results['id'],
            "album_name": album_results['name'],
            "album_artist": album_results['artists'][0]['name'],
        }
        review.album_data = album_data
    return render_template('dashboard.html', logged_user = logged_user, logged_user_reviews = logged_user_reviews)

# ==== Music Tab ====
@app.route('/users/music/search_form') # ROUTE: search music engine
def search_music_form(all_albums=[]):
    return render_template('music_search.html') 

@app.route('/users/music/search', methods=['POST']) # ROUTE: search for music
def search_music():
    album_name = request.form['album_name']
    search_results = sp.search(album_name, limit=4, offset=0, type='album', market=None)
    album_results = search_results['albums']['items']
    all_albums = []
    for album in album_results:
        one_album = {
            'album_id': album['id'],  
            'album_name': album['name'],
            'album_artist': album['artists'][0]['name']
        }
        all_albums.append(one_album)
    return jsonify(all_albums)

@app.route('/users/music/view/<album_id>') # ROUTE: view album info 
def view_music(album_id):
    album_results = sp.album(album_id)
    album_data = {
        "album_id": album_results['id'],
        "album_name": album_results['name'],
        "album_artist": album_results['artists'][0]['name'],
    }
    return render_template('music_view.html', album_data = album_data)

# ==== Users Tab ====
@app.route('/users/user_search') # ROUTE: search users page
def search_users():
    return render_template('user_search.html')

@app.route('/users/user_view') # ROUTE: view user's profile
def view_user():
    return render_template('user_view.html')

