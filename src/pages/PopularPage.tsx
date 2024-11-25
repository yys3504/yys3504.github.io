import React, { useEffect, useState, useRef } from "react";
import "./PopularPage.css";

interface Movie {
    id: number;
    poster_path: string;
    title: string;
    overview: string;
}

const PopularPage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [viewMode, setViewMode] = useState<"table" | "infinite">("table");
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // 영화 데이터를 가져오는 함수
    const fetchMovies = async (page: number) => {
        setIsLoading(true);
        const apiKey = "b2fe57ddb2df376d8122bd8a24ee6e9a";
        if (!apiKey) {
            console.error("API 키가 없습니다. 로그인하세요.");
            return;
        }
        const baseUrl = "https://api.themoviedb.org/3/movie/popular";
        try {
            // 한국어 데이터를 요청하기 위해 language=ko-KR 추가
            const response = await fetch(`${baseUrl}?api_key=${apiKey}&page=${page}&language=ko-KR`);
            const data = await response.json();
            setMovies((prev) => (viewMode === "infinite" ? [...prev, ...data.results] : data.results));
        } catch (error) {
            console.error("영화 데이터를 가져오는 데 실패했습니다:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(page);
    }, [page, viewMode]);

    const handleViewChange = (mode: "table" | "infinite") => {
        setViewMode(mode);
        setMovies([]);
        setPage(1);
    };

    const handleScroll = () => {
        if (scrollContainerRef.current && viewMode === "infinite") {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 50 && !isLoading) {
                setPage((prev) => prev + 1);
            }
        }
    };

    const handleTopScroll = () => {
        scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div
            className={`popular-page ${viewMode}`}
            ref={viewMode === "infinite" ? scrollContainerRef : null}
            onScroll={viewMode === "infinite" ? handleScroll : undefined}
        >
            {/* 뷰 모드를 선택하는 버튼 */}
            <div className="view-selector">
                <button
                    className={`view-button ${viewMode === "table" ? "active" : ""}`}
                    onClick={() => handleViewChange("table")}
                >
                    테이블 보기
                </button>
                <button
                    className={`view-button ${viewMode === "infinite" ? "active" : ""}`}
                    onClick={() => handleViewChange("infinite")}
                >
                    무한 스크롤
                </button>
            </div>

            {/* 테이블 뷰 */}
            {viewMode === "table" ? (
                <div className="table-view">
                    {movies.map((movie) => (
                        <div className="table-row" key={movie.id}>
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            <div className="movie-info">
                                <h3>{movie.title}</h3>
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                    ))}
                    <div className="pagination">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        >
                            이전
                        </button>
                        <span>페이지 {page}</span>
                        <button onClick={() => setPage((prev) => prev + 1)}>다음</button>
                    </div>
                </div>
            ) : (
                // 무한 스크롤 뷰
                <div className="infinite-view">
                    {movies.map((movie) => (
                        <div className="movie-card" key={movie.id}>
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            <h3>{movie.title}</h3>
                        </div>
                    ))}
                    {isLoading && <div className="loading">로딩 중...</div>}
                    <button className="top-button" onClick={handleTopScroll}>
                        맨 위로
                    </button>
                </div>
            )}
        </div>
    );
};

export default PopularPage;
