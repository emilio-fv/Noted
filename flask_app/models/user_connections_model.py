from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import DATABASE

class User_Connection:
    def __init__(self, data):
        self.id = data['id']
        self.follower_user_id = data['follower_user_id']
        self.following_user_id = data['following_user_id']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    # CREATE
    @classmethod # Create new connection
    def create(self, data):
        query = "INSERT INTO user_connections (follower_user_id, following_user_id) VALUES (%(follower_user_id)s, %(following_user_id)s);"
        return connectToMySQL(DATABASE).query_db(query, data)

    # READ
    @classmethod # Check if connection already exists
    def get_one_by_ids(self, data):
        query = "SELECT * FROM user_connections WHERE follower_user_id = %(follower_user_id)s AND following_user_id = %(following_user_id)s;"
        return connectToMySQL(DATABASE).query_db(query, data)

    @classmethod # Get all connections and user info for specific user
    def get_all_by_id(self, data):
        query = "SELECT * FROM user_connections WHERE follower_user_id = %(user_id)s;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        # TODO: Parse through results

    @classmethod # Get # of following for specific user
    def get_following_count_by_id(self, data):
        query = "SELECT COUNT(id) FROM user_connections WHERE follower_user_id = %(user_id)s;"
        return connectToMySQL(DATABASE).query_db(query, data)

    @classmethod # Get # of followers for specific user
    def get_followers_count_by_id(self, data):
        query = "SELECT COUNT(id) FROM user_connections WHERE following_user_id = %(user_id)s;"
        return connectToMySQL(DATABASE).query_db(query, data)

    # UPDATE

    # DELETE
    @classmethod # Delete connection
    def delete(self, data):
        query = "DELETE FROM user_connections WHERE follower_user_id = %(follower_user_id)s AND following_user_id = %(following_user_id)s;"
        return connectToMySQL(DATABASE).query_db(query, data)