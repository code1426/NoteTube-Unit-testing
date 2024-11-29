import axios from "axios";
import { VideoQueryResult } from "../types/video.types";

const getVideosSuggestion = async (query: string) => {
  try {
    const response = await axios.get<VideoQueryResult>(
      import.meta.env.VITE_YOUTUBE_SEARCH_API_URL,
      {
        params: {
          part: "snippet",
          q: query,
          type: "videos",
          maxResults: 5,
          key: import.meta.env.VITE_YOUTUBE_API_KEY,
        },
      },
    );

    return response.data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default,
    }));
  } catch (error: unknown) {
    console.error(error);
  }
};

export default getVideosSuggestion;
