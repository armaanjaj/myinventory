import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Logo from "../Logo/Logo";

function Footer() {
    return (
        <footer id="foot" className="bg-[#041c1c] py-8 px-[10vw]">
            <div id="logoName" className="text-white font-8 ml-8">
                <Logo />
            </div>
            <div
                id="linkContainer"
                className="flex tablet:flex-row laptop:flex-row desktop:flex-row mobile:flex-col justify-around whitespace-pre-wrap mobile:px-8 mobile:pt-8 tablet:pt-8 desktop:pt-8 laptop:pt-8"
            >
                <div className="flex flex-col justify-between items-start mobile:py-4 tablet:py-0 laptop:py-0 desktop:py-0">
                    <div>
                        <div className="text-white font-bold">About</div>
                        <span className="text-white py-1.5 px-0">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Ab eos dolor, quidem rerum expedita ratione
                            architecto eligendi.
                        </span>
                    </div>
                    <div className="flex tablet:flex-col laptop:flex-col desktop:flex-col justify-evenly align-middle mobile:py-4 mobile:flex-row  tablet:py-0 laptop:py-0 desktop:py-0">
                        <div className="text-white font-bold">
                            Connect with us
                        </div>
                        <span className="text-[#c0c0c0] py-1.5 px-0">
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
                <div className="flex flex-col mobile:py-4 tablet:py-0 laptop:py-0 desktop:py-0">
                    <div className="text-white font-bold">Navigations</div>
                    <div className="flex flex-row justify-center items-center">
                        <div className="flex flex-col justify-center items-center">
                            <a
                                href="/"
                                className="no-underline text-white py-1.5 px-0"
                            >
                                Add your item
                            </a>
                            <a
                                href="https://github.com/armaanjaj/myinventory"
                                className="no-underline text-white py-1.5 px-0"
                            >
                                Contribute to project
                            </a>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <a
                                href="/"
                                className="no-underline text-white py-1.5 px-0"
                            >
                                Add your item
                            </a>
                            <a
                                href="https://github.com/armaanjaj/myinventory"
                                className="no-underline text-white py-1.5 px-0"
                            >
                                Contribute to project
                            </a>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <a
                                href="/"
                                className="no-underline text-white py-1.5 px-0"
                            >
                                Add your item
                            </a>
                            <a
                                href="https://github.com/armaanjaj/myinventory"
                                className="no-underline text-white py-1.5 px-0"
                            >
                                Contribute to project
                            </a>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <a
                                href="/"
                                className="no-underline text-white py-1.5 px-0"
                            >
                                Add your item
                            </a>
                            <a
                                href="https://github.com/armaanjaj/myinventory"
                                className="no-underline text-white py-1.5 px-0"
                            >
                                Contribute to project
                            </a>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <a
                                href="/"
                                className="no-underline text-white py-1.5 px-0"
                            >
                                Add your item
                            </a>
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
            <div className="flex flex-row justify-center text-[#747474] ml-8">
                <div>
                    MYINVENTORY{" "}
                    <span id="year">{new Date().getFullYear()}</span>
                </div>
                &nbsp;|&nbsp;
                <a href="#" className="text-[#c0c0c0] no-underline">
                    Privacy
                </a>
                &nbsp;|&nbsp;
                <a href="#" className="text-[#c0c0c0] no-underline">
                    Terms
                </a>
            </div>
        </footer>
    );
}

export default Footer;
