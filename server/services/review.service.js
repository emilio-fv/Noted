const { User } = require('../models/user.model');
const { Review } = require('../models/review.model');

const createReview = async (data) => {
  const newReview = await Review.create(data);
  await User.updateOne({ _id: newReview.user }, { $push: { reviews: newReview._id }});
  return newReview;
};

const getReviewsByUserId = async (id) => {
  const foundReviews = await Review.find({ user: id });
  return foundReviews;
};

const getReviewsByUsername = async (username) => {
  const foundUser = await User.findOne({ username: username }).populate('reviews');
  const reviews = foundUser.reviews;
  return reviews;
}

const getReviewsByArtistId = async (artistId) => {
  const foundReviews = await Review.find({ artistId: artistId });
  return foundReviews;
}

const getReviewsByAlbumId = async (albumId) => {
  const foundReviews = await Review.find({ album: albumId });
  return foundReviews;
}

const updateReview = async (id, data) => {
  const updatedReview = await Review.updateOne({ _id: id}, data);
  return updatedReview;
}

const deleteReview = async (id) => {
  const deletedReview = await Review.findByIdAndDelete({ _id: id });
  await User.updateOne({ _id: deletedReview.user }, { $pull: { reviews: deletedReview._id } });
  return deletedReview;
};

module.exports = {
  createReview,
  getReviewsByUserId,
  getReviewsByAlbumId,
  getReviewsByArtistId,
  getReviewsByUsername,
  updateReview,
  deleteReview
};