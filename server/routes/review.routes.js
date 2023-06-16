const express = require('express');

const {
  verifyJWT
} = require('../middleware/verifyJWT');

const {
  handleCreateReview,
  handleGetReviewsByUserId,
  handleGetReviewsByUsername,
  handleGetReviewsByArtist,
  handleGetReviewsByAlbum,
  handleDeleteReview
} = require('../controllers/review.controller');

const router = express.Router();

router.post('/create', verifyJWT, handleCreateReview);
router.get('/userId', verifyJWT, handleGetReviewsByUserId);
router.get('/:username/username', verifyJWT, handleGetReviewsByUsername);
router.get('/:artist/artist', verifyJWT, handleGetReviewsByArtist);
router.get('/:album/album', verifyJWT, handleGetReviewsByAlbum);
router.delete('/:id', verifyJWT, handleDeleteReview);

module.exports = {
  reviewRouter: router
};