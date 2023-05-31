# Standard Library Imports
from flask_app import DATABASE

# Resource Imports
from flask_app.config.mysqlconnection import connectToMySQL

# Connection Model
class Connection:
    def __init__(self, data):
        self.id = data['id']
        self.follower_user_id = data['follower_user_id']
        self.following_user_id = data['following_user_id']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    # Create new connection
    @classmethod 
    def create(self, data):
        query = "INSERT INTO connections (follower_user_id, following_user_id) VALUES (%(follower_user_id)s, %(following_user_id)s);"
        return connectToMySQL(DATABASE).query_db(query, data)

    # Get Connection By Ids
    @classmethod 
    def get_one_by_ids(self, data):
        query = "SELECT * FROM connections WHERE follower_user_id = %(follower_user_id)s AND following_user_id = %(following_user_id)s;"
        return connectToMySQL(DATABASE).query_db(query, data)

    # Get All Connections For Specific User Id
    @classmethod 
    def get_all_by_id(self, data):
        query = "SELECT * FROM connections WHERE follower_user_id = %(user_id)s;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        # TODO: Parse through results

    # Get # of following for specific user
    @classmethod 
    def get_following_count_by_id(self, data):
        query = "SELECT COUNT(id) FROM connections WHERE follower_user_id = %(user_id)s;"
        return connectToMySQL(DATABASE).query_db(query, data)

    # Get # of followers for specific user
    @classmethod 
    def get_followers_count_by_id(self, data):
        query = "SELECT COUNT(id) FROM connections WHERE following_user_id = %(user_id)s;"
        return connectToMySQL(DATABASE).query_db(query, data)

    # Delete connection
    @classmethod 
    def delete(self, data):
        query = "DELETE FROM connections WHERE follower_user_id = %(follower_user_id)s AND following_user_id = %(following_user_id)s;"
        return connectToMySQL(DATABASE).query_db(query, data)