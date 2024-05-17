import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('/api/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Favorite Jokes</h1>
      {favorites.length === 0 ? (
        <p>You don't have any favorite jokes yet.</p>
      ) : (
        <div className="row">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={favorite.joke_image_url}
                  className="card-img-top"
                  alt="Joke"
                />
                <div className="card-body">
                  <p className="card-text">{favorite.joke_text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;