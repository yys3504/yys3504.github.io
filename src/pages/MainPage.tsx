import React from 'react';
import Banner from '../components/Banner';
import MovieRow from '../components/MovieRow';

const MainPage: React.FC = () => {
  const baseUrl = 'https://api.themoviedb.org/3';

  return (
    <div className="main-page">
      <Banner />
      <MovieRow
        title="인기 영화"
        fetchUrl={`${baseUrl}/movie/popular`}
      />
      <MovieRow
        title="액션 영화"
        fetchUrl={`${baseUrl}/discover/movie?with_genres=28`}
      />
      <MovieRow
        title="로맨스 영화"
        fetchUrl={`${baseUrl}/discover/movie?with_genres=10749`}
      />
    </div>
  );
};

export default MainPage;
