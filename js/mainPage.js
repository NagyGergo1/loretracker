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
    let eredmKiir = $("eredmKiir");
    eredmKiir.innerHTML = ""
    let steamID = $("steamID_input").value;

    if (steamID === "") {
        eredmKiir.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Cannot proceed without your Steam ID!
            </div>
        `;
    } else {
        eredmKiir.innerHTML = `
            <div class="alert alert-success" role="alert">
                Successful tracking!
            </div>
        `;
        setSession("tempSteamID", steamID);
        $("toLibrary").removeAttribute("hidden");
    }
}

window.addEventListener("load", loadPage);

$("idCheck").addEventListener("click", steamIdGet);