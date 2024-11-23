import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/MovieRow.css';

interface Props {
  title: string;
  fetchUrl: string;
}

const MovieRow: React.FC<Props> = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(fetchUrl, {
          params: {
            api_key: 'b2fe57ddb2df376d8122bd8a24ee6e9a',
            language: 'ko-KR',
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [fetchUrl]);

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="movie-row-posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className="movie-row-poster"
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title || movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
