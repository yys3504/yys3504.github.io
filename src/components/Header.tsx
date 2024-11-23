import React, { useState, useEffect } from "react";
import './styles/Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // 스크롤이 50px 이상이면 true
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header__logo">
        <a href="/">Netflix</a>
      </div>
      <div className="header__nav">
        <a href="/">홈</a>
        <a href="/popular">인기</a>
        <a href="/search">검색</a>
        <a href="/wishlist">찜 목록</a>
      </div>
      <button className="header__logout">로그아웃</button>
    </div>
  );
};

export default Header;
