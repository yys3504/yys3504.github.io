import React from "react";
import { Link } from "react-router-dom";
import "./styles/Header.css";

const Header: React.FC = () => {
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
          검색
        </Link>
        <Link to="/wishlist" className="header__link">
          찜 목록
        </Link>
      </nav>
      <div className="header__right">
        <button className="header__logout">로그아웃</button>
      </div>
    </header>
  );
};

export default Header;
