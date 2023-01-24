import React from "react";
import { Link } from "react-router-dom";
import "./Form.css"

function Form({ formHead, formFoot, formData, handlers }) {
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
                        <input type="submit" className="btn" value={formHead} />
                    </div>
                    {formHead === "Login" && (
                        <div className="fieldDiv">
                            <Link to={"/forgotpassword"} target="_blank">
                                Forgotten password?
                            </Link>
                        </div>
                    )}
                    <div className="divider"></div>
                    <div className="fieldDiv">
                        <Link to={formFoot.link} className="newAccLink">
                            {formFoot.name}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;
