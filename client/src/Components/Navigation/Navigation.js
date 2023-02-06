import React, { useEffect, useState } from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import DehazeIcon from "@mui/icons-material/Dehaze";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../State/index";

function Navigation() {
    const mode = useSelector((state) => state.darkMode);
    const dispatch = useDispatch();
    const { darkMode } = bindActionCreators(actionCreators, dispatch);
    const [on, setModeOn] = useState(false);
    const handleMode = () => {
        setModeOn(!on);
        darkMode(!on);
    };

    const [mobileMenu, setMobileMenu] = useState(false);

    return (
        <>
            <section
                id="headSection"
                style={{ backgroundColor: `${mode.bgNavbar}` }}
            >
                <div className="navbar noMobile-navbar">
                    <Link to={"/"}>
                        <span
                            className="navbar-logo"
                            style={{ color: `${mode.colorNavbar}` }}
                        >
                            Myinventory
                        </span>
                    </Link>
                    <span
                        className="navbar-logo-mode-icon"
                        onClick={handleMode}
                        style={{
                            cursor: "pointer",
                            color: `${mode.colorNavbar}`,
                        }}
                    >
                        {mode.bgNavbar === "#b1fcff" ? (
                            // <span onClick={darkMode(true)}>
                            <LightModeIcon />
                        ) : (
                            // </span>
                            // <span onClick={darkMode(false)}>
                            <NightlightRoundIcon />
                            // </span>
                        )}
                    </span>
                </div>
                <div className="navbar mobile-navbar">
                    <Link to={"/"}>
                        <span
                            className="navbar-logo"
                            style={{ color: `${mode.colorNavbar}` }}
                        >
                            Myinventory
                        </span>
                    </Link>
                    <span
                        className="navbar-logo-mode-icon"
                        onClick={handleMode}
                        style={{
                            cursor: "pointer",
                            color: `${mode.colorNavbar}`,
                        }}
                    >
                        {mode.bgNavbar === "#b1fcff" ? (
                            // <span onClick={darkMode(true)}>
                            <LightModeIcon />
                        ) : (
                            // </span>
                            // <span onClick={darkMode(false)}>
                            <NightlightRoundIcon />
                            // </span>
                        )}
                    </span>
                </div>
                <div className="navbar">
                    <div className="noMobile-navbar-links">
                        <Link
                            to={"/inventory"}
                            style={{ color: `${mode.colorNavbar}` }}
                        >
                            Inventory
                        </Link>
                        <Link
                            to={"/login"}
                            style={{ color: `${mode.colorNavbar}` }}
                        >
                            Login
                        </Link>
                        <Link
                            to={"/signup"}
                            style={{ color: `${mode.colorNavbar}` }}
                        >
                            Signup
                        </Link>
                        <Link
                            to={"/account"}
                            style={{ color: `${mode.colorNavbar}` }}
                        >
                            <AccountCircleIcon />
                        </Link>
                    </div>
                    <div
                        className="mobile-navbar-links"
                        style={{ color: `${mode.colorNavbar}` }}
                    >
                        <span
                            onClick={() => {
                                setMobileMenu(!mobileMenu);
                            }}
                        >
                            {mobileMenu ? <CloseIcon /> : <DehazeIcon />}
                        </span>
                        {mobileMenu && (
                            <div
                                className="mobile-navbar-links-box"
                                style={{
                                    backgroundColor: `${
                                        mode.bgNavbar.substring(0, 7)
                                    }`,
                                }}
                            >
                                <Link
                                    to={"/inventory"}
                                    style={{ color: `${mode.colorNavbar}` }}
                                    onClick={()=>{setMobileMenu(!mobileMenu)}}
                                >
                                    Inventory
                                </Link>
                                <Link
                                    to={"/account"}
                                    style={{ color: `${mode.colorNavbar}` }}
                                    onClick={()=>{setMobileMenu(!mobileMenu)}}
                                >
                                    Account
                                </Link>
                                <Link
                                    to={"/login"}
                                    style={{ color: `${mode.colorNavbar}` }}
                                    onClick={()=>{setMobileMenu(!mobileMenu)}}
                                >
                                    Login
                                </Link>
                                <Link
                                    to={"/signup"}
                                    style={{
                                        color: `${mode.colorNavbar}`,
                                        borderBottom: "none",
                                    }}
                                    onClick={()=>{setMobileMenu(!mobileMenu)}}
                                >
                                    Signup
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Navigation;
