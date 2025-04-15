import { callphpFunction } from "./index.js";
import { checkCookie } from "./index.js";
import { loginStat } from "./index.js";
//import { getCookie } from "./index.js";
//import { deleteCookie } from "./index.js";

function $(id) {
    return document.getElementById(id);
}

async function loadPage() {
    checkCookie("email");
    console.log(loginStat);
    
    if (loginStat == true) {
        window.location.href='./loginPage.html';
    }
}

async function regisztralas() {
    $("visszaJelzes").innerHTML = ""

    let userName = $("registerUsername").value;
    let userSteamId = $("registerSteamId").value;
    let userEmail = $("registerEmail").value;
    let userPassword = ($("registerPassword").value == $("registerConfirmPassword").value) ? $("registerPassword").value : 0;

    if(userName == "" || userSteamId == "" || userEmail == "" || userName == ""){
        $("visszaJelzes").innerHTML += `
            <div class="alert alert-danger" role="alert" style="padding: 8px;">
                Please fill all the blanks!
            </div>
        `;
    }
    else if (userPassword != 0) {
        let userAdatok = await callphpFunction("createUserData", {userName : userName, steamID : userSteamId, email : userEmail, password : userPassword});
        console.log(userAdatok);
        let kiiras = $("form-content")
        kiiras.innerHTML = `
            <h1 style="text-align: center;">Successful registration!</h1>
        `;
        let button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-primary");
        button.type = "button";
        button.innerHTML="Login";
        button.onclick = () => {location.href='./loginPage.html'};

        kiiras.appendChild(button);
    } else if(userPassword == 0){
        $("visszaJelzes").innerHTML += `
            <div class="alert alert-danger" role="alert" style="padding: 8px;">
                The passwords don't match!
            </div>
        `;
    }
    
}

$("inditas").addEventListener("click", regisztralas);
window.addEventListener("load", function() {
    loadPage();
});