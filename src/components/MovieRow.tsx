import React, { useRef } from "react";
import "./styles/MovieRow.css";

interface MovieRowProps {
  title: string;
  movies: { poster_path: string; title?: string; name?: string }[];
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
  const rowRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    const { current: container } = rowRef;
    if (container) {
      const scrollAmount =
        direction === "left" ? -container.clientWidth : container.clientWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="movie-row-container">
      <h2 className="movie-row-title">{title}</h2>
      <div
        className="movie-row-wrapper"
        onMouseEnter={() => (rowRef.current!.style.overflowX = "scroll")}
        onMouseLeave={() => (rowRef.current!.style.overflowX = "hidden")}
      >
        <button
          className="movie-row-button left"
          onClick={() => handleScroll("left")}
        >
          {"<"}
        </button>
        <div className="movie-row-content" ref={rowRef}>
          {movies.map((movie, index) => (
            <img
              key={index}
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name || "Movie Poster"}
            />
          ))}
        </div>
        <button
          className="movie-row-button right"
          onClick={() => handleScroll("right")}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
