
import React, { useState } from 'react';
import axios from 'axios';

const ListingJokes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jokes, setJokes] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://icanhazdadjoke.com/search?term=${searchQuery}`, {
        headers: {
          Accept: 'application/json',
        },
      });
      setJokes(response.data.results);
    } catch (error) {
      console.error('Error fetching jokes:', error);
    }
  };

  const handleFavorite = async (joke) => {
    try {
      // Send a request to your backend to save the favorite joke
      await axios.post('/api/favorites', {
        jokeId: joke.id,
        jokeText: joke.joke,
        jokeImageUrl: joke.image,
      });
      console.log('Joke favorited:', joke);
    } catch (error) {
      console.error('Error favoriting joke:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {jokes.map((joke) => (
          <div key={joke.id}>
            <img src={joke.image} alt={joke.joke} />
            <button onClick={() => handleFavorite(joke)}>Favorite</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingJokes;
