// Curated list of high-quality background images from Unsplash
// Using direct image URLs for reliable loading
export const backgrounds = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80", // Mountains at sunrise
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80", // Mountain lake
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1920&q=80", // Forest path
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1920&q=80", // Waterfall
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80", // Foggy mountains
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80", // Lake reflection
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1920&q=80", // Green valley
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80", // Ocean sunset
  "https://images.unsplash.com/photo-1518173946687-a4c036bc4de4?w=1920&q=80", // Northern lights
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80", // Mountain peak
];

export function getRandomBackground(): string {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}
