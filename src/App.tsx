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
    const authenticated = isAuthenticated();

    return (
        <Router>
                <Routes>
                    <Route
                        path="/"
                        element={authenticated ? <MainPage /> : <Navigate to="/signin" />}
                    />
                    <Route
                        path="/popular"
                        element={authenticated ? <PopularPage /> : <Navigate to="/signin" />}
                    />
                    <Route
                        path="/search"
                        element={authenticated ? <SearchPage /> : <Navigate to="/signin" />}
                    />
                    <Route
                        path="/wishlist"
                        element={authenticated ? <WishlistPage /> : <Navigate to="/signin" />}
                    />
                    <Route path="/signin" element={<SignInPage />} />
                </Routes>
        </Router>
    );
};

export default App;
