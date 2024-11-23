import React, { useEffect, useState } from "react";
import MovieRow from "../components/MovieRow";
import BannerSlider from "../components/BannerSlider";
import "./MainPage.css";

interface Movie {
  poster_path: string;
  title?: string;
  name?: string;
}

const MainPage = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [romanceMovies, setRomanceMovies] = useState<Movie[]>([]);

  const baseUrl = "https://api.themoviedb.org/3";
  const apiKey = "b2fe57ddb2df376d8122bd8a24ee6e9a";

  useEffect(() => {
    const fetchMovies = async (
      url: string,
      setState: React.Dispatch<React.SetStateAction<Movie[]>>
    ) => {
      const response = await fetch(url);
      const data = await response.json();
      setState(data.results || []);
    };

    fetchMovies(`${baseUrl}/movie/popular?api_key=${apiKey}`, setPopularMovies);
    fetchMovies(
      `${baseUrl}/discover/movie?with_genres=28&api_key=${apiKey}`,
      setActionMovies
    );
    fetchMovies(
      `${baseUrl}/discover/movie?with_genres=10749&api_key=${apiKey}`,
      setRomanceMovies
    );
  }, []);

  return (
    <div className="main-page">
      <BannerSlider />
      <div style={{ marginTop: "20px" }}>
        <MovieRow title="인기 영화" movies={popularMovies} />
        <MovieRow title="액션 영화" movies={actionMovies} />
        <MovieRow title="로맨스 영화" movies={romanceMovies} />
      </div>
    </div>
  );
};

export default MainPage;
