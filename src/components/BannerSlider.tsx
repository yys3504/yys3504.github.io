import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/BannerSlider.css';

const BannerSlider: React.FC = () => {
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const fetchBannerMovie = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/all/week', {
          params: {
            api_key: 'b2fe57ddb2df376d8122bd8a24ee6e9a',
            language: 'ko-KR',
          },
        });
        const randomMovie = response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ];
        setMovie(randomMovie);
      } catch (error) {
        console.error('Error fetching banner movie:', error);
      }
    };

    fetchBannerMovie();
  }, []);

  if (!movie) {
    return <div>로딩 중...</div>;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">{movie.title || movie.name}</h1>
        <div className="banner-buttons">
          <button className="banner-button">재생</button>
          <button className="banner-button">찜하기</button>
        </div>
        <p className="banner-description">{movie.overview}</p>
      </div>
      <div className="banner-fadeBottom" />
    </header>
  );
};

export default BannerSlider;
