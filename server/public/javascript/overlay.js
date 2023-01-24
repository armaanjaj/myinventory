// overlay functionality
function openOverlay() {
    let header = document.getElementsByClassName("content-header")[0];
    header.style.padding = "230px 100px";
    document.getElementById("myNav").style.height = "100%";
}

async function closeOverlay() {
    document.getElementById("myNav").style.height = "0%";
    let header = document.getElementsByClassName("content-header")[0];
    header.style.padding = "190px 100px";
}