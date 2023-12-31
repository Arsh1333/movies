import { useState, useEffect } from "react";
import "./App.css";
import movieImg from "./assets/movies-img.jpg";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieDetails, setMovieDetails] = useState({});
  // const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?t={${searchTerm}}&apikey=3cb18b0`)
      .then((res) => {
        setMovieDetails(res.data);
        // const movieSuggestions = res.data.results || [];
        //setSuggestions(movieSuggestions);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchTerm]);
  const handleSearch = (e) => {
    e.preventDefault();
    // The API request is now triggered by the useEffect when searchTerm changes
  };
  return (
    <>
      <nav>
        <h1 className="logo">Movies</h1>
        <ul className="nav-list">
          <li>Home</li>
          <li>Movies</li>
          <li>TV shows</li>
          <li>Explore</li>
        </ul>
      </nav>
      <div className="hero">
        <div className="img-container">
          <img src={movieImg} alt="" className="movie-img" />
          <div className="text-overlay">
            <h1 className="text-img">
              Where Every Frame Tells a Story: Your Ultimate Movie Companion
            </h1>
          </div>
        </div>
      </div>
      <div className="search">
        <form onSubmit={handleSearch}>
          {" "}
          <input
            type="text"
            className="input-movie"
            placeholder="Search movies or tv shows"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="input-movie-btn">
            Search
          </button>
        </form>
      </div>
      {movieDetails.Title && (
        <div>
          <div className="card-container">
            <img className="card-img" src={movieDetails.Poster} alt="" />

            <div className="card-content">
              <h2 className="card-content-h">{movieDetails.Title}</h2>
              <p className="card-content-font">{movieDetails.Year}</p>
              <p className="card-content-font">{movieDetails.Language}</p>
              <p className="card-content-font">{movieDetails.Genre}</p>
              <p className="card-content-font-plot">{movieDetails.Plot}</p>
              <p className="card-content-font">
                IMDB:{movieDetails.imdbRating}
              </p>
            </div>
          </div>
        </div>
      )}
      {/*suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <div className="card">
              <li>{suggestion.Title}</li>
            </div>
          ))}
        </ul>
      )*/}
    </>
  );
}

export default App;
