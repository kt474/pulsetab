const photoIds = [
  {
    id: "1506905925346-21bda4d32df4",
    url: "https://unsplash.com/photos/aerial-photo-of-foggy-mountains-1527pjeb6jg",
  },
  {
    id: "1469474968028-56623f02e42e",
    url: "https://unsplash.com/photos/landscape-photography-of-mountain-hit-by-sun-rays-78A265wPiO4",
  },
  {
    id: "1447752875215-b2761acb3c5d",
    url: "https://unsplash.com/photos/blue-and-brown-steel-bridge-eOpewngf68w",
  },
  {
    id: "1433086966358-54859d0ed716",
    url: "https://unsplash.com/photos/gray-concrete-bridge-and-waterfalls-during-daytime-cssvEZacHvQ",
  },
  {
    id: "1470071459604-3b5ec3a7fe05",
    url: "https://unsplash.com/photos/foggy-mountain-summit-1Z2niiBPg5A",
  },
  {
    id: "1501785888041-af3ef285b470",
    url: "https://unsplash.com/photos/three-brown-wooden-boat-on-blue-lake-water-taken-at-daytime-T7K4aEPoGGk",
  },
  {
    id: "1472214103451-9374bd1c798e",
    url: "https://unsplash.com/photos/green-grass-field-during-sunset-_RBcxo9AU-U",
  },
  {
    id: "1464822759023-fed622ff2c3b",
    url: "https://unsplash.com/photos/green-mountain-across-body-of-water-Bkci_8qcdvQ",
  },
  {
    id: "1767288832047-7d23f6c8c26c",
    url: "https://unsplash.com/photos/a-small-blue-tit-bird-perched-on-a-thin-branch-g30TR85fjt4",
  },
  {
    id: "1766859813732-20a127bb6023",
    url: "https://unsplash.com/photos/castle-ruins-on-a-hill-above-the-fog-at-sunrise-CEX9Y1gZQjg",
  },
  {
    id: "1766933366411-7a921aebe181",
    url: "https://unsplash.com/photos/jagged-mountain-peaks-illuminated-by-golden-hour-sunlight-Q8cUF6c2ytM",
  },
  {
    id: "1765871319901-0aaafe3f1a2a",
    url: "https://unsplash.com/photos/misty-forest-valley-with-mountains-in-background-oYEGPZebzGw",
  },
  {
    id: "1765476608471-c30c09564def",
    url: "https://unsplash.com/photos/snowy-mountains-under-a-starry-night-sky-SumjjLhysZM",
  },
  {
    id: "1764790355989-8ec00467f547",
    url: "https://unsplash.com/photos/river-flows-through-canyon-with-moonlit-mountains-at-dusk-xNuBvTXkdT4",
  },
  {
    id: "1737599136606-3bc63d4d3c52",
    url: "https://unsplash.com/photos/a-view-of-a-mountain-range-from-a-distance-NVtdpWi1PQE",
  },
  {
    id: "1764014588235-d339ae275f19",
    url: "https://unsplash.com/photos/snow-covered-mountains-under-a-soft-pink-sky-UvibuOZKKc4",
  },
  {
    id: "1761872936185-4ece7c1128ab",
    url: "https://unsplash.com/photos/crescent-moon-above-snow-capped-mountains-at-dusk-M2CHE5EDmo8",
  },
  {
    id: "1757918637010-214f0a48ee2d",
    url: "https://unsplash.com/photos/star-trails-in-a-night-sky-over-trees-Asi4unAq4us",
  },
  {
    id: "1758351754305-fe00523aaefe",
    url: "https://unsplash.com/photos/mountain-peak-emerging-from-dense-fog-SlFfF7DO-mA",
  },
  {
    id: "1484950763426-56b5bf172dbb",
    url: "https://unsplash.com/photos/silhouette-of-off-road-car-h8nxGssjQXs",
  },
  {
    id: "1756134904044-1cf7868cb9de",
    url: "https://unsplash.com/photos/sunlight-shines-through-ancient-mossy-tree-branches-HHRckNv-gK8",
  },
  {
    id: "1541753236788-b0ac1fc5009d",
    url: "https://unsplash.com/photos/snow-capped-mountains-during-daytime-T-FSAK4Bv9c",
  },
  {
    id: "1542676032-6e468ada2953",
    url: "https://unsplash.com/photos/white-house-near-shore-ePW8U7EoF54",
  },
  {
    id: "1542856391-010fb87dcfed",
    url: "https://unsplash.com/photos/2-person-on-boat-at-lake-during-daytime-TApAkERW5pQ",
  },
  {
    id: "1754386341683-9d713eeda7ed",
    url: "https://unsplash.com/photos/mountains-and-a-serene-lake-under-cloudy-skies-FgKADEDCktM",
  },
  {
    id: "1527086983597-b4d44c4a66d0",
    url: "https://unsplash.com/photos/suspension-bridge-under-cloudy-sky-_q4-ykeXOPE",
  },
  {
    id: "1731432245325-d820144afe4a",
    url: "https://unsplash.com/photos/a-mountain-covered-in-snow-under-a-cloudy-sky-mGx5-xt1uec",
  },
  {
    id: "1731351621470-8aebda14d242",
    url: "https://unsplash.com/photos/an-aerial-view-of-a-city-at-night-k5OMsFK0gOg",
  },
];

function getToday(): string {
  return new Date().toISOString().split("T")[0]!;
}

interface BackgroundStorage {
  date: string;
  photoId: string;
  previousPhotoId: string | null;
}

export function refreshBackground(): string {
  const today = getToday();
  const stored = localStorage.getItem("background");
  let currentPhotoId = "";

  if (stored) {
    const { photoId } = JSON.parse(stored) as BackgroundStorage;
    currentPhotoId = photoId;
  }

  const availablePhotos = photoIds.filter(
    (photo) => photo.id !== currentPhotoId
  );
  const newPhotoId =
    availablePhotos[Math.floor(Math.random() * availablePhotos.length)];

  localStorage.setItem(
    "background",
    JSON.stringify({
      date: today,
      photoId: newPhotoId?.id,
      previousPhotoId: currentPhotoId,
      url: newPhotoId?.url,
    } as BackgroundStorage)
  );
  return `https://images.unsplash.com/photo-${newPhotoId?.id}?w=2560&q=90`;
}

export function getDailyBackground(): string {
  const today = getToday();
  const stored = localStorage.getItem("background");

  if (stored) {
    const { date, photoId } = JSON.parse(stored) as BackgroundStorage;

    // Same day? Return the stored background
    if (date === today) {
      return `https://images.unsplash.com/photo-${photoId}?w=2560&q=90`;
    }
  }

  // New day or first time: pick a new one
  return refreshBackground();
}
