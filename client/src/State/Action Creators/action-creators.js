export const darkMode = (mode) => {
    return (dispatch) => {
        dispatch({
            type: "darkMode",
            payload: mode,
        });
    };
};

export const loginSuccess = (user) => {
    return (dispatch) => {
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user },
        });
    };
};

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
    };
};
