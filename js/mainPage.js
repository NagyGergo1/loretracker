import { setCookie } from "./index.js";
import { checkCookie } from "./index.js";
import { deleteCookie } from "./index.js";
import { tempLogin } from "./index.js";

function $(id) {
    return document.getElementById(id);
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

$("idCheck").addEventListener("click", steamIdGet);