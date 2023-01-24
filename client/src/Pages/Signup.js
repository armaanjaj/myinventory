import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "../Components/Form/Form";

const SIGNUP_URL = "/store/signup";

function Signup() {
    let navigate = useNavigate();

    // STATES
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [inputError, setInputError] = useState(false);

    // HANDLERS
    const handleSignup = (e) => {
        e.preventDefault();

        if (firstName === "") {
            setInputError(true);
            setFirstNameError("First name input cannot be empty");
        }
        if (lastName === "") {
            setInputError(true);
            setLastNameError("Last name input cannot be empty");
        }
        if (email === "") {
            setInputError(true);
            setEmailError("Email input cannot be empty");
        }
        if (password === "") {
            setInputError(true);
            setPasswordError("Password input cannot be empty");
        }

        if (inputError === false) {
            let signupBody = JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            });
            axios
                .post(SIGNUP_URL, signupBody, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    if (response.success) {
                        console.log(response);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div>
            <Form
                formHead={"Signup"}
                formFoot={{
                    name: "Already have an account",
                    link: "/login",
                }}
                formData={{
                    inputs: [
                        {
                            key: "fName",
                            type: "text",
                            name: "fName",
                            placeholder: "Enter your first Name",
                            handler: (e) => setFirstName(e.target.value),
                            error: firstNameError,
                        },
                        {
                            key: "lName",
                            type: "text",
                            name: "lName",
                            placeholder: "Enter your last Name",
                            handler: (e) => setLastName(e.target.value),
                            error: lastNameError,
                        },
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
                handlers={{
                    formHandler: handleSignup,
                }}
            />
        </div>
    );
}

export default Signup;
