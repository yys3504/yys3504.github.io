export const tryLogin = (email, password, onSuccess, onFail) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.id === email && u.password === password);
    if (user) {
        localStorage.setItem("authenticated", "true"); // 로그인 상태 저장
        onSuccess();
    } else {
        onFail();
    }
};

export const tryRegister = (email, password, onSuccess, onFail) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.id === email)) {
        onFail({ message: "User already exists." });
    } else {
        users.push({ id: email, password });
        localStorage.setItem("users", JSON.stringify(users));
        onSuccess();
    }
};

export const isAuthenticated = () => {
    return localStorage.getItem("authenticated") === "true"; // 로그인 상태 확인
};

export const logout = () => {
    localStorage.removeItem("authenticated"); // 로그인 상태 제거
};
