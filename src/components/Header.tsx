import React from "react";
import { Link } from "react-router-dom";
import "./styles/Header.css";

interface HeaderProps {
    onLogout: () => void; // 로그아웃 콜백 함수
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
    return (
        <header className="header">
            <div className="header__left">
                <Link to="/" className="header__logo">
                    Netflix
                </Link>
            </div>
            <nav className="header__nav">
                <Link to="/" className="header__link">
                    홈
                </Link>
                <Link to="/popular" className="header__link">
                    인기
                </Link>
                <Link to="/search" className="header__link">
                    찾아보기
                </Link>
                <Link to="/wishlist" className="header__link">
                    찜 목록
                </Link>
            </nav>
            <div className="header__right">
                <button className="header__logout" onClick={onLogout}>
                    로그아웃
                </button>
            </div>
        </header>
    );
};

export default Header;
