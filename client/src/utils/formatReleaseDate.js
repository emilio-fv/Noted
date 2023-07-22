export default function formatReleaseDate(str) {
  const releaseDate = new Date(str);
  return releaseDate.toLocaleDateString('en-us', { month: 'short', day: 'numeric', year: 'numeric'});
}