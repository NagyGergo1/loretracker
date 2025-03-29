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
    let userName = $("registerUsername").value;
    let userSteamId = $("registerSteamId").value;
    let userEmail = $("registerEmail").value;
    let userPassword = ($("registerPassword").value == $("registerConfirmPassword").value) ? $("registerPassword").value : 0;

    if (userPassword != 0) {
        let userAdatok = await callphpFunction("createUserData", {userName : userName, steamID : userSteamId, email : userEmail, password : userPassword});
        console.log(userAdatok);
        let kiiras = $("form-content")
        kiiras.innerHTML = `
            <h1 style="text-align: center;">Sikeres regisztráció!</h1>
        `;
        let button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-primary");
        button.type = "button";
        button.innerHTML="Bejelentkezés";
        button.onclick = () => {location.href='./loginPage.html'};

        kiiras.appendChild(button);
    } else {
        //$("visszaJelzes").innerHTML = "";
        $("visszaJelzes").innerHTML += `
            <div class="alert alert-danger" role="alert">
                A két jelszó nem egyezik meg!
            </div>
        `;
    }
    
}

$("inditas").addEventListener("click", regisztralas);
window.addEventListener("load", function() {
    loadPage();
});