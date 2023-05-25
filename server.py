# Resource Imports
from flask_app import app
from flask_app.controllers import helpers, users_controller, reviews_controller, music_controller, user_connections_controller

# Run App
if __name__=='__main__':
    app.run(host="127.0.0.1", port=8080, debug=True)