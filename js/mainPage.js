import { setCookie } from "./index.js";
import { checkCookie } from "./index.js";
import { deleteCookie } from "./index.js";
import { tempLogin } from "./index.js";
import { loginStat } from "./index.js";

function $(id) {
    return document.getElementById(id);
}

function loadPage() {
    checkCookie("email");
    if (loginStat == true) {
        window.location.href='./libraryPage.html';
    }
}

async function steamIdGet() {
    let hibaKiir = $("hibaKiir");
    let steamID = $("steamID_input").value;

    if (steamID == "") {
        hibaKiir.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Cannot procceed without your SteamID!               
            </div>
        `;
    }
}

window.addEventListener("load", loadPage);

$("idCheck").addEventListener("click", steamIdGet);