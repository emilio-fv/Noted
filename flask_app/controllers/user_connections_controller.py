# Standard Library Imports
from flask_app import app
from flask import session, redirect

# Resource Imports
from flask_app.models.user_connections_model import User_Connection
from flask_app.controllers.helpers import login_required

# Add Connection
@app.route('/user_connections/add')
def add_user_connection():
    results = User_Connection.create({ 
        'follower_user_id': session['user_id'],
        'following_user_id': session['latest_user_profile_id']
    })
    return {}

# Remove Connection
@app.route('/user_connections/delete')
def delete_user_connection():
    User_Connection.delete({
        'follower_user_id': session['user_id'],
        'following_user_id': session['latest_user_profile_id']
    })
    return {}
