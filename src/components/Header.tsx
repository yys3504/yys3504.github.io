import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./styles/Header.css";

interface HeaderProps {
    onLogout: () => void; // 로그아웃 콜백 함수
}

const Header: React.FC<HeaderProps> = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
      // 사용자 상태 초기화 및 홈으로 리다이렉트
      localStorage.clear();
      alert("로그아웃되었습니다.");
      navigate("/signin"); // React Router로 리다이렉트
    };

    return (
        <header className="header">
            <div className="header__left">
                <Link to="/" className="header__logo">
                    Netflix_Demo
                </Link>
            </div>
            <nav className="header__nav">
                <Link
                    to="/"
                    className={`header__link ${
                        location.pathname === "/" ? "active" : ""
                    }`}
                >
                    홈
                </Link>
                <Link
                    to="/popular"
                    className={`header__link ${
                        location.pathname === "/popular" ? "active" : ""
                    }`}
                >
                    인기
                </Link>
                <Link
                    to="/search"
                    className={`header__link ${
                        location.pathname === "/search" ? "active" : ""
                    }`}
                >
                    찾아보기
                </Link>
                <Link
                    to="/wishlist"
                    className={`header__link ${
                        location.pathname === "/wishlist" ? "active" : ""
                    }`}
                >
                    찜 목록
                </Link>
            </nav>
            <div className="header__right">
                <button className="header__logout" onClick={handleLogout}>
                    로그아웃
                </button>
            </div>
        </header>
    );
};

export default Header;
