import { callphpFunction } from "./index.js";

function $(id) {
    return document.getElementById(id);
}

async function regisztralas() {
    let userName = $("registerUsername").value;
    let userSteamId = $("registerSteamId").value;
    let userEmail = $("registerEmail").value;
    let userPassword = ($("registerPassword").value == $("registerConfirmPassword").value) ? $("registerPassword").value : 0;

    if (userPassword != 0) {
        let userAdatok = await callphpFunction("createUserData", {userName : userName, steamID : userSteamId, email : userEmail, password : userPassword});
        console.log(userAdatok);    
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