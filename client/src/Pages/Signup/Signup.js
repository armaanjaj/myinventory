import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "../../Components/Form/Form";
import Logo from "../../Components/Logo/Logo";
import "./Signup.css";
import useAuth from "../../Hooks/useAuth";
import {
    Button as MuiButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import Loader from "../../Components/Loaders/Loader-FS";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../State";

const SIGNUP_URL = "/api/signup";

function Signup() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { loginSuccess } = bindActionCreators(actionCreators, dispatch);

    // CHECK IF THE USER IS LOGGED IN, OTHERWISE REDIRECT TO LOGIN PAGE
    useAuth("AUTH");

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
    const [loading, setLoading] = useState(false);

    // success dialog box
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const [successDialogTitle, setSuccessDialogTitle] = useState("");
    const [successDialogContent, setSuccessDialogContent] = useState("");

    // HANDLERS
    const handleSignup = (e) => {
        e.preventDefault();

        setLoading(true);

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
                    if (response.data.success) {
                        localStorage.setItem("authToken", response.data.token);
                        clearFields();

                        loginSuccess(response.data);

                        setLoading(false)

                        // Navigate to the desired page
                        navigate("/inventory", { replace: true });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const clearFields = () => {
        setEmail("")
        setFirstName("")
        setLastName("")
        setPassword("")
        setEmailError("")
        setFirstNameError("")
        setLastNameError("")
        setPasswordError("")
    }

    return (
        <>
            {loading && <Loader />}
            <div className="flex flex-row justify-center items-center h-[100vh] w-[100vw]">
                {/* <div className="h-[100vh] w-[33.3vw]"></div> */}
                <div className="h-[100vh] bg-white">
                    <Form
                        formHead={<Logo />}
                        formFoot={{
                            name: "Already have an account",
                            link: "/auth/login",
                        }}
                        formData={{
                            inputs: [
                                {
                                    key: "fName",
                                    type: "text",
                                    name: "fName",
                                    placeholder: "Enter your first name",
                                    handler: (e) =>
                                        setFirstName(e.target.value),
                                    error: firstNameError,
                                },
                                {
                                    key: "lName",
                                    type: "text",
                                    name: "lName",
                                    placeholder: "Enter your last name",
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
                        formButton={"Sign up for free"}
                        handlers={{
                            formHandler: handleSignup,
                        }}
                    />
                </div>

                {/* Confirmation SUCCESS dialog */}
                <Dialog
                    open={openSuccessDialog}
                    onClose={() => setOpenSuccessDialog(false)}
                >
                    <DialogTitle>{successDialogTitle}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {successDialogContent}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <MuiButton
                            onClick={() => setOpenSuccessDialog(false)}
                            color="primary"
                            autoFocus
                        >
                            OK
                        </MuiButton>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}

export default Signup;
