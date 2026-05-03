// @ts-expect-error:Added any becoz I'm not sure about the type it will recieve; 
export const setAuth = (data) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    window.dispatchEvent(new Event("authChanged")); // 🔥 trigger update
};

export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("authChanged")); // 🔥 trigger update
};

export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};
