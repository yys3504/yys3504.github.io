import React, { useState, useEffect } from "react";
import BannerSlider from "../components/BannerSlider";
import MovieRow from "../components/MovieRow";

interface Movie {
    poster_path: string;
    title: string;
}

const MainPage: React.FC = () => {
    const [actionMovies, setActionMovies] = useState<Movie[]>([]);
    const [familyMovies, setFamilyMovies] = useState<Movie[]>([]);
    const [romanceMovies, setRomanceMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async (
            url: string,
            setState: React.Dispatch<React.SetStateAction<Movie[]>>
        ) => {
            try {
                const response = await fetch(url);
                const data = await response.json();

                const moviesWithFullPath = data.results.map((movie: any) => ({
                    ...movie,
                    poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }));

                setState(moviesWithFullPath || []);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            }
        };

        const baseUrl = "https://api.themoviedb.org/3";
        const apiKey = "b2fe57ddb2df376d8122bd8a24ee6e9a";

        fetchMovies(
            `${baseUrl}/discover/movie?with_genres=28&api_key=${apiKey}`,
            setActionMovies
        );
        fetchMovies(
            `${baseUrl}/discover/movie?with_genres=10751&api_key=${apiKey}`, // 어린이 영화 (모든 연령층)
            setFamilyMovies
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
                <MovieRow title="액션 영화" movies={actionMovies} />
                <MovieRow title="어린이 영화" movies={familyMovies} />
                <MovieRow title="로맨스 영화" movies={romanceMovies} />
            </div>
        </div>
    );
};

export default MainPage;
