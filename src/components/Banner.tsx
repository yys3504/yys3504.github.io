import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Banner.css';

const Banner: React.FC = () => {
  const [movie, setMovie] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(
          'https://api.themoviedb.org/3/trending/all/week',
          {
            params: {
              api_key: 'b2fe57ddb2df376d8122bd8a24ee6e9a',
              language: 'ko-KR', // 한국어 데이터 요청
            },
          }
        );
        const randomMovie =
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ];
        setMovie(randomMovie);
      } catch (error) {
        console.error('Error fetching Banner data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || '영화 제목'}
        </h1>
        <p className="banner__description">{movie?.overview || '설명이 없습니다.'}</p>
        <div className="banner__buttons">
          <button>재생</button>
          <button>찜하기</button>
        </div>
      </div>
      <div className="banner__fadeBottom" />
    </div>
  );
};

export default Banner;
