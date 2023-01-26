import React from "react";
import "./Footer.css"

function Footer() {
    return (
        <footer id="foot">
            <div id="logoName">My Inventory</div>
            <div id="linkContainer">
                <div className="footLink about">
                    <div className="sectionHead">ABOUT</div>
                    <a href="#">About</a>
                    <a href="#">Contact us</a>
                    <a href="#">FAQ</a>
                    <a href="#">Careers</a>
                    <a href="#">Advertise</a>
                    <a href="#">Media kit</a>
                </div>
                <div className="footLink subscription">
                    <div className="sectionHead">SUBSCRIPTIONS</div>
                    <a href="#">Subscribe to company</a>
                    <a href="#">Gift company magazine</a>
                    <a href="#">Home nVentory+ Subscription Help</a>
                    <a href="#">Magazine Subscription Help</a>
                </div>
                <div className="footLink professional">
                    <div className="sectionHead">PROFESSIONALS</div>
                    <a href="#">Add your home</a>
                    <a href="#">Sell your products</a>
                    <a href="#">Contribute to Home nVentory</a>
                    <a href="#">Promote your work</a>
                </div>
                <div className="footLink follow">
                    <div className="sectionHead">FOLLOW</div>
                    <a href="#">Instagram</a>
                    <a href="#">Pinterest</a>
                    <a href="#">Facebook</a>
                    <a href="#">Twitter</a>
                    <a href="#">Flipboard</a>
                    <a href="#">Comapany RSS</a>
                </div>
            </div>
            <br />
            <div className="legalContent">
                <div>
                    &copy;<span id="year"></span> My Inventory, inc. All rights
                    reserved.
                </div>
                &nbsp;
                <a href="#">Privacy</a>
                &nbsp;|&nbsp;
                <a href="#">Terms</a>
                &nbsp;|&nbsp;
                <a href="#">Sitemap</a>
            </div>
        </footer>
    );
}

export default Footer;
