import React from "react";
import "./Navigation.css"
import {Link} from "react-router-dom";

function Navigation(props) {
    return (
        <>
        <section id="headSection">
            <nav id="navbar">
                <Link className="navlinks" replace to={"/inventory"}>Inventory</Link>
                <Link className="navlinks" replace to={"/admin"}>Admin</Link>
                <Link className="navlinks" replace to={"/account"}>Account</Link>
                <Link className="navlinks" replace to={"/logout"}>Logout</Link>
            </nav>
        </section>
        </>
    );
}

export default Navigation;
