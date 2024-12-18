const tryLogin = (email, password, success, fail) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.id === email && user.password === password);

    if (user) {
        localStorage.setItem("isAuthenticated", "true"); // 로그인 상태 저장
        localStorage.setItem("currentUser", email); // 현재 사용자 저장
        localStorage.setItem("apiKey", password); // 비밀번호를 API 키로 저장
        success();
    } else {
        fail();
    }
};

const tryRegister = (email, password, success, fail) => {
    try {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.some((existingUser) => existingUser.id === email);

        if (userExists) {
            throw new Error("이미 존재하는 사용자입니다.");
        }

        const newUser = { id: email, password: password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        success();
    } catch (err) {
        fail(err);
    }
};

const isAuthenticated = () => {
    return localStorage.getItem("isAuthenticated") === "true";
};

const logout = () => {
    localStorage.removeItem("isAuthenticated"); // 로그인 상태 제거
    localStorage.removeItem("currentUser"); // 현재 사용자 제거
    localStorage.removeItem("apiKey"); // API 키 제거
};

export { tryLogin, tryRegister, isAuthenticated, logout };
