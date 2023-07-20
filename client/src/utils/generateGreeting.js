export default function generateGreeting() {
  const now = new Date();
  const currentTime = now.getHours();

  // 0 to 12
  if (currentTime >= 0 && currentTime < 12) {
    return 'Good morning'
  }

  // 12 to 17
  if (currentTime >= 12 && currentTime < 17) {
    return 'Good afternoon'
  }

  // 17 to 24
  if (currentTime >= 17) {
    return 'Good evening'
  }
}