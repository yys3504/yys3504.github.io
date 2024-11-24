import React, { useRef } from "react";
import "./styles/MovieRow.css";

interface Movie {
  poster_path: string;
  title: string;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
  const rowRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;

      let scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      // 끝에 도달하면 처음으로 돌아가기
      if (direction === "right" && scrollLeft >= maxScrollLeft) {
        scrollTo = 0;
      } else if (direction === "left" && scrollLeft <= 0) {
        scrollTo = maxScrollLeft;
      }

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="movie-row">
      <h2 className="movie-row-title">{title}</h2>
      <div className="movie-row-container">
        <div className="movie-row-gradient-left" />
        <button
          className="movie-row-arrow movie-row-arrow-left"
          onClick={() => handleScroll("left")}
        >
          &lt;
        </button>
        <div className="movie-row-content" ref={rowRef}>
          {movies.map((movie, index) => (
            <img
              key={index}
              src={movie.poster_path}
              alt={movie.title}
              className="movie-poster"
            />
          ))}
        </div>
        <button
          className="movie-row-arrow movie-row-arrow-right"
          onClick={() => handleScroll("right")}
        >
          &gt;
        </button>
        <div className="movie-row-gradient-right" />
      </div>
    </div>
  );
};

export default MovieRow;
