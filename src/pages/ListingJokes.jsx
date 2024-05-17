import React, { useEffect, useState } from "react";
import axios from "axios";
import "./listing.css";

const ListingJokes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [jokes, setJokes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const fetchJokes = async () => {
    try {
      const response = await axios.get(
        `https://icanhazdadjoke.com/search?term=${searchQuery}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      setJokes(response.data.results);
    } catch (error) {
      console.error("Error fetching jokes:", error);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, [searchQuery, currentPage, limit]);

  const handleFavorite = async (joke) => {
    try {
      await axios.post("http://localhost:5000/api/favorites", {
        jokeId: joke.id,
        jokeText: joke.joke,
        jokeImageUrl: joke.image,
      });
      console.log("Joke favorited:", joke);
    } catch (error) {
      console.error("Error favoriting joke:", error);
    }
  };

  return (
    <div className="listing-cont">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for dad jokes..."
      />
      <div className="jokes-cont">
        {jokes.map((joke) => (
          <div key={joke.id} className="jokes-card">
            <img
              style={{ width: "300px", height: "100px", objectFit: "contain" }}
              src={`https://icanhazdadjoke.com/j/${joke.id}.png`}
              alt="Dad Joke"
            />
            <button onClick={() => handleFavorite(joke)}>Favorite</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingJokes;
