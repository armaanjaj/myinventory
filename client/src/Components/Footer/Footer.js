import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

function Footer() {
    return (
        <footer id="foot" className="bg-[#041c1c] w-full h-full">
            <div className="text-white flex flex-col justify-center items-start gap-10 relative h-full py-14 smallMobile:px-[1rem] mobile:px-[1.5rem] tablet:px-[2rem] laptop:px-[4rem] desktop:px-[4rem]">
                <div className="flex flex-col justify-center items-start gap-5">
                    <Link
                        to="/"
                        className="smallMobile:text-[0.5rem] mobile:text-[1.5rem] tablet:text-[2rem] laptop:text-[2rem] desktop:text-[2rem] w-fit cursor-pointer no-underline font-extrabold"
                    >
                        <Logo />
                    </Link>
                    <p>
                        Our platform offers a cutting-edge solution for
                        businesses to effectively manage their inventory with
                        ease. Our intuitive interface provides advanced features
                        that allow you to effortlessly track stock levels,
                        analyze sales trends, and make informed purchasing
                        decisions. Our real-time updates and customizable
                        reports give you the ability to stay ahead of the curve
                        and streamline your operations.
                    </p>
                </div>

                {/* Links & form section */}
                <div className="w-full flex flex-row justify-start items-start gap-40 font-bold">
                    <div className="w-full flex justify-between items-start gap-7 smallMobile:flex-col mobile:flex-col tablet:flex-row laptop:flex-row desktop:flex-row">
                        <div className="w-full flex flex-row justify-start items-start gap-28">
                            <div className="flex flex-col justify-center items-start gap-8">
                                <h2 className="text-[1rem]">
                                    Navigations
                                </h2>
                                <div className="flex flex-row justify-center items-start gap-7">
                                    <div className="text-[0.75rem] flex flex-col justify-center items-start gap-3">
                                        <Link
                                            to={"/"}
                                            className="no-underline text-white"
                                        >
                                            Home
                                        </Link>
                                        <Link
                                            to={"/"}
                                            className="no-underline text-white"
                                        >
                                            Services
                                        </Link>
                                        <Link
                                            to={"/"}
                                            className="no-underline text-white"
                                        >
                                            Work
                                        </Link>
                                        <Link
                                            to={"/"}
                                            className="no-underline text-white"
                                        >
                                            Process
                                        </Link>
                                        <Link
                                            to={"/"}
                                            className="no-underline text-white"
                                        >
                                            About Us
                                        </Link>
                                    </div>
                                    <div className="text-[0.75rem] flex flex-col justify-center items-start gap-3">
                                        <Link
                                            to={"/"}
                                            className="no-underline text-white"
                                        >
                                            Press
                                        </Link>
                                        <Link
                                            to={"/"}
                                            className="no-underline text-white"
                                        >
                                            Blog
                                        </Link>
                                        <Link
                                            to={"/"}
                                            className="no-underline text-white"
                                        >
                                            Contact
                                        </Link>
                                        <Link
                                            to={"/"}
                                            className="no-underline text-white"
                                        >
                                            Support
                                        </Link>
                                        <Link
                                            to={"/"}
                                            className="no-underline text-white"
                                        >
                                            Privacy
                                        </Link>
                                    </div>
                                    <div className="text-[0.75rem] flex flex-col justify-center items-start gap-3">
                                        <Link
                                            to={"/"}
                                            className="no-underline text-white"
                                        >
                                            FAQ
                                        </Link>
                                        <a
                                            href="https://github.com/armaanjaj/myinventory"
                                            className="no-underline text-white"
                                        >
                                            Contribute
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Socials */}
                <div className="w-full flex flex-row justify-start items-center gap-10">
                    {/* <FacebookIcon />
                        <TwitterIcon />
                        <YouTubeIcon />
                        <InstagramIcon /> */}
                </div>

                <div className="w-full flex flex-row justify-between items-center text-[0.75rem]">
                    {new Date().getFullYear()} MYINVENTORY
                    <div className="flex flex-row justify-between items-center gap-5 flex-nowrap">
                        <Link to="/privacy-and-terms">Terms and Privacy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
