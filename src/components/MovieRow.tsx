import React, { useRef } from "react";
import "./styles/MovieRow.css";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
  toggleWishlist: (movie: Movie) => void;
  isMovieInWishlist: (id: number) => boolean;
}

const MovieRow: React.FC<MovieRowProps> = ({
  title,
  movies,
  toggleWishlist,
  isMovieInWishlist,
}) => {
  const rowRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;

      let scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

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
        <button
          className="movie-row-arrow movie-row-arrow-left"
          onClick={() => handleScroll("left")}
        >
          &lt;
        </button>
        <div className="movie-row-content" ref={rowRef}>
          {movies.map((movie) => (
            <div key={movie.id} className="movie-wrapper">
              <img
                src={movie.poster_path}
                alt={movie.title}
                className={`movie-poster ${
                  isMovieInWishlist(movie.id) ? "highlight" : ""
                }`}
                onClick={() => toggleWishlist(movie)}
              />
            </div>
          ))}
        </div>
        <button
          className="movie-row-arrow movie-row-arrow-right"
          onClick={() => handleScroll("right")}
        >
          &gt;
        </button>
        {/* 좌우 끝에만 그라데이션 추가 */}
        <div className="movie-row-gradient-left"></div>
        <div className="movie-row-gradient-right"></div>
      </div>
    </div>
  );
};

export default MovieRow;
