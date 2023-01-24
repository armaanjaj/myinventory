import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "../Components/Form/Form";

const LOGIN_URL = "/store/login"

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

        if (email === ""){
            setInputError(true)
            setEmailError("Email input cannot be empty")
        }
        
        if (password === ""){
            setInputError(true)
            setPasswordError("Password input cannot be empty")
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
                        console.log(response)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    return (
        <div>
            <Form
                formHead={"Login"}
                formFoot={{
                    name: "Create new account",
                    link: "/signup",
                }}
                formData={{
                    inputs: [
                        {
                            key: "email",
                            type: "email",
                            name: "email",
                            placeholder: "Enter your email address",
                            handler: e => setEmail(e.target.value),
                            error: emailError,
                        },
                        {
                            key: "password",
                            type: "password",
                            name: "password",
                            placeholder: "Enter your password",
                            handler: e => setPassword(e.target.value),
                            error: passwordError,
                        },
                    ],
                }}
                handlers={{
                    formHandler: handleLogin,
                }}
            />
        </div>
    );
}

export default Login;
