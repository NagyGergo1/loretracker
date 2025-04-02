import { callphpFunction, getCookie, getSession } from "./index.js";
import { checkCookie } from "./index.js";
import { loginStat } from "./index.js";
import { steamRequest } from "./index.js";


checkCookie("email");
console.log(loginStat);
function $(id) {
    return document.getElementById(id);
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function jatekAdatBetolt() {
    const gameId = getQueryParam("gameId");

    document.getElementById("communityLink").href = `./communityPage.html?gameId=${gameId}`

    console.log(getSession("tempSteamID"));

    let gameData = await callphpFunction("gameNameGet", {id : gameId});
    
    
    let kiiras = $("chapters");
    let tartalomJegy = $("chapter-nav");
    let userAdatok;
    if (loginStat == true) {
        let userData = await callphpFunction("getUserByEmail", {email : getCookie("email")});
        userAdatok = await steamRequest(gameData.steamID, userData.steamID);
    } else {
        userAdatok = await steamRequest(gameData.steamID, getSession("tempSteamID"));
        console.log(userAdatok);
    }
    let jatekAdatok = await callphpFunction("gameLoadAll", {id : gameId});
    
    for (let i = 0; i < userAdatok.length; i++) {
        for (let j = 0; j < jatekAdatok.length; j++) {
            if (userAdatok[i].name == jatekAdatok[j].title) {
                let chapter = document.createElement("div");
                chapter.id = "chapter" + (j + 1) + "Section";

                let chapterTitle = document.createElement("h2");
                chapterTitle.innerHTML = jatekAdatok[j].chapterName;
                chapterTitle.style = "padding: 5px"
                chapter.appendChild(chapterTitle);

                let chapterText = document.createElement("p");
                chapterText.innerHTML = `${jatekAdatok[j].body}`;
                chapter.appendChild(chapterText);

                let navDiv = document.createElement("div");
                navDiv.classList.add("nav-item");

                let chapterGomb = document.createElement("a");
                chapterGomb.classList.add("nav-link");
                chapterGomb.type = "button";
                chapterGomb.href = "#chapter" + (j + 1) + "Section";
                chapterGomb.innerHTML = jatekAdatok[j].chapterName;
                navDiv.appendChild(chapterGomb);

                tartalomJegy.appendChild(navDiv);
                kiiras.appendChild(chapter);

            }
        }
    }
    const scrollableContent = document.querySelector('.scrollable-content');
    const scrollSpy = new bootstrap.ScrollSpy(scrollableContent, {
        target: '#chapter-nav',
        offset: 100
    });

    let tempSteamID = getSession("tempSteamID");
    if (tempSteamID) {
        $("communityLink").style.pointerEvents = "none";
        $("communityLink").style.opacity = "0.5";
    }
}

function adjustNavbar() {
    const loginEmail = getCookie("email");

    if (!loginEmail) {
        $("toBookmarks").setAttribute("hidden", true);
        $("toMyArticles").setAttribute("hidden", true);
    } 
}

window.addEventListener("load", function() {
    jatekAdatBetolt();
    adjustNavbar();
})