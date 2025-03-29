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

    let gameData = await callphpFunction("gameNameGet", { id: gameId });
    let userData = await callphpFunction("getUserByEmail", { email: getCookie("email") });

    let select = $("newPostSection");
    let userAdatok = await steamRequest(gameData.steamID, userData.steamID);
    let jatekAdatok = await callphpFunction("gameLoadAll", { id: gameId });
    for (let i = 0; i < userAdatok.length; i++) {
        for (let j = 0; j < jatekAdatok.length; j++) {
            if (userAdatok[i].name == jatekAdatok[j].title) {
                let option = document.createElement("option");
                option.value = jatekAdatok[j].pageID;
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
    try {
        const gameId = getQueryParam("gameId");
        let ujPostTitle = $("newPostTitle").value;
        let ujPostPublisher = getCookie("userId");
        let ujPostSection = $("newPostSection").value;
        let ujPostText = $("newPostText").value;

        if (ujPostTitle == "" || ujPostSection == "" || ujPostText == "") {
            $("newPostHiba").innerHTML = `
            <div class="alert alert-danger mt-3" role="alert">
                Please fill all the blanks!
            </div>
        `;
        } else {
            let postUpload = await callphpFunction("createAdditional", {jatekID : gameId, typeID : 1, title : ujPostTitle, body : ujPostText, publisher : ujPostPublisher, relatedPageID : ujPostSection});

            $("newPostModalClose").click();
        }
        console.log(ujPostPublisher);
    } catch (error) {
        console.log(error);
    }
}

$("newPostSubmit").addEventListener("click", ujPost);

window.addEventListener("load", function () {
    newPostSections();
    loadCommunityPosts();
})