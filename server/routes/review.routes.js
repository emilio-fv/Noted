// Imports
const express = require('express');
const {
  verifyAccessToken
} = require('../middleware/verifyAccessToken')
const {
  handleCreateReview,
  handleGetLoggedInUsersReviews,
  handleGetOtherReviews,
  handleGetReviewsByUsername,
  handleGetReviewsByArtistId,
  handleGetReviewsByAlbumId,
  handleDeleteReviewById
} = require('../controllers/review.controller');

// Instantiate router
const router = express.Router();

// API Endpoints
router.post('/create', verifyAccessToken, handleCreateReview);
router.get('/loggedInUser', verifyAccessToken, handleGetLoggedInUsersReviews);
router.get('/allOthers', verifyAccessToken, handleGetOtherReviews);
router.get('/:artistId/artist', verifyAccessToken, handleGetReviewsByArtistId);
router.get('/:albumId/album', verifyAccessToken, handleGetReviewsByAlbumId);
// router.get('/:username/username', verifyAccessToken, handleGetReviewsByUsername);
// router.delete('/:id', verifyAccessToken, handleDeleteReviewById);

// Exports
module.exports = {
  reviewRouter: router
};