# Resource Imports
from flask_app import app
from flask_app.controllers import connections_controller, helpers, users_controller, reviews_controller, music_controller

# Run App
if __name__=='__main__':
    app.run(debug=True)