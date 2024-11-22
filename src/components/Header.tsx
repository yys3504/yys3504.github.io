import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';

const Header: React.FC = () => {
  const [show, setShow] = React.useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${show ? 'header--black' : ''}`}>
      <div className="header__logo">
        <Link to="/">Netflix</Link>
      </div>
      <nav className="header__nav">
        <Link to="/">홈</Link>
        <Link to="/popular">인기</Link>
        <Link to="/search">검색</Link>
        <Link to="/wishlist">찜 목록</Link>
      </nav>
      <div className="header__user">
        <button className="header__logout">로그아웃</button>
        <span className="header__user-id">사용자</span>
      </div>
    </header>
  );
};

export default Header;
