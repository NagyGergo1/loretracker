import { steamRequest } from "./index.js";

function $(id) {
    return document.getElementById(id);
}

async function jatek1Check() {
    let vanJatek = await steamRequest();
    console.log(vanJatek);

    if (vanJatek == false) {
        console.log("OK");
    }
}

window.addEventListener("load", function() {
    jatek1Check();
});