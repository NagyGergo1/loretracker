import { callphpFunction } from "./index.js";

function $(id) {
    return document.getElementById(id);
}

async function bejelentkezes() {
    let userEmail = $("loginEmail").value;
    let userPass = $("loginPassword").value;

    let userAdatok = await callphpFunction("getUserLogin", {email : userEmail, password : userPass});
    console.log(userAdatok);
}

$("inditas").addEventListener("click", bejelentkezes);