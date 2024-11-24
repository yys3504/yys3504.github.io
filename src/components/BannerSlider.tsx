import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "./styles/BannerSlider.css";

const BannerSlider: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const SLIDE_COUNT = 5;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            params: {
              api_key: "b2fe57ddb2df376d8122bd8a24ee6e9a",
              language: "ko-KR",
            },
          }
        );
        setMovies(response.data.results.slice(0, SLIDE_COUNT));
        setIsLoading(false); // 데이터 로드 완료
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <div className="banner-slider">
      {isLoading ? (
        <div className="banner-slider-loading">Loading...</div> // 로딩 중 표시
      ) : (
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.id} className="banner-slider__slide">
              <div
                className="banner-slider__image"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
              >
                <div className="banner-slider__content">
                  <h1 className="banner-slider__title">
                    {movie.title || "제목 없음"}
                  </h1>
                  <p className="banner-slider__description">{movie.overview}</p>
                  <div className="banner-slider__buttons">
                    <button className="banner-slider__button">재생</button>
                    <button className="banner-slider__button">찜하기</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default BannerSlider;
