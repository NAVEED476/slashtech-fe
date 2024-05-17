import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const addFavoriteJoke = async (jokeId, jokeText, jokeImageUrl) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/favorites`, {
      jokeId,
      jokeText,
      jokeImageUrl,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding favorite joke:', error);
    throw error;
  }
};

export const getFavoriteJokes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/favorites`);
    return response.data;
  } catch (error) {
    console.error('Error getting favorite jokes:', error);
    throw error;
  }
};