from flask_app.config.mysqlconnection import connectToMySQL
from flask_app import DATABASE
# TODO: Add related model files if needed
from flask import flash
import re
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+[a-zA-Z]+$')

class User:
    def __init__(self, data):
        self.id = data['id']
        self.username = data['username']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

# ==== CREATE ====
    @classmethod # Create new user
    def create(self,data):
        query = "INSERT INTO users (username, first_name, last_name, email, password) VALUES (%(username)s, %(first_name)s, %(last_name)s, %(email)s, %(password)s);"
        return connectToMySQL(DATABASE).query_db(query, data)

# ==== READ ====
    @classmethod # Get a user's data by id
    def get_one_by_id(self, data):
        query = "SELECT * FROM users WHERE id = %(id)s;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        if results: # Parse through data
            user = User(results[0]) # Create instance of user
            return user # Return instance
        return False

    @classmethod # Get user's data by email
    def get_one_by_email(self, data):
        query = "SELECT * FROM users WHERE email = %(email)s;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        if results:
            user = User(results[0])
            return user
        return False

    @classmethod # Query database with search category 
    def get_many_by_user_input(self, data):
        if data['category'] == 'username':
            query = "SELECT * FROM users WHERE username = %(input)s;"
        if data['category'] == 'email':
            query = "SELECT * FROM users WHERE email = %(input)s;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        if results:
            all_users = []
            for row in results:
                user_data = {
                    **row
                }
                this_user = self(user_data)
                all_users.append(this_user)
            return all_users
        return []

# ==== UPDATE ====

# ==== DELETE ====

# ==== STATIC ====
    @staticmethod # Validate register form data
    def validate(user_data):
        is_valid = True
        username_len = len(user_data['username'])
        first_name_len = len(user_data['first_name'])
        last_name_len = len(user_data['last_name']) 
        email_len = user_data['email']
        if username_len < 1 or first_name_len < 1 or last_name_len < 1 or not email_len : # Check if username, first name, last name, is provided
            flash("All fields required.", "reg")
            is_valid = False
        elif not EMAIL_REGEX.match(user_data['email']): # Check if email is valid 
            flash("Invalid email format.", "reg")
            is_valid = False
        else: # Check if email is already in database
            data = {'email': user_data['email']}
            potential_user = User.get_one_by_email(data)
            if potential_user:
                flash("Email already registered.", "reg")
                is_valid = False
        if len(user_data['password']) < 8: # Check if password is at least 8 characters
            flash("Password must be at least 8 characters.", "reg")
            is_valid = False
        elif not user_data['password'] == user_data['confirm_password']: # password confirmation matches password
            flash("Passwords don't match.", "reg")
            is_valid = False
        return is_valid