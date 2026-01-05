const photoIds = [
  "1506905925346-21bda4d32df4",
  "1469474968028-56623f02e42e",
  "1447752875215-b2761acb3c5d",
  "1433086966358-54859d0ed716",
  "1470071459604-3b5ec3a7fe05",
  "1501785888041-af3ef285b470",
  "1472214103451-9374bd1c798e",
  "1464822759023-fed622ff2c3b",
  "1767288832047-7d23f6c8c26c",
];

function getToday(): string {
  return new Date().toISOString().split("T")[0]!;
}

interface BackgroundStorage {
  date: string;
  photoId: string;
  previousPhotoId: string | null;
}

export function getDailyBackground(): string {
  const today = getToday();
  const stored = localStorage.getItem("background");

  if (stored) {
    const { date, photoId } = JSON.parse(stored) as BackgroundStorage;

    // Same day? Return the stored background
    if (date === today) {
      return `https://images.unsplash.com/photo-${photoId}?w=1920&q=80`;
    }

    // New day: pick a different photo than yesterday's
    const availablePhotos = photoIds.filter((id) => id !== photoId);
    const newPhotoId =
      availablePhotos[Math.floor(Math.random() * availablePhotos.length)];

    localStorage.setItem(
      "background",
      JSON.stringify({
        date: today,
        photoId: newPhotoId,
        previousPhotoId: photoId,
      } as BackgroundStorage)
    );

    return `https://images.unsplash.com/photo-${newPhotoId}?w=1920&q=80`;
  }

  // First time: pick any random photo
  const photoId = photoIds[Math.floor(Math.random() * photoIds.length)];
  localStorage.setItem(
    "background",
    JSON.stringify({
      date: today,
      photoId,
      previousPhotoId: null,
    } as BackgroundStorage)
  );

  return `https://images.unsplash.com/photo-${photoId}?w=1920&q=80`;
}
