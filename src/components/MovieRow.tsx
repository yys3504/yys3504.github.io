import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/MovieRow.css";

interface MovieRowProps {
  title: string;
  fetchUrl: string;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(fetchUrl, {
        params: {
          api_key: "b2fe57ddb2df376d8122bd8a24ee6e9a",
          language: "ko-KR",
        },
      });
      setMovies(response.data.results);
    };

    fetchData();
  }, [fetchUrl]);

  const scroll = (direction: "left" | "right") => {
    const container = document.querySelector(`.movie-row__list--${title}`);
    if (!container) return;
    const scrollAmount = direction === "left" ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="movie-row__container">
        <button className="movie-row__nav left" onClick={() => scroll("left")}>
          {"<"}
        </button>
        <div className={`movie-row__list movie-row__list--${title}`}>
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="movie-row__poster"
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title || movie.name}
            />
          ))}
        </div>
        <button className="movie-row__nav right" onClick={() => scroll("right")}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
