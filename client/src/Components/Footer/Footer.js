import React from "react";
import "./Footer.css"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
    return (
        <footer id="foot">
            <div id="logoName">MYINVENTORY</div>
            <div id="linkContainer">
                <div className="footLink about">
                    <div className="sectionHead">ABOUT</div>
                    <a href="#">About</a>
                    <a href="#">Contact us</a>
                    <a href="#">FAQ</a>
                </div>
                <div className="footLink professional">
                    <div className="sectionHead">PROFESSIONALS</div>
                    <a href="/">Add your item</a>
                    <a href="https://github.com/armaanjaj/myinventory">Contribute to MYINVENTORY</a>
                </div>
                <div className="footLink follow">
                    <a href="https://github.com/armaanjaj" target={"_blank"}><GitHubIcon/></a>
                    <a href="https://linkedin.com/in/connectarmaan" target={"_blank"} style={{color:"#004182"}}><LinkedInIcon/></a>
                </div>
            </div>
            <br />
            <div className="legalContent">
                <div>
                    MYINVENTORY <span id="year">{new Date().getFullYear()}</span>
                </div>
                &nbsp;|&nbsp;
                <a href="#">Privacy</a>
                &nbsp;|&nbsp;
                <a href="#">Terms</a>
            </div>
        </footer>
    );
}

export default Footer;
