export default function formatReleaseDate(str) {
  const releaseDate = new Date(str);
  return releaseDate.getFullYear();
}