import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import axios from "axios";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

const SearchPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const [filters, setFilters] = useState({
    genreId: 0,
    rating: -1,
    sortBy: "popularity.desc",
  });

  const genreOptions: Record<string, number> = {
    "장르 (전체)": 0,
    액션: 28,
    어린이: 10751,
    로맨스: 10749,
  };

  const ratingOptions: Record<string, number> = {
    "평점 (전체)": -1,
    "6점 이상": 6,
    "7점 이상": 7,
    "8점 이상": 8,
    "9점 이상": 9,
  };

  const sortOptions: Record<string, string> = {
    인기순: "popularity.desc",
    평점순: "vote_average.desc",
    최신순: "release_date.desc",
  };

  const fetchMovies = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get("https://api.themoviedb.org/3/discover/movie", {
        params: {
          api_key: localStorage.getItem("apiKey"),
          page,
          with_genres: filters.genreId || undefined,
          "vote_average.gte": filters.rating > 0 ? filters.rating : undefined,
          sort_by: filters.sortBy,
          language: "ko-KR",
        },
      });

      const newMovies = response.data.results;

      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [filters, page]);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const offsetHeight = document.documentElement.offsetHeight;

    if (scrollTop + windowHeight >= offsetHeight - 200) {
      fetchMovies();
    }

    if (scrollTop > 300) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFilterChange = (filterType: string, value: string | number) => {
    setMovies([]);
    setPage(1);
    setHasMore(true);

    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      genreId: 0,
      rating: -1,
      sortBy: "popularity.desc",
    });
    setMovies([]);
    setPage(1);
    setHasMore(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="search-container">
      <div className="filter-options">
        <select value={filters.genreId} onChange={(e) => handleFilterChange("genreId", Number(e.target.value))}>
          {Object.keys(genreOptions).map((key) => (
            <option key={key} value={genreOptions[key]}>
              {key}
            </option>
          ))}
        </select>

        <select value={filters.rating} onChange={(e) => handleFilterChange("rating", Number(e.target.value))}>
          {Object.keys(ratingOptions).map((key) => (
            <option key={key} value={ratingOptions[key]}>
              {key}
            </option>
          ))}
        </select>

        <select value={filters.sortBy} onChange={(e) => handleFilterChange("sortBy", e.target.value)}>
          {Object.keys(sortOptions).map((key) => (
            <option key={key} value={sortOptions[key]}>
              {key}
            </option>
          ))}
        </select>

        <button onClick={resetFilters}>초기화</button>
      </div>

      <div className="movie-grid">
        {movies.map((movie, index) => (
          <div key={`${movie.id}-${index}`} className="movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title || "이미지 없음"}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>

      {loading && <p>로딩 중...</p>}
      {!hasMore && <p>더 이상 데이터가 없습니다.</p>}

      {showScrollToTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          맨 위로
        </button>
      )}
    </div>
  );
};

export default SearchPage;
