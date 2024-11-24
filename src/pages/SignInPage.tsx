import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInPage.css";

const SignInPage: React.FC = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [visibleFields, setVisibleFields] = useState<number>(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        showFieldsSequentially(3);
    }, []);

    const handleTabChange = (signIn: boolean) => {
        if (isSignIn !== signIn) {
            setIsSignIn(signIn);
            setVisibleFields(0);
            setTimeout(() => {
                showFieldsSequentially(3);
            }, 200);
        }
    };

    const showFieldsSequentially = (count: number) => {
        for (let i = 1; i <= count; i++) {
            setTimeout(() => setVisibleFields(i), i * 200);
        }
    };

    const handleRegister = () => {
        const { tryRegister } = require("../utils/Authentication");
        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }
        tryRegister(
            email.trim(),
            password.trim(),
            () => {
                alert("Registration successful! You can now sign in.");
                setIsSignIn(true);
                setVisibleFields(0);
                setTimeout(() => showFieldsSequentially(3), 200);
            },
            (err: { message?: string }) => {
                alert(err.message || "Registration failed.");
            }
        );
    };

    const handleLogin = () => {
        const { tryLogin } = require("../utils/Authentication");
        tryLogin(
            email.trim(),
            password.trim(),
            () => {
                alert("Login successful!");
                navigate("/"); // "/" 경로로 이동
            },
            () => {
                alert("Invalid credentials.");
            }
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
