import axios from 'axios';

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

export const fetchImages = async (query, page = 1) => {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query,
        page,
        per_page: 12,
        client_id: import.meta.env.VITE_ACCESS_KEY,
      },
    });

    return {
      results: response.data.results || [],
      total_pages: response.data.total_pages || 1,
    };
  } catch (error) {
    console.error('Error fetching images:', error.response?.data || error);
    return { results: [], total_pages: 1 };
  }
};
