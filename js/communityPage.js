import { $ } from "./index.js";
import { callphpFunction } from "./index.js";
import { steamRequest, loginStat, checkCookie, getCookie } from "./index.js";

checkCookie("email");
console.log(loginStat);

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function newPostSections() {
    const gameId = getQueryParam("gameId");

    let select = $("newPostSection");
    let userAdatok = await steamRequest();
    let jatekAdatok = await callphpFunction("gameloadall", {id : gameId});
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

async function loadCommunityPosts() {
    const gameId = getQueryParam("gameId");

    document.getElementById("lorePageLink").href = `./gamePage.html?gameId=${gameId}`;
}

async function ujPost() {
    let ujPostTitle = $("newPostTitle").value;
    let ujPostPublisher = getCookie("name");
    let ujPostSection = $("newPostSection").value;
    let ujPostText = $("newPostText").value;

    if (ujPostTitle == "" || ujPostSection == "" || ujPostText == "") {
        $("newPostHiba").innerHTML = "Please fill all the blanks!"
    }
    console.log(ujPostPublisher);
}

$("newPostSubmit").addEventListener("click", ujPost);

window.addEventListener("load", function() {
    newPostSections();
    loadCommunityPosts();
})