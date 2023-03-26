import React from "react";
import { Link } from "react-router-dom";

function Form({ formHead, formFoot, formData, formButton, handlers }) {
    return (
        <div className="parent flex flex-row justify-around mt-20 py-4 px-35">
            <div className="container flex flex-col items-center bg-white py-5 px-[85px]">
                <h2>{formHead}</h2>

                <form className="formContainer flex flex-col justify-center items-center" onSubmit={handlers.formHandler}>
                    {formData.inputs.map((input) => (
                        <div key={input.key} className="fieldDiv py-[0.5rem] px-0">
                            <input
                                type={input.type}
                                className="fields border-[1px] border-solid border-[#a3a5a7] rounded-[20px] text-[14px] py-[14px] px-[16px] w-[20.5rem] focus:outline-none"
                                name={input.name}
                                placeholder={input.placeholder}
                                onChange={input.handler}
                            />
                            {input.error && (
                                <div className="warning font-extrabold text-[11px] text-red-500">
                                    <p>{input.error}</p>
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="fieldDiv py-[0.5rem] px-0">
                        <input
                            type="submit"
                            className="btn bg-[#2d8cb8] border-0 rounded-[20px] text-[16px] leading-[2.5rem] p-0 w-[20.5rem] text-white duration-[200ms] hover:bg-[#1b77a1] hover:cursor-pointer"
                            value={formButton}
                        />
                    </div>
                    <div className="auth-form-help-links flex flex-col justify-start items-start ml-[-40%] font-normal text-[13px]">
                        {formButton === "Log in" ? (
                            <>
                                <div className="fieldDiv py-[0.5rem] px-0">
                                    <Link
                                        to={"/forgotpassword"}
                                        className="auth-form-forgotpassword no-underline p-0 text-black border-0"
                                        target="_blank"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="fieldDiv py-[0.5rem] px-0">
                                    <Link to={"/auth/signup"} className="links no-underline text-black border-0">
                                    Don't have an account? <span className="text-[#2d8cb8]">Sign up</span>
                                    </Link>
                                </div>
                            </>
                        ):(
                            <>
                                <div className="fieldDiv py-[0.5rem] px-0">
                                    <Link to={"/auth/login"} className="links no-underline text-black border-0">
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
