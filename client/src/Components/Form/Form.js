import React from "react";
import { Link } from "react-router-dom";
import "./Form.css";

function Form({ formHead, formFoot, formData, formButton, handlers }) {
    return (
        <div className="parent">
            <div className="container">
                <h2>{formHead}</h2>

                <form className="formContainer" onSubmit={handlers.formHandler}>
                    {formData.inputs.map((input) => (
                        <div key={input.key} className="fieldDiv">
                            <input
                                type={input.type}
                                className="fields"
                                name={input.name}
                                placeholder={input.placeholder}
                                onChange={input.handler}
                            />
                            {input.error && (
                                <div className="warning">
                                    <p>{input.error}</p>
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="fieldDiv">
                        <input
                            type="submit"
                            className="btn"
                            value={formButton}
                        />
                    </div>
                    <div className="auth-form-help-links">
                        {formButton === "Log in" ? (
                            <>
                                <div className="fieldDiv">
                                    <Link
                                        to={"/forgotpassword"}
                                        className="auth-form-forgotpassword"
                                        target="_blank"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="fieldDiv">
                                    <Link to={"/signup"} className="newAccLink">
                                    Don't have an account? <span>Sign up</span>
                                    </Link>
                                </div>
                            </>
                        ):(
                            <>
                                <div className="fieldDiv">
                                    <Link to={"/login"} className="newAccLink">
                                    Already have an account? <span>Log in</span>
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;
