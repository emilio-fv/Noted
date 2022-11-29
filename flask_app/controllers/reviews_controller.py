from flask_app import app
from flask import render_template, request, redirect, session, flash
from flask_app.models.review_model import Review 
import pprint
from flask_app.controllers.helpers import login_required, sp
import flask_app.constants

@app.route('/reviews/new/<album_id>') # New Review Form
def new_review_form(album_id):
    album_results = sp.album(album_id)
    album_data = {
        "album_id": album_results['id'],
        "album_name": album_results['name'],
        "artist_name": album_results['artists'][0]['name'],
        "img_url": album_results['images'][0]['url']
    }
    return render_template('review_new.html', album_data=album_data)

@app.route('/reviews/create', methods=['POST']) # Create New Review
@login_required
def create_review():
    review_data = {
        **request.form,
        "user_id": session['user_id']
    }
    Review.create(review_data) 
    return redirect('/dashboard')

# TODO Search Reviews
@app.route('/reviews/search')
@login_required
def search_reviews():
    return render_template('review_search.html')

# TODO View Review
# TODO Edit Review

@app.route('/reviews/delete/<review_id>') # Delete Review
@login_required
def delete_review(review_id):
    Review.delete({
        "id": review_id
    })
    return redirect('/dashboard')