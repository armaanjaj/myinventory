import React from "react";
import Footer from "../Components/Footer/Footer";
import Body from "../Components/Inventory/Body/Body";
import Hero from "../Components/Inventory/Hero/Hero";
import Navigation from "../Components/Navigation/Navigation";

function Inventory() {
    return (
        <>
            <Navigation/>
            <Hero/>
            <Body/>
            <Footer/>
        </>
    );
}

export default Inventory;
