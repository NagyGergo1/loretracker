import { callphpFunction } from "./index.js";
import { checkCookie } from "./index.js";
import { loginStat } from "./index.js";
import { getCookie } from "./index.js";
import { deleteCookie } from "./index.js";

function $(id) {
    return document.getElementById(id);
}

async function loadPage() {
    checkCookie("name");
    console.log(loginStat);
    if (loginStat == true) {
        $("form-content").innerHTML = "";
        let userName = getCookie("name");
        let userData = await callphpFunction("getUserByName", {name: userName});
        console.log(userData);
        let table = document.createElement("table");
        table.classList.add("table");
        
        table.innerHTML += `
            <tr>
                <th>Felhasználónév: </th>
                <td>${userData.userName}</td>
            </tr>
            <tr>
                <th>E-mail: </th>
                <td>${userData.email}</td>
            </tr>
            <tr>
                <th>SteamID: </th>
                <td>${userData.steamID}</td>
            </tr>
        `;
        let button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-danger");
        button.id = ("kilepes");
        button.type = "button";
        button.innerHTML = "Kilépés";

        $("form-content").appendChild(table);
        $("form-content").appendChild(button);

        $("kilepes").addEventListener("click", deleteCookie("name"));
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