import axios from "axios";

const key = "8OOPE-y2t239SntdN150iAqUHy5HuwDQFrKAKj6BEho";

const handleGetPhotos = async (query, page) => {
  const selectedPhotos = await axios.get(
    "https://api.unsplash.com/search/photos",
    {
      params: {
        client_id: key,
        query: query,
        page: page,
        per_page: 30,
      },
    }
  );

  return selectedPhotos.data;
};

export default handleGetPhotos;
