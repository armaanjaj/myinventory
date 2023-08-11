// useAuth.js
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuth = (page) => {
    const navigate = useNavigate();

    // USE REDUX TO GET THE LOGIN STATE
    const isLogIn = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        const checkAuthAndNavigate = () => {
            switch (page) {
                case "INVENTORY": {
                    if (!isLogIn) {
                        navigate("/auth/login", { replace: true });
                    }
                    break;
                }
                case "AUTH": {
                    if (isLogIn) {
                        navigate("/inventory", { replace: true });
                    }
                    break;
                }
            }
        };

        checkAuthAndNavigate();

        return;
    }, [isLogIn]);
};

export default useAuth;
