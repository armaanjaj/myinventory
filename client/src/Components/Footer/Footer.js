import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer id="foot" className="bg-[#041c1c] py-8 px-[10vw]">
            <div
                id="footer-sub-container"
                className="flex flex-col justify-center items-center mt-[5rem]"
            >
                <div
                    id="footer-sub-content-container"
                    className="flex tablet:flex-row laptop:flex-row desktop:flex-row mobile:flex-col justify-around whitespace-pre-wrap mobile:px-8 mobile:pt-8 tablet:pt-8 desktop:pt-8 laptop:pt-8"
                >
                    <div
                        id="footer-sub-content-left"
                        className="flex flex-col justify-between items-start max-w-[33%] mobile:py-4 tablet:py-0 laptop:py-0 desktop:py-0"
                    >
                        <div className="flex flex-col justify-start items-start">
                            <div className="text-white font-bold text-[16px]">
                                About
                            </div>
                            <span className="text-white py-1.5 px-0 text-[15px]">
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Ab eos dolor, quidem rerum
                                expedita ratione architecto eligendi.
                            </span>
                        </div>
                        <div className="flex flex-col justify-start items-start">
                            <div className="text-white font-bold text-[16px]">
                                Connect with us
                            </div>
                            <span className="text-[15px] py-1.5 px-0 flex flex-row justify-start items-start">
                                <a
                                    href="https://github.com/armaanjaj"
                                    className="text-white mobile:p-4 tablet:p-0 laptop:p-0 desktop:p-0"
                                    target={"_blank"}
                                >
                                    <GitHubIcon />
                                </a>
                                <a
                                    href="https://linkedin.com/in/connectarmaan"
                                    target={"_blank"}
                                    className="text-[#004182] mobile:p-4 tablet:p-0 laptop:p-0 desktop:p-0"
                                >
                                    <LinkedInIcon />
                                </a>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start mobile:py-4 tablet:py-0 laptop:py-0 desktop:py-0 max-w-[33%]">
                        <div className="text-white font-bold">Navigations</div>
                        <div className="flex flex-row justify-center items-center">
                            <div className="flex flex-col justify-center items-start w-[calc((10vw+100%))] m-px-[30%]">
                                <Link
                                    to={"/"}
                                    className="no-underline text-white py-1.5 px-0"
                                >
                                    Home
                                </Link>
                                <Link
                                    to={"/"}
                                    className="no-underline text-white py-1.5 px-0"
                                >
                                    Services
                                </Link>
                                <Link
                                    to={"/"}
                                    className="no-underline text-white py-1.5 px-0"
                                >
                                    Work
                                </Link>
                                <Link
                                    to={"/"}
                                    className="no-underline text-white py-1.5 px-0"
                                >
                                    Process
                                </Link>
                                <Link
                                    to={"/"}
                                    className="no-underline text-white py-1.5 px-0"
                                >
                                    About Us
                                </Link>
                            </div>
                            <div className="flex flex-col justify-center items-start w-[calc((10vw+100%))] m-px-[30%]">
                                <Link
                                    to={"/"}
                                    className="no-underline text-white py-1.5 px-0"
                                >
                                    Press
                                </Link>
                                <Link
                                    to={"/"}
                                    className="no-underline text-white py-1.5 px-0"
                                >
                                    Blog
                                </Link>
                                <Link
                                    to={"/"}
                                    className="no-underline text-white py-1.5 px-0"
                                >
                                    Contact
                                </Link>
                                <Link
                                    to={"/"}
                                    className="no-underline text-white py-1.5 px-0"
                                >
                                    Support
                                </Link>
                                <Link
                                    to={"/"}
                                    className="no-underline text-white py-1.5 px-0"
                                >
                                    Privacy
                                </Link>
                            </div>
                            <div className="flex flex-col justify-center items-start w-[calc((10vw+100%))] m-px-[30%]">
                                <Link
                                    to={"/"}
                                    className="no-underline text-white py-1.5 px-0"
                                >
                                    FAQ
                                </Link>
                                <Link
                                    to={"/"}
                                    className="no-underline text-white py-1.5 px-0"
                                >
                                    Careers
                                </Link>
                                <Link
                                    to={"/"}
                                    className="no-underline text-white py-1.5 px-0"
                                >
                                    Process
                                </Link>
                                <Link
                                    to={"/"}
                                    className="no-underline text-white py-1.5 px-0"
                                >
                                    About Us
                                </Link>
                                <a
                                    href="https://github.com/armaanjaj/myinventory"
                                    className="no-underline text-white py-1.5 px-0"
                                >
                                    Contribute to project
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-white mt-[5rem]">
                    MYINVENTORY&nbsp;{" "}
                    <span id="year">{new Date().getFullYear()}</span> | All
                    rights reserved
                </div>
            </div>
        </footer>
    );
}

export default Footer;
