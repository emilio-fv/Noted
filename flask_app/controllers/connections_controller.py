# Standard Library Imports
from flask_app import app
from flask import session, redirect

# Resource Imports
from flask_app.models.connections_model import Connection
from flask_app.controllers.helpers import login_required

# Add Connection
@app.route('/connections/add')
def add_connection():
    results = Connection.create({ 
        'follower_user_id': session['user_id'],
        'following_user_id': session['latest_user_profile_id']
    })
    return {}

# Remove Connection
@app.route('/connections/delete')
def delete_connection():
    Connection.delete({
        'follower_user_id': session['user_id'],
        'following_user_id': session['latest_user_profile_id']
    })
    return {}