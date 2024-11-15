import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserId('User123'); // 임시 사용자 ID
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <Link to="/" className="logo">
          Netflix Demo
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/popular">Popular</Link>
          <Link to="/search">Search</Link>
          <Link to="/wishlist">Wishlist</Link>
        </nav>
        <div className="user-actions">
          {isLoggedIn ? (
            <>
              <span>{userId}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
