import React from "react";
import "./Navigation.css"
import {Link} from "react-router-dom";

function Navigation(props) {
    return (
        <>
        <section id="headSection">
            <div className="navbar">
                <Link className="navlinks" replace to={"/inventory"}>MyInventory.com</Link>
            </div>
            <div className="navbar">
                
            </div>
            <div className="navbar">
                <Link className="navlinks" replace to={"/inventory"}>Inventory</Link>
                {/* <Link className="navlinks" replace to={"/admin"}>Admin</Link> */}
                <Link className="navlinks" replace to={"/account"}>Account</Link>
                <Link className="navlinks" replace to={"/logout"}>Logout</Link>
            </div>
        </section>
        </>
    );
}

export default Navigation;
