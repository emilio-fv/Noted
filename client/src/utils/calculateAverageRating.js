export default function calculateAverageRating(reviews) {
  if (!reviews || reviews.length === 0) {
    return 0;
  }

  let count = reviews.length;
  let sum = 0;
  for (let i = 0; i < count; i++) {
    sum += reviews[i].rating;
  }
  return sum / count;
}