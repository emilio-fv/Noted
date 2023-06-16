const express = require('express');

const {
  verifyJWT
} = require('../middleware/verifyJWT');

const {
  handleCreateReview,
  handleGetReviewsByUserId,
  handleGetReviewsByUsername,
  handleGetReviewsByArtistId,
  handleGetReviewsByAlbumId,
  handleDeleteReview
} = require('../controllers/review.controller');

const router = express.Router();

router.post('/create', verifyJWT, handleCreateReview);
router.get('/userId', verifyJWT, handleGetReviewsByUserId);
router.get('/:username/username', verifyJWT, handleGetReviewsByUsername);
router.get('/:artistId/artist', verifyJWT, handleGetReviewsByArtistId);
router.get('/:albumId/album', verifyJWT, handleGetReviewsByAlbumId);
router.delete('/:id', verifyJWT, handleDeleteReview);

module.exports = {
  reviewRouter: router
};