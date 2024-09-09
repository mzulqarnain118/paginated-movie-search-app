import React, { useState, useEffect } from "react";
import "./App.css";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import { fetchMovies, fetchAuthToken, fetchMovieGenres } from "./service/api";
import Loader from "react-js-loader";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      setLoading(true);
      try {
        const tokenData = await fetchAuthToken();
        setToken(tokenData.token);
        localStorage.setItem("token", tokenData.token);
      } catch (error) {
        console.error("Failed to fetch token: ", error);
      }
      setLoading(false);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const genresData = await fetchMovieGenres();
        setGenres(genresData.data);
      } catch (error) {
        console.error("Failed to fetch genres: ", error);
      }
      setLoading(false);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const searchMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchMovies(query, page, selectedGenre);
        setMovies(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch movies: ", error);
      }
      setLoading(false);
    };
    token && searchMovies();
  }, [query, page, selectedGenre, token]);

  const handleSearch = (query) => {
    setQuery(query);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setPage(1);
  };

  return (
    <div className="app">
      <h1>Movie Search</h1>
      <div className="search-bar">
        <SearchBar onSearch={handleSearch} />
        <select
          value={selectedGenre}
          onChange={(e) => handleGenreChange(e.target.value)}
          className="search-input-style"
        >
          <option value="">Select a genre</option>
          {genres?.map((genre) => (
            <option key={genre?.id} value={genre?.title}>
              {genre?.title}
            </option>
          ))}
        </select>
      </div>
      <div className="movie-list">
        {loading ? (
          <Loader
            type="bubble-spin"
            title={"Loading..."}
            size={100}
            className="spinner"
          />
        ) : (
          movies?.map((movie) => <MovieCard key={movie?.id} movie={movie} />)
        )}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
