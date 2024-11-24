import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import PopularPage from "./pages/PopularPage";
import SearchPage from "./pages/SearchPage";
import WishlistPage from "./pages/WishlistPage";
import SignInPage from "./pages/SignInPage";
import { isAuthenticated, logout } from "./utils/Authentication";
import "./App.css";

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                {/* 로그인 상태일 때만 Header 표시 */}
                {isAuthenticated() && (
                    <Header
                        onLogout={() => {
                            logout();
                            window.location.href = "/signin";
                        }}
                    />
                )}

                <Routes>
                    <Route
                        path="/"
                        element={isAuthenticated() ? <MainPage /> : <Navigate to="/signin" />}
                    />
                    <Route
                        path="/popular"
                        element={isAuthenticated() ? <PopularPage /> : <Navigate to="/signin" />}
                    />
                    <Route
                        path="/search"
                        element={isAuthenticated() ? <SearchPage /> : <Navigate to="/signin" />}
                    />
                    <Route
                        path="/wishlist"
                        element={isAuthenticated() ? <WishlistPage /> : <Navigate to="/signin" />}
                    />
                    <Route path="/signin" element={<SignInPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
