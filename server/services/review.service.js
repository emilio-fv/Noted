// Imports
const { User } = require('../models/user.model');
const { Review } = require('../models/review.model');

// Create review
const createReview = async (data) => {
  // Add review to db
  const newReview = await Review.create(data);

  // Update user's record
  await User.updateOne({ _id: newReview.user }, { $push: { reviews: newReview._id }});

  // return new review
  return newReview;
};

// Get reviews by user id
const getReviewsByUserId = async (id) => {
  // Query db for reviews by user id
  const foundReviews = await Review.find({ user: id }).sort({ createdAt: 'desc' });

  // Return found reviews
  return foundReviews;
};

// Get reviews by other users
const getReviewsNotByUserId = async (id) => {
  // Query db for reviews by other users
  const foundReviews = await Review.find({ user: { $not: { $eq: id }} }).populate('user').sort({ createdAt: 'desc' });

  // Return found reviews
  return foundReviews;
}

// Get reviews by username
const getReviewsByUsername = async (username) => {
  // Query db for user by username and populate reviews
  const foundUser = await User.findOne({ username: username }).populate('reviews');

  // Extract reviews
  const foundReviews = foundUser.reviews;

  // Return found reviews
  return foundReviews;
}

// Get reviews by artist
const getReviewsByArtistId = async (artistId) => {
  // Query db for reviews by artist id
  const foundReviews = await Review.find({ artistId: artistId }).populate('user').sort({ createdAt: 'desc' });

  // Return found reviews
  return foundReviews;
}

// Get reviews by album
const getReviewsByAlbumId = async (albumId) => {
  // Query db for reviews by album id
  const foundReviews = await Review.find({ albumId: albumId }).populate('user').sort({ createdAt: 'desc' });
  
  // Return found reviews
  return foundReviews;
}

// Update review
const updateReview = async (id, data) => {
  // Update review
  const updatedReview = await Review.updateOne({ _id: id}, data);

  // Return updated review
  return updatedReview;
}

// Delete review
const deleteReview = async (id) => {
  // Delete review from db
  const deletedReview = await Review.findByIdAndDelete({ _id: id });

  // Update user's record
  await User.updateOne({ _id: deletedReview.user }, { $pull: { reviews: deletedReview._id } });

  // Return deleted review
  return deletedReview;
};

// Exports
module.exports = {
  createReview,
  getReviewsByUserId,
  getReviewsNotByUserId,
  getReviewsByAlbumId,
  getReviewsByArtistId,
  getReviewsByUsername,
  updateReview,
  deleteReview
};