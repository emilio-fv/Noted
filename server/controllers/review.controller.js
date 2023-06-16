const {
  createReview,
  getReviewsByAlbum,
  getReviewsByArtist,
  getReviewsByUserId,
  getReviewsByUsername,
  updateReview,
  deleteReview
} = require('../services/review.service');

const handleCreateReview = async (req, res) => {
  try {
    const reviewData = {
      ...req.body,
      user: req.decoded.id
    };

    const newReview = await createReview(reviewData);

    return res.json(newReview);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const handleGetReviewsByUserId = async (req, res) => {
  try {
    const { id } = req.decoded;
    const reviews = await getReviewsByUserId(id);
    return res.json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const handleGetReviewsByUsername = async (req, res) => {
  try {
    const reviews = await getReviewsByUsername(req.params.username);
    return res.json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const handleGetReviewsByArtist = async (req, res) => {
  try {
    const reviews = await getReviewsByArtist(req.params.artist);
    return res.json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const handleGetReviewsByAlbum = async (req, res) => {
  try {
    const reviews = await getReviewsByAlbum(req.params.album);
    return res.json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const handleDeleteReview = async (req, res) => {
  try {
    await deleteReview(req.params.id);
    return res.json({ message: "Review successfully deleted."})
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = {
  handleCreateReview,
  handleGetReviewsByUserId,
  handleGetReviewsByUsername,
  handleGetReviewsByArtist,
  handleGetReviewsByAlbum,
  handleDeleteReview
};