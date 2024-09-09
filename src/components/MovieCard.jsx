import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={movie?.posterUrl ?? "https://via.placeholder.com/600"}
        alt={`${movie?.title} Poster`}
        loading="lazy"
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "500px",
          maxHeight: "500px",
        }}
      />
      <div className="movie-info">
        <h3>{movie?.title}</h3>
        <p>{movie?.summary}</p>
        <p>
          <strong>Duration:</strong> {movie?.duration}
        </p>
        <p>
          <strong>Rating:</strong> {movie?.rating}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
