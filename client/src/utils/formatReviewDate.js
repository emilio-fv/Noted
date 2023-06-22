export default function formatReviewDate(date) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-us', { month: 'short', day: 'numeric' });
}