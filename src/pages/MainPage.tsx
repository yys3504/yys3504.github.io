import React from "react";
import BannerSlider from "../components/BannerSlider";
import MovieRow from "../components/MovieRow";

const MainPage: React.FC = () => {
  const baseUrl = "https://api.themoviedb.org/3";

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <BannerSlider />
      <div style={{ marginTop: "20px" }}> {/* 간격 최소화 */}
        <MovieRow title="인기 영화" fetchUrl={`${baseUrl}/movie/popular`} />
        <MovieRow
          title="액션 영화"
          fetchUrl={`${baseUrl}/discover/movie?with_genres=28`}
        />
        <MovieRow
          title="로맨스 영화"
          fetchUrl={`${baseUrl}/discover/movie?with_genres=10749`}
        />
      </div>
    </div>
  );
};

export default MainPage;
