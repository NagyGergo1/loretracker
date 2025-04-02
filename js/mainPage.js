import { setCookie, getCookie, setSession, getSession, removeSession } from "./index.js";

function $(id) {
    return document.getElementById(id);
}

function loadPage() {
    const loginEmail = getCookie("email");
    $("toLibrary").setAttribute("hidden", true);

    if (loginEmail) {
        window.location.href = './libraryPage.html';
    } else {
        const tempSteamID = getSession("tempSteamID");

        if (tempSteamID) {
            $("toLibrary").removeAttribute("hidden");
        }
    }

    removeSession("tempSteamID");
}

async function steamIdGet() {
    let hibaKiir = $("hibaKiir");
    let steamID = $("steamID_input").value;

    if (steamID === "") {
        hibaKiir.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Cannot proceed without your SteamID!
            </div>
        `;
    } else {
        setSession("tempSteamID", steamID);
        $("toLibrary").removeAttribute("hidden");
    }
}

window.addEventListener("load", loadPage);

$("idCheck").addEventListener("click", steamIdGet);