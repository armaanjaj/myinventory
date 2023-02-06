import React, { useEffect, useState } from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
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
    }

    return (
        <>
            <section id="headSection" style={{ backgroundColor: `${mode.bgNavbar}` }}>
                <div className="navbar">
                    <Link to={"/"}>
                        <span className="navbar-logo" style={{ color: `${mode.colorNavbar}` }}>Myinventory</span>
                    </Link>
                    <span
                        className="navbar-logo-mode-icon"
                        onClick={handleMode}
                        style={{cursor: "pointer", color: `${mode.colorNavbar}` }}
                    >
                        {mode.bgNavbar === "#b1fcff" ? (
                            // <span onClick={darkMode(true)}>
                                <LightModeIcon />
                            // </span>
                        ) : (
                            // <span onClick={darkMode(false)}>
                                <NightlightRoundIcon />
                            // </span>
                        )}
                    </span>
                </div>
                <div className="navbar"></div>
                <div className="navbar">
                    <Link to={"/inventory"} style={{ color: `${mode.colorNavbar}` }}>Inventory</Link>
                    <Link to={"/logout"} style={{ color: `${mode.colorNavbar}` }}>Login</Link>
                    <Link to={"/logout"} style={{ color: `${mode.colorNavbar}` }}>Signup</Link>
                    <Link to={"/account"} style={{ color: `${mode.colorNavbar}` }}>
                        <AccountCircleIcon />
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Navigation;
