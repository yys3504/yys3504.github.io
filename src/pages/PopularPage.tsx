import React, { useEffect, useState, useRef } from "react";
import { FaTable, FaList } from "react-icons/fa"; // 아이콘 추가
import "./PopularPage.css";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  overview: string;
}

const PopularPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "list">("list");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages] = useState(10); // 총 페이지 수 제한
  const moviesPerPage = 16; // 페이지당 영화 수
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 영화 데이터를 가져오는 함수
  const fetchMovies = async (page: number) => {
    setIsLoading(true);
    const apiKey = localStorage.getItem("apiKey"); // 로그인 시 저장된 API 키 불러오기
    if (!apiKey) {
        console.error("API 키가 없습니다. 로그인하세요.");
        return;
    }
    const baseUrl = "https://api.themoviedb.org/3/movie/popular";
    try {
      const response = await fetch(
        `${baseUrl}?api_key=${apiKey}&page=${page}&language=ko-KR`
      );
      const data = await response.json();
      setMovies((prev) => [...prev, ...data.results]);
    } catch (error) {
      console.error("영화 데이터를 가져오는 데 실패했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  // 페이지네이션 함수
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const paginatedMovies = movies.slice(
    (page - 1) * moviesPerPage,
    page * moviesPerPage
  );

  return (
    <div
      className="popular-page"
      ref={scrollContainerRef}
      onScroll={() => {
        if (viewMode === "list") {
          const { scrollTop, clientHeight, scrollHeight } =
            scrollContainerRef.current!;
          if (
            scrollTop + clientHeight >= scrollHeight - 50 &&
            !isLoading &&
            page < totalPages
          ) {
            setPage((prev) => prev + 1);
          }
        }
      }}
    >
      {/* 뷰 모드 변경 버튼 */}
      <div className="view-selector-icons">
        <button
          className={`view-icon-button ${viewMode === "table" ? "active" : ""}`}
          onClick={() => setViewMode("table")}
        >
          <FaTable size={24} />
        </button>
        <button
          className={`view-icon-button ${viewMode === "list" ? "active" : ""}`}
          onClick={() => setViewMode("list")}
        >
          <FaList size={24} />
        </button>
      </div>

      {/* 뷰 모드에 따른 렌더링 */}
      <div className={viewMode === "list" ? "movie-list" : "movie-table"}>
        {viewMode === "list"
          ? movies.map((movie) => (
              <div className="movie-item-horizontal" key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster-horizontal"
                />
                <div className="movie-details-horizontal">
                  <h3 className="movie-title-horizontal">{movie.title}</h3>
                  <p className="movie-description-horizontal">{movie.overview}</p>
                </div>
              </div>
            ))
          : paginatedMovies.map((movie) => (
              <div className="movie-item-table" key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster-table"
                />
                <h3 className="movie-title-table">{movie.title}</h3>
              </div>
            ))}
      </div>

      {/* 로딩 표시 */}
      {isLoading && <div className="loading">로딩 중...</div>}

      {/* 맨 위로 버튼 */}
      {viewMode === "list" && (
        <button
          className="top-button"
          onClick={() =>
            scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
          }
        >
          맨 위로
        </button>
      )}

      {/* 페이지네이션 */}
      {viewMode === "table" && (
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            이전
          </button>
          <span className="pagination-info">
            {page} / {totalPages}
          </span>
          <button
            className="pagination-button"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default PopularPage;
