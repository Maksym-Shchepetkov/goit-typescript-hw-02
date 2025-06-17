import axios from "axios";
import type { ResultsData } from "../components/App/App";

const key = "8OOPE-y2t239SntdN150iAqUHy5HuwDQFrKAKj6BEho";

const handleGetPhotos = async (
  query: string,
  page: number
): Promise<ResultsData> => {
  const selectedPhotos = await axios.get<ResultsData>(
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
