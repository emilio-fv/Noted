const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email."
    }
  },
  password: {
    type: String,
    required: true,
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true, collection: 'users' });

// Confirm Password Virtual Field
userSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set(value => this._confirmPassword = value);

// Validate Confirm Password
userSchema.pre('validate', function(next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords must match.")
  }
  next();
})

// Hash Password
userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    })
})

const User = mongoose.model("User", userSchema);

module.exports = { 
  User: User 
};