export default function calculateAverageRating(reviews) {
  // Handle no reviews
  if (!reviews || reviews.length === 0) {
    return 0;
  }

  // Instantiate count and sum variables
  let count = reviews.length;
  let sum = 0;

  // Iterate over ratings
  for (let i = 0; i < count; i++) {
    sum += reviews[i].rating;
  }

  // Return average
  return sum / count;
}