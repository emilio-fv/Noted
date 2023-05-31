# Standard Library Imports
from flask_app import DATABASE
from flask import flash

# Resource Imports
from flask_app.config.mysqlconnection import connectToMySQL
from flask_app.models.user_model import User

# Review Model
class Review:
    def __init__(self, data):
        self.id = data['id']
        self.album_id = data['album_id']
        self.album_name = data['album_name']
        self.artist_name = data['artist_name']
        self.img_url = data['img_url']
        self.date = data['date']
        self.rating = data['rating']
        self.text = data['text']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.user_id = data['user_id']

    # Create Review
    @classmethod 
    def create(self, data):
        query = "INSERT INTO reviews (album_id, album_name, artist_name, img_url, date, rating, text, user_id) VALUES (%(album_id)s, %(album_name)s, %(artist_name)s, %(img_url)s, %(date)s, %(rating)s, %(text)s, %(user_id)s);"
        return connectToMySQL(DATABASE).query_db(query, data)

    # Get Reviews By User Id
    @classmethod 
    def get_all_by_user_id(self, data):
        query = "SELECT * FROM reviews JOIN users ON reviews.user_id = users.id WHERE reviews.user_id = %(user_id)s;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        if len(results) > 0:
            all_reviews = []
            for row in results:
                review_data = {
                    **row
                }
                this_review = Review(review_data)
                user_data = {
                    **row,
                    'id': row['users.id'],
                    'created_at': row['users.created_at'],
                    'updated_at': row['users.updated_at']
                }
                this_user = User(user_data)
                this_review.user = this_user
                all_reviews.append(this_review)
            return all_reviews
        return []

    # Get Review by Review Id
    @classmethod 
    def get_one_by_id(self, data):
        query = "SELECT * FROM reviews WHERE id = %(id)s;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        if len(results) > 0:
            this_review = self(results[0])
            return this_review
        return []

    # Get all reviews not by logged in user
    @classmethod 
    def get_all(self, data):
        query = "SELECT * FROM reviews JOIN users ON reviews.user_id = users.id WHERE reviews.user_id <> %(user_id)s;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        if results:
            all_reviews = []
            for row in results:
                review_data = {
                    **row
                }
                this_review = Review(review_data)
                user_data = {
                    **row,
                    'id': row['users.id'],
                    'created_at': row['users.created_at'],
                    'updated_at': row['users.updated_at']
                }
                this_user = User(user_data)
                this_review.user = this_user
                all_reviews.append(this_review)
            return all_reviews
        return []

    # Get count of all artists reviewed
    @classmethod 
    def get_count_all_artists(self, data):
        query = "SELECT COUNT(DISTINCT artist_name) AS num FROM reviews WHERE user_id = %(user_id)s;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        return results[0]

    # Get count of current year reviews
    @classmethod  
    def get_count_of_current_year_reviews(self, data):
        query = "SELECT COUNT(*) AS num FROM reviews WHERE user_id = %(user_id)s AND date >= '2022-01-01';"
        results = connectToMySQL(DATABASE).query_db(query, data)
        return results[0]

    # Get top rated reviews
    @classmethod 
    def get_top_rated_of_user(self, data):
        query = "SELECT * FROM reviews WHERE user_id = %(user_id)s ORDER BY rating DESC LIMIT 5;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        if results: 
            all_reviews = []
            for row in results:
                review_data = {
                    **row
                }
                this_review = Review(review_data)
                all_reviews.append(this_review)
            return all_reviews
        return []

    # Get latest reviews by user
    @classmethod 
    def get_latest_by_user(self, data):
        query = "SELECT * FROM reviews WHERE user_id = %(user_id)s ORDER BY created_at DESC LIMIT 5;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        if results:
            all_reviews = []
            for row in results:
                review_data = {
                    **row
                }
                this_review = Review(review_data)
                all_reviews.append(this_review)
            return all_reviews
        return []

    # Get all by album name
    @classmethod 
    def get_all_by_album(self, data):
        query = "SELECT * FROM reviews JOIN users ON reviews.user_id = users.id WHERE album_name = %(album_name)s;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        if results:
            all_reviews = []
            for row in results:
                review_data = {
                    **row
                }
                this_review = Review(review_data)
                user_data = {
                    **row,
                    'id': row['users.id'],
                    'created_at': row['users.created_at'],
                    'updated_at': row['users.updated_at']
                }
                this_user = User(user_data)
                this_review.user = this_user
                all_reviews.append(this_review)
            return all_reviews
        return []

    # Get all by album id
    @classmethod 
    def get_all_by_album_id(self, data):
        query = "SELECT * FROM reviews JOIN users ON reviews.user_id = users.id WHERE album_id = %(album_id)s;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        if results:
            all_reviews = []
            for row in results:
                review_data = {
                    **row
                }
                this_review = Review(review_data)
                user_data = {
                    **row,
                    'id': row['users.id'],
                    'created_at': row['users.created_at'],
                    'updated_at': row['users.updated_at']
                }
                this_user = User(user_data)
                this_review.user = this_user
                all_reviews.append(this_review)
            return all_reviews
        return []

    # Get all by artist 
    @classmethod 
    def get_all_by_artist(self, data):
        query = "SELECT * FROM reviews JOIN users ON reviews.user_id = users.id WHERE artist_name = %(artist_name)s;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        if results:
            all_reviews = []
            for row in results:
                review_data = {
                    **row
                }
                this_review = Review(review_data)
                user_data = {
                    **row,
                    'id': row['users.id'],
                    'created_at': row['users.created_at'],
                    'updated_at': row['users.updated_at']
                }
                this_user = User(user_data)
                this_review.user = this_user
                all_reviews.append(this_review)
            return all_reviews
        return []

    # @classmethod # Get all by artist name for all users
    # def get_all_by_artist_all_users(self, data):
    #     query = "SELECT * FROM reviews WHERE artist_name = %(artist_name)s;"
    #     results = connectToMySQL(DATABASE).query_db(query, data)
    #     if results:
    #         all_reviews = []
    #         for row in results:
    #             review_data = {
    #                 **row
    #             }

    #             this_review = Review(review_data)
    #             user

    # Get all by username
    @classmethod 
    def get_all_by_username(self, data):
        query = "SELECT * FROM reviews JOIN users ON reviews.user_id = users.id WHERE username = %(username)s;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        if results:
            all_reviews = []
            for row in results:
                review_data = {
                    **row
                }
                this_review = Review(review_data)
                user_data = {
                    **row,
                    'id': row['users.id'],
                    'created_at': row['users.created_at'],
                    'updated_at': row['users.updated_at']
                }
                this_user = User(user_data)
                this_review.user = this_user
                all_reviews.append(this_review)
            return all_reviews
        return []

    # Get latest by all users 
    @classmethod 
    def get_recent_reviews(self, data):
        query = "SELECT * FROM reviews JOIN users ON reviews.user_id = users.id WHERE reviews.user_id <> %(user_id)s ORDER BY reviews.created_at DESC LIMIT 6;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        if results:
            all_reviews = []
            for row in results:
                review_data = {
                    **row
                }
                this_review = Review(review_data)
                user_data = {
                    **row,
                    'id': row['users.id'],
                    'created_at': row['users.created_at'],
                    'updated_at': row['users.updated_at']
                }
                this_user = User(user_data)
                this_review.user = this_user
                all_reviews.append(this_review)
            return all_reviews
        return []

    # Delete review by id
    @classmethod 
    def delete(self, data):
        query = "DELETE FROM reviews WHERE reviews.id = %(id)s;"
        return connectToMySQL(DATABASE).query_db(query, data)