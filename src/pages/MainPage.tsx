import React from "react";
import BannerSlider from "../components/BannerSlider";
import MovieRow from "../components/MovieRow";

const MainPage: React.FC = () => {
  return (
    <div className="main-page">
      <BannerSlider />
      <div className="movie-section">
        <MovieRow
          title="인기 영화"
          fetchUrl="https://api.themoviedb.org/3/movie/popular?api_key=b2fe57ddb2df376d8122bd8a24ee6e9a&language=ko-KR"
        />
        <MovieRow
          title="액션 영화"
          fetchUrl="https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=b2fe57ddb2df376d8122bd8a24ee6e9a&language=ko-KR"
        />
        <MovieRow
          title="로맨스 영화"
          fetchUrl="https://api.themoviedb.org/3/discover/movie?with_genres=10749&api_key=b2fe57ddb2df376d8122bd8a24ee6e9a&language=ko-KR"
        />
      </div>
    </div>
  );
};

export default MainPage;
