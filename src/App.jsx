import { useState, useEffect } from "react";
import "./App.css";
import movieImg from "./assets/movies-img.jpg";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieDetails, setMovieDetails] = useState(null);
  useEffect(() => {
    axios
      .get(`http://www.omdbapi.com/?t={${searchTerm}}&apikey=3cb18b0`)
      .then((res) => {
        setMovieDetails(res.data);
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
      {movieDetails && (
        <div>
          <p>
            {" "}
            <p>Title: {movieDetails.Title}</p>
          </p>
        </div>
      )}
    </>
  );
}

export default App;
