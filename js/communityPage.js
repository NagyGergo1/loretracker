import { $ } from "./index.js";
import { callphpFunction } from "./index.js";
import { steamRequest } from "./index.js";

async function newPostSections() {
    let select = $("newPostSection");
    let userAdatok = await steamRequest();
    let jatekAdatok = await callphpFunction("gameloadall", {id : 1});
    for (let i = 0; i < userAdatok.length; i++) {
        for (let j = 0; j < jatekAdatok.length; j++) {
            if (userAdatok[i].name == jatekAdatok[j].title) {
                let option = document.createElement("option");
                option.value = jatekAdatok[j].title;
                option.innerHTML = `Chapter ${j + 1}`;

                select.appendChild(option);
            }
        }
    }
}

async function ujPost() {
    let kiiras = $("content-area");

    kiiras.innerHTML = "";

    let ujPostDiv = document.createElement("div");
    ujPostDiv.classList.add("new-post-area");

    let ujPostForm = document.createElement("form");

    ujPostForm.innerHTML += ``;
}

window.addEventListener("load", function() {
    newPostSections();
})