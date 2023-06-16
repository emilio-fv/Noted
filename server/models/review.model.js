const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String, 
    required: true
  },
  track: {
    type: String
  },
  rating: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // likes: [{
  //   types: Schema.Types.ObjectId,
  //   ref: 'User'
  // }],
  // comments: [{
  //   types: Schema.Types.ObjectId,
  //   ref: 'Comment'
  // }]
}, { timestamps: true, collection: 'reviews' });

const Review = mongoose.model("Review", reviewSchema);

module.exports = {
  Review: Review
};