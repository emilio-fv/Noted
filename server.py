from flask_app import app
from flask_app.controllers import helpers, users_controller, reviews_controller, music_controller, user_connections_controller

if __name__=='__main__':
    app.run(debug=True)