// nav bar functionality
window.onscroll = () => {
    var links = document.getElementsByClassName("navlinks");
    document.getElementById("headSection").style.transition = ".2s";

    const underline = document.getElementsByClassName('navlinks');

    if (this.scrollY <= 70) {
        document.getElementById("headSection").style.backgroundColor = "transparent";
        document.getElementById("headSection").style.boxShadow = "none";
        underline[0].style.setProperty('--underlineAfterBackColor', 'white');
        underline[1].style.setProperty('--underlineAfterBackColor', 'white');
        underline[2].style.setProperty('--underlineAfterBackColor', 'white');
        underline[3].style.setProperty('--underlineAfterBackColor', 'white');
        links[0].style.color = "white";
        links[0].style.borderBottom = "1.5px solid white";
        links[1].style.color = "white";
        links[2].style.color = "white";
        links[3].style.color = "white";
    } else {
        document.getElementById("headSection").style.backgroundColor = "white";
        document.getElementById("headSection").style.boxShadow = "0 2px 30px rgb(0 0 0 / 63%)";
        underline[0].style.setProperty('--underlineAfterBackColor', 'black');
        underline[1].style.setProperty('--underlineAfterBackColor', 'black');
        underline[2].style.setProperty('--underlineAfterBackColor', 'black');
        underline[3].style.setProperty('--underlineAfterBackColor', 'black');
        links[0].style.color = "black";
        links[0].style.borderBottom = "1.5px solid black";
        links[1].style.color = "black";
        links[2].style.color = "black";
        links[3].style.color = "black";
    }
};