import React, { useState, useEffect, useCallback } from "react";
import { tryLogin, tryRegister } from "../utils/Authentication";
import { useNavigate } from "react-router-dom";
import "./SignInPage.css";

const SignInPage: React.FC = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [visibleFields, setVisibleFields] = useState<number>(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const checkAuthentication = useCallback(() => {
        const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
        if (isAuthenticated) {
            navigate("/"); // 사용자가 이미 인증되었으면 메인 페이지로 이동
        }
    }, [navigate]);

    useEffect(() => {
        showFieldsSequentially(3);
        checkAuthentication();
    }, [checkAuthentication]);

    const handleTabChange = (signIn: boolean) => {
        if (isSignIn !== signIn) {
            setIsSignIn(signIn);
            setError(""); // 탭 전환 시 에러 메시지 초기화
            setVisibleFields(0);
            setTimeout(() => showFieldsSequentially(3), 200);
        }
    };

    const showFieldsSequentially = (count: number) => {
        for (let i = 1; i <= count; i++) {
            setTimeout(() => setVisibleFields(i), i * 200);
        }
    };

    const handleLogin = () => {
        tryLogin(
            email,
            password,
            () => {
                alert("로그인 성공!");
                navigate("/");
            },
            () => setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.")
        );
    };

    const handleRegister = () => {
        tryRegister(
            email,
            password,
            () => {
                alert("회원가입 성공! 이제 로그인하세요.");
                setPassword("");
                setIsSignIn(true); // 회원가입 후 로그인 탭으로 이동
            },
            (err: Error) => setError(err.message || "회원가입에 실패했습니다.")
        );
    };

    return (
        <div className="centered-container">
            <div className="container">
                <div className="tabs">
                    <button
                        className={`tab ${isSignIn ? "active" : ""}`}
                        onClick={() => handleTabChange(true)}
                    >
                        Sign In
                    </button>
                    <button
                        className={`tab ${!isSignIn ? "active" : ""}`}
                        onClick={() => handleTabChange(false)}
                    >
                        Register
                    </button>
                </div>
                <div className="pages">
                    <div className="page">
                        {isSignIn ? (
                            <>
                                <div className={`input ${visibleFields >= 1 ? "visible" : ""}`}>
                                    <label>EMAIL</label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className={`input ${visibleFields >= 2 ? "visible" : ""}`}>
                                    <label>PASSWORD</label>
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        className="text"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {error && <p className="error">{error}</p>}
                                <div className={`input ${visibleFields >= 3 ? "visible" : ""}`}>
                                    <button className="submit" onClick={handleLogin}>
                                        SIGN IN
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`input ${visibleFields >= 1 ? "visible" : ""}`}>
                                    <label>EMAIL</label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className={`input ${visibleFields >= 2 ? "visible" : ""}`}>
                                    <label>PASSWORD</label>
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        className="text"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {error && <p className="error">{error}</p>}
                                <div className={`input ${visibleFields >= 3 ? "visible" : ""}`}>
                                    <button className="submit" onClick={handleRegister}>
                                        SIGN UP
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
