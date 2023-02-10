import React from "react";
import "./Footer.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Logo from "../Logo/Logo";

function Footer() {
    return (
        <footer id="foot" className="bg-[#041c1c] py-8 px-0">
            <div id="logoName" className="text-white font-8 ml-8">
                <Logo />
            </div>
            <div
                id="linkContainer"
                className="flex tablet:flex-row laptop:flex-row desktop:flex-row mobile:flex-col justify-around flex-wrap mobile:px-8 mobile:pt-8 tablet:pt-8 desktop:pt-8 laptop:pt-8"
            >
                <div className="flex flex-col mobile:py-4 tablet:py-0 laptop:py-0 desktop:py-0">
                    <div className="text-[#747474] no-underline">ABOUT</div>
                    <a
                        href="#"
                        className="no-underline text-[#c0c0c0] py-1.5 px-0"
                    >
                        About
                    </a>
                    <a
                        href="#"
                        className="no-underline text-[#c0c0c0] py-1.5 px-0"
                    >
                        Contact us
                    </a>
                    <a
                        href="#"
                        className="no-underline text-[#c0c0c0] py-1.5 px-0"
                    >
                        FAQ
                    </a>
                </div>
                <div className="flex flex-col mobile:py-4 tablet:py-0 laptop:py-0 desktop:py-0">
                    <div className="text-[#747474] no-underline">
                        PROFESSIONALS
                    </div>
                    <a
                        href="/"
                        className="no-underline text-[#c0c0c0] py-1.5 px-0"
                    >
                        Add your item
                    </a>
                    <a
                        href="https://github.com/armaanjaj/myinventory"
                        className="no-underline text-[#c0c0c0] py-1.5 px-0"
                    >
                        Contribute to project
                    </a>
                </div>
                <div className="flex tablet:flex-col laptop:flex-col desktop:flex-col justify-evenly align-middle mobile:py-4 mobile:flex-row  tablet:py-0 laptop:py-0 desktop:py-0">
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
                </div>
            </div>
            <br />
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
