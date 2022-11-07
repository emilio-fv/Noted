from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import DATABASE
from flask import flash
from flask_app.models.user_model import User

class Review:
    def __init__(self, data):
        self.id = data['id']
        self.album_id = data['album_id']
        self.date = data['date']
        self.rating = data['rating']
        self.review = data['review']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.user_id = data['user_id']

# ==== CREATE ====
    @classmethod # Create new review
    def create(self, data):
        query = "INSERT INTO reviews (album_id, date, rating, review, user_id) VALUES (%(album_id)s, %(date)s, %(rating)s, %(review)s, %(user_id)s);"
        return connectToMySQL(DATABASE).query_db(query, data)

# ==== READ ====
    @classmethod # Get reviews by user id
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

    @classmethod # Get one review by id
    def get_one_by_id(self, data):
        query = "SELECT * FROM reviews WHERE id = %(id)s;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        if len(results) > 0:
            this_review = self(results[0])
            return this_review
        return False

# ==== UPDATE ====

# ==== DELETE ====
    @classmethod # Delete review by id
    def delete(self, data):
        query = "DELETE FROM reviews WHERE reviews.id = %{id}s;"
        return connectToMySQL(DATABASE).query_db(query, data)

# ==== STATIC ====