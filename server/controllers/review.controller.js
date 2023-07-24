// Imports
const {
  createReview,
  getReviewsByAlbumId,
  getReviewsNotByUserId,
  getReviewsByArtistId,
  getReviewsByUserId,
  getReviewsByUsername,
  updateReview,
  deleteReview
} = require('../services/review.service');

const handleCreateReview = async (req, res) => {
  // Log controller method
  console.log("Controller: handleCreateReview");

  try {
    // Configure review data
    const reviewData = {
      ...req.body,
      user: req.decoded.userId
    };

    // Create new review
    const newReview = await createReview(reviewData);

    // Return new review
    return res.json(newReview);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const handleGetLoggedInUsersReviews = async (req, res) => {
  // Log controller method
  console.log("Controller: handleGetLoggedInUsersReviews");

  try {
    // Extract logged in user's id
    const { userId } = req.decoded;
    
    // Get reviews by user id
    const reviews = await getReviewsByUserId(userId);

    // Return found reviews
    return res.json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const handleGetOtherReviews = async (req, res) => {
  // Log controller method
  console.log("Controller: handleGetOtherReviews");

  try {
    const { userId } = req.decoded;
    const reviews = await getReviewsNotByUserId(userId);
    return res.json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const handleGetReviewsByUsername = async (req, res) => {
  // Log controller method
  console.log("Controller: handleGetReviewsByUsername");

  try {
    // Extract username
    const { username } = req.params;

    // Get reviews by username
    const reviews = await getReviewsByUsername(username);

    // Return found reviews
    return res.json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const handleGetReviewsByArtistId = async (req, res) => {
  // Log controller method
  console.log("Controller: handleGetReviewsByArtistId");

  try {
    // Extract artist id
    const { artistId } = req.params;

    // Get reviews by artist id
    const reviews = await getReviewsByArtistId(artistId);

    // Return found reviews
    return res.json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const handleGetReviewsByAlbumId = async (req, res) => {
  // Log controller method
  console.log("Controller: handleGetReviewsByAlbumId");

  try {
    // Extract album id
    const { albumId } = req.params;

    // Get reviews by album id
    const reviews = await getReviewsByAlbumId(albumId);

    // Return found reviews
    return res.json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// TODO handleUpdateReviewById
// const handleUpdateReviewById = async (req, res) => {
//   // Log controller method
//   console.log("Controller: handleUpdateReviewById");

//   try {
//     // Configure review data
//     // Call review data service
//     // Return response
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json(error);
//   }
// }

const handleDeleteReviewById = async (req, res) => {
  // Log controller method
  console.log("Controller: handleDeleteReviewById");

  try {
    // Extract review id
    const { reviewId } = req.params;

    // Delete review by id
    await deleteReview(reviewId);

    // Return success message
    return res.json({ message: "Review successfully deleted."})
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// Exports
module.exports = {
  handleCreateReview,
  handleGetLoggedInUsersReviews,
  handleGetOtherReviews,
  handleGetReviewsByUsername,
  handleGetReviewsByArtistId,
  handleGetReviewsByAlbumId,
  handleDeleteReviewById
};