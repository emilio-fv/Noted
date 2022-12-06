from flask_app import app
from flask import render_template, request, redirect, session, flash, jsonify, request, url_for
from flask_bcrypt import Bcrypt
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pprint
from flask_app.controllers.helpers import login_required, sp
from flask_app.models.user_model import User
from flask_app.models.review_model import Review
import flask_app.constants

bcrypt = Bcrypt(app) # Initialize Bcrypt 

@app.route('/') # Landing Page
def index():
    session['page'] = 'register'
    return render_template('landing_page.html')

@app.route('/register') # Register Form
def register_form():
    if 'user_id' in session: 
        return redirect('/dashboard')
    session['page'] = 'register'
    return render_template('register_form.html')

@app.route('/users/register', methods=['POST']) # Register User
def register():
    if not User.validate(request.form): 
        return redirect('/register')
    hashed_password = bcrypt.generate_password_hash(request.form['password']) 
    data = {
        **request.form,
        'password': hashed_password
    }
    id = User.create(data) 
    session['user_id'] = id 
    return redirect('/dashboard') 

@app.route('/login') # Login Form
def login_form():
    if 'user_id' in session: 
        return redirect('/dashboard')
    session['page'] = 'login'
    return render_template('login_form.html')

@app.route('/users/login', methods=['POST']) # Login User
def login():
    user_in_db = User.get_one_by_email({'email': request.form['email']}) 
    if not user_in_db:
        flash('Invalid login info', "log")
        return redirect('/login')
    if not bcrypt.check_password_hash(user_in_db.password, request.form['password']): 
        flash("Invalid login info", "log")
        return redirect('/login')
    session['user_id'] = user_in_db.id 
    return redirect('/dashboard') 

@app.route('/users/logout') # Logout User
def logout():
    session.clear() 
    return redirect('/login') 

@app.route('/dashboard') # Dashboard
@login_required
def dashboard():
    logged_user = User.get_one_by_id({'id': session['user_id']}) 
    logged_users_latest_reviews = Review.get_latest_by_user({'user_id': session['user_id']})
    other_users_reviews = Review.get_all({'user_id': session['user_id']})
    return render_template('dashboard.html', logged_user = logged_user, logged_users_latest_reviews = logged_users_latest_reviews, other_users_reviews = other_users_reviews)

@app.route('/users/search') # Search Users Form
@login_required
def search_users_form():
    return render_template('user_search.html')

@app.route('/users/search', methods=['POST']) # Search Users
@login_required
def search_users():
    search_category = request.form['search_category']
    search_input = request.form['search_input']
    if search_category == 'username' or search_category == 'email':
        search_results = User.get_many_by_user_input({
            'category': search_category,
            'input': search_input
        })
    else:
        search_results = User.get_all_not_logged_in_users({ 'user_id': session['user_id'] })
    all_users = []
    for user in search_results:
        this_user = {
            'id': user.id,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'created_at': user.created_at.strftime("%b %d %Y")
        }
        all_users.append(this_user)
    return jsonify(all_users)

@app.route('/users/view/<user_id>') # View User Profile
def view_user(user_id):
    users_data = User.get_one_by_id({'id': user_id})
    users_reviews = Review.get_all_by_user_id({'user_id': user_id})
    latest_reviews = Review.get_latest_by_user({'user_id': user_id})
    artist_count = Review.get_count_all_artists({'user_id': user_id})
    reviews_this_year = Review.get_count_of_current_year_reviews({'user_id': user_id})
    top_rated_reviews = Review.get_top_rated_of_user({'user_id': user_id})
    return render_template('user_view.html', users_data = users_data, users_reviews = users_reviews, latest_reviews = latest_reviews, artist_count = artist_count, reviews_this_year = reviews_this_year, top_rated_reviews = top_rated_reviews)