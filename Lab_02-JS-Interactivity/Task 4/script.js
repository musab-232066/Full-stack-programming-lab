function createBox(color){

    if(color.trim() === "") return;

    let div = document.createElement("div");
    div.className = "colorDiv";
    div.style.background = color;

    document.getElementById("colorContainer").appendChild(div);
}

function addColors(){

    createBox(document.getElementById("c1").value);
    createBox(document.getElementById("c2").value);
    createBox(document.getElementById("c3").value);

    showBrowserInfo();
}

function clearColors(){
    document.getElementById("colorContainer").innerHTML = "";
    document.getElementById("browserInfo").innerText = "";
}


// BOM info
function showBrowserInfo(){

    let width = window.innerWidth;
    let height = window.innerHeight;
    let browser = navigator.userAgent;

    document.getElementById("browserInfo").innerText =
        "Window Size: " + width + " x " + height +
        " | Browser Info: " + browser;
}
