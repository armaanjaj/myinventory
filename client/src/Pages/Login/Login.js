import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "../../Components/Form/Form";
import "./Login.css";
import Logo from "../../Components/Logo/Logo";

const LOGIN_URL = "/store/login";

function Login() {
    let navigate = useNavigate();

    // STATES
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [inputError, setInputError] = useState(false);

    // HANDLERS
    const handleLogin = (e) => {
        e.preventDefault();

        if (email === "") {
            setInputError(true);
            setEmailError("Email input cannot be empty");
        }

        if (password === "") {
            setInputError(true);
            setPasswordError("Password input cannot be empty");
        }
        if (inputError === false) {
            let loginBody = JSON.stringify({ email, password });
            axios
                .post(LOGIN_URL, loginBody, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        console.log(response);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="login-body-main">
            <div className="login-body-content">
                <div className="login-body-content-left"></div>
                <div className="login-body-content-right">
                    <Form
                        formHead={<Logo />}
                        formFoot={{
                            name: "Don't have an account? Sign up",
                            link: "/signup",
                        }}
                        formData={{
                            inputs: [
                                {
                                    key: "email",
                                    type: "email",
                                    name: "email",
                                    placeholder: "Enter your email address",
                                    handler: (e) => setEmail(e.target.value),
                                    error: emailError,
                                },
                                {
                                    key: "password",
                                    type: "password",
                                    name: "password",
                                    placeholder: "Enter your password",
                                    handler: (e) => setPassword(e.target.value),
                                    error: passwordError,
                                },
                            ],
                        }}
                        formButton={"Log in"}
                        handlers={{
                            formHandler: handleLogin,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
