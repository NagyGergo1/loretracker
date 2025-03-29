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

    let kiiras = $("actual_page");

    let getPosts = await callphpFunction("getAdditionalByTimeAsc", { gameId: gameId });

    console.log(getPosts);

    for (let i = 0; i < getPosts.length; i++) {
        let postPub = await callphpFunction("getUserData", { id: getPosts[i].publisher });
        postPub = postPub.userName;

        let postSection = await callphpFunction("gameLoadAll", { id: getPosts[i].relatedPageID });
        postSection = postSection[i].title;

        console.log(postPub);
        console.log(postSection);

        let communityPostCard = document.createElement("div");
        communityPostCard.classList.add("card");
        communityPostCard.style = "width: 100%;";

        let cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");
        cardHeader.innerHTML = `
            <span>
                <div>
                    <h5 style="display: inline;">${getPosts[i].title}</h5>
                    <div class="vr"></div>
                    <h6 style="display: inline;">By: ${postPub}</h6>
                    <div class="vr"></div>
                    <h6 style="display: inline;">Chapter X</h6>
                    <div class="vr"></div>
                    <h6 style="display: inline;">2025.03.11</h6>
                    <div class="btn-group upDownVote">
                        <button type="button" class="btn btn-success post-vote-btn">&#xf062</button>
                        <button type="button" class="btn btn-danger post-vote-btn">&#xf063</button>
                    </div>
                </div>
            </span>
        `;

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.innerHTML = `
            <div class="card-text" style="border-bottom: 1px solid black;">
                <p></p>
            </div>
        `;
    }
    for (const data of getPosts) {

    }
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
            let postUpload = await callphpFunction("createAdditional", { jatekID: gameId, typeID: 1, title: ujPostTitle, body: ujPostText, publisher: ujPostPublisher, relatedPageID: ujPostSection });

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