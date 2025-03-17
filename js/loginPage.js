import { callphpFunction } from "./index.js";
import { setCookie } from "./index.js";
import { getCookie } from "./index.js";
import { checkCookie } from "./index.js";
import { loginStat } from "./index.js";
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

async function bejelentkezes() {
    let userEmail = $("loginEmail").value;
    let userPass = $("loginPassword").value;

    if (userEmail == "") {
        $("hibakiir").innerHTML = `
            <div class="alert alert-danger" role="alert">
                Kérem adja meg az e-mail címét!
            </div>
        `;
        return;
    } else if (userPass == "") {
        $("hibakiir").innerHTML = `
            <div class="alert alert-danger" role="alert">
                Kérem adja meg a jelszavát!
            </div>
        `;
        return;
    }

    try {
        let userAdatok = await callphpFunction("getUserLogin", { email: userEmail, password: userPass });
        console.log(userAdatok.userName);

        if (userAdatok && userAdatok.userName) {
            setCookie("name", userAdatok.userName);
            setCookie("email", userAdatok.email);
            console.log(getCookie("name"));
            checkCookie("name");
        }
    } catch (error) {
        console.log(error);
    }

}

window.addEventListener("load", function() {
    loadPage();
})

$("inditas").addEventListener("click", bejelentkezes);