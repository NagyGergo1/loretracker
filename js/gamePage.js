import { callphpFunction, getCookie, getSession } from "./index.js";
import { checkCookie } from "./index.js";
import { loginStat } from "./index.js";
import { steamRequest } from "./index.js";
import { loginCheck } from "./index.js";

window.addEventListener('load', loginCheck)

var typeID = 1

checkCookie("email");
function $(id) {
    return document.getElementById(id);
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function jatekAdatBetolt() {
    if(!getCookie("email")) {
        $("communityLink").style.pointerEvents = "none";
        $("communityLink").style.opacity = "0.5";
    }

    const gameId = getQueryParam("gameId");

    if(gameId == 1){
        $("footerLink").href = "https://ghostoftsushima.fandom.com/"
    }
    else if(gameId == 2){
        $("footerLink").href = "https://horizon.fandom.com/"
    }

    document.getElementById("communityLink").href = `./communityPage.html?gameId=${gameId}`

    let gameData = await callphpFunction("gameNameGet", {id : gameId});
    let gameName = document.getElementById("gameName");
    gameName.innerHTML = gameData.nev
    
    let kiiras = $("chapters");
    kiiras.innerHTML = ""
    let tartalomJegy = $("chapter-nav");
    tartalomJegy.innerHTML = ""
    let userAdatok;

    let profileData = await callphpFunction("getUserByEmail", {email: getCookie("email")})
    if(profileData.admin == 1){
        let newChapterBtn = document.createElement("button")
        newChapterBtn.type = "button"
        newChapterBtn.classList.add("btn");
        newChapterBtn.classList.add("btn-primary");
        newChapterBtn.classList.add("newChapterButton");
        newChapterBtn.style = "margin: 0 auto; display: block; padding-left: 30px; padding-right: 30px;"
        newChapterBtn.innerHTML = "New Chapter"

        newChapterBtn.addEventListener('click', ()=>{
            loadNewChapter()
        })

        kiiras.appendChild(document.createElement("hr"))
        kiiras.appendChild(newChapterBtn)
        kiiras.appendChild(document.createElement("hr"))
    }

    let typeTitle = $("typeTitle")
    typeTitle.innerHTML = ""
    if(typeID == 1) typeTitle.innerHTML = "Main Quest"
    else if(typeID == 2) typeTitle.innerHTML = "Side Quests"
    else if(typeID == 3) typeTitle.innerHTML = "Characters"

    if (loginStat == true) {
        let userData = await callphpFunction("getUserByEmail", {email : getCookie("email")});
        userAdatok = await steamRequest(gameData.steamID, userData.steamID);
    } else {
        userAdatok = await steamRequest(gameData.steamID, getSession("tempSteamID"));
    }
    

    if(userAdatok == "" || userAdatok == undefined){
        return document.getElementById("chapters").innerHTML = "<div class='alert alert-danger' role='alert' style='width: max-content;'>You haven't reached any achievements for this game yet.</div>"
    }

    let jatekAdatok = await callphpFunction("gameLoadAll", {id : gameId});

    for (let i = 0; i < userAdatok.length; i++) {
        for (let j = 0; j < jatekAdatok.length; j++) {
            if (userAdatok[i].name == jatekAdatok[j].title && userAdatok[i].achieved && jatekAdatok[j].typeID == typeID) {
                let chapter = document.createElement("div");
                chapter.id = "chapter" + (j + 1) + "Section";
                chapter.style.marginBottom = "40px"

                let chapterTitleDiv = document.createElement("div")
                chapterTitleDiv.style = "padding: 5px; background-color: orange; display: flex; justify-content: space-between; align-items: center;"
                chapterTitleDiv.style.backgroundColor = "orange"

                let chapterTitle = document.createElement("h3");
                chapterTitle.innerHTML = jatekAdatok[j].chapterName;
                chapterTitle.style = "margin: 1px; width: fit-content"
                chapterTitleDiv.appendChild(chapterTitle)

                const pageID = jatekAdatok[j].pageID

                if(profileData.admin == 1){
                    let editChapterButton = document.createElement("button")
                    editChapterButton.type = "button"
                    editChapterButton.classList.add("btn");
                    editChapterButton.classList.add("btn-primary");
                    editChapterButton.classList.add("editChapterButton");
                    editChapterButton.style = "display: inline; margin-right: 10px; margin-left: 10px; margin-top: 5px; margin-bottom: 5px; width: fit-content";
                    editChapterButton.innerHTML = "Edit Chapter"

                    editChapterButton.addEventListener('click', ()=>{
                        loadEditChapter(pageID)
                    })

                    chapterTitleDiv.appendChild(editChapterButton)
                }

                chapter.appendChild(chapterTitleDiv);

                let chapterText = document.createElement("p");
                chapterText.style.marginTop = "10px"
                chapterText.style.paddingLeft = "5px"
                chapterText.style.paddingRight = "5px"
                chapterText.innerHTML = `${jatekAdatok[j].body}`;
                chapter.appendChild(chapterText);

                let acceptedPosts = await callphpFunction("getAdditionalByRelatedAndAccepted", {relatedPageID: parseInt(jatekAdatok[j].pageID)})
                if(acceptedPosts != "Nincsenek találatok!"){
                    let additionalText = document.createElement("h4")
                    additionalText.style.marginTop = "30px"

                    if(Array.isArray(acceptedPosts)){
                        additionalText.innerHTML = "Community Posts:"
                        chapter.appendChild(additionalText)

                        for (let post of acceptedPosts) {
                            let additionalTitle = document.createElement("h4")
                            let postPublisher = await callphpFunction("getUserData", {id: post.publisher})
                            additionalTitle.innerHTML = post.title + " | publisher: " + postPublisher.userName
                            additionalTitle.style.backgroundColor = "orange"
                            additionalTitle.style.maxWidth = "fit-content"
                            additionalTitle.style.padding = "3px"
                            chapter.appendChild(additionalTitle)

                            let additionalBody = document.createElement("p")
                            additionalBody.innerHTML = post.body
                            chapter.appendChild(additionalBody)
                        }
                    }
                    else{
                        additionalText.innerHTML = "Community Post:"
                        chapter.appendChild(additionalText)

                        let additionalTitle = document.createElement("h4")
                        let postPublisher = await callphpFunction("getUserData", {id: acceptedPosts.publisher})
                        additionalTitle.innerHTML = acceptedPosts.title + " | publisher: " + postPublisher.userName
                        additionalTitle.style.backgroundColor = "orange"
                        additionalTitle.style.maxWidth = "fit-content"
                        additionalTitle.style.padding = "3px"
                        chapter.appendChild(additionalTitle)

                        let additionalBody = document.createElement("p")
                        additionalBody.innerHTML = acceptedPosts.body
                        chapter.appendChild(additionalBody)
                    }
                }


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
        offset: 30
    });
}

async function newChapterTypes() {
    try {
        let newSelect = $("newChapterType");
        let editSelect = $("editChapterType");

        let types = await callphpFunction("getAlltipus")

        for (let type of types) {
            let option = document.createElement("option")
            option.id = type.typeID
            option.value = type.typeID
            option.innerHTML = type.typeName

            newSelect.appendChild(option)
        }

        for (let type of types) {
            let option = document.createElement("option")
            option.id = type.typeID
            option.value = type.typeID
            option.innerHTML = type.typeName

            editSelect.appendChild(option)
        }

    } catch (error) {
        console.log(error);
    }
}

async function loadNewChapter(){
    try {
        $("newChapterHiba").innerHTML = ""

        const editModal = new bootstrap.Modal(document.getElementById('newChapterModal'));
        editModal.show();

    } catch (error) {
        console.log(error)
    }
}

async function newChapter(){
    try {
        $("newChapterHiba").innerHTML = ""

        const gameId = getQueryParam("gameId");
        let type = $("newChapterType").value
        let title = $("newChapterTitle").value
        let name = $("newChapterName").value
        let body = $("newChapterText").value

        if(type == "" || title == "" || name == "" || body == ""){
            $("newChapterHiba").innerHTML = `
            <div class="alert alert-danger mt-3" role="alert">
                Please fill all the blanks!
            </div>
            `;
        }
        else{
            body = body.split(/\n/).join("<br>")

            await callphpFunction("createLorepage", {jatekID: gameId, typeID: type, title: title, chapterName: name, body: body})

            sessionStorage.setItem("selectedType", typeID)
            sessionStorage.setItem("scrollState", $("chapterScroll").scrollTop)

            location.reload()
        }
        
    } catch (error) {
        console.log(error)
    }
}
$("newChapterSubmit").addEventListener("click", newChapter)

async function loadEditChapter(chapterId){
    try {
        $("editChapterHiba").innerHTML = ""

        const editModal = new bootstrap.Modal(document.getElementById('editChapterModal'));
        editModal.show();

        let chapterData = await callphpFunction("getChapterByID", {pageId: chapterId})
        
        let type = $("editChapterType")
        let title = $("editChapterTitle")
        let name = $("editChapterName")
        let body = $("editChapterText")

        type.value = chapterData.typeID
        title.value = chapterData.title
        name.value = chapterData.chapterName
        body.value = chapterData.body.split("<br>").join("\n")

        $("editChapterSubmit").addEventListener('click', ()=>{ editChapter(chapterId) })
        $("editChapterModalClose").addEventListener('click', () => { $("editChapterSubmit").removeEventListener('click', ()=>{ editChapter(chapterId) }, false) }, { once: true })
        $("editChapterModalClose").addEventListener('click', () => { $("editChapterSubmit").removeEventListener('click', ()=>{ editChapter(chapterId) }, false) }, { once: true })

    } catch (error) {
        console.log(error)
    }
}

async function editChapter(chapterId){
    try {
        $("editChapterHiba").innerHTML = ""

        let type = $("editChapterType").value
        let title = $("editChapterTitle").value
        let name = $("editChapterName").value
        let body = $("editChapterText").value

        if(type == "" || title == "" || name == "" || body == ""){
            $("editChapterHiba").innerHTML = `
            <div class="alert alert-danger mt-3" role="alert">
                Please fill all the blanks!
            </div>
            `;
        }
        else{
            body = body.split(/\n/).join("<br>")
            await callphpFunction("updateLorepage", {pageId: chapterId, typeID: type, title: title, chapterName: name, body: body})

            sessionStorage.setItem("selectedType", typeID)
            sessionStorage.setItem("scrollState", $("chapterScroll").scrollTop)

            location.reload()
        }

    } catch (error) {
        console.log(error)
    }
}

function adjustNavbar() {
    const loginEmail = getCookie("email");

    if (!loginEmail) {
        $("toMyArticles").setAttribute("hidden", true);
    } 
}

window.addEventListener("DOMContentLoaded", async function() {
    await jatekAdatBetolt();
    await newChapterTypes();
    adjustNavbar();

    if(sessionStorage.getItem("selectedType") && sessionStorage.getItem("scrollState")){
        if(sessionStorage.getItem("selectedType") == 2){
            $("sideQuestBtn").click()
        }
        else if(sessionStorage.getItem("selectedType") == 3){
            $("charactersBtn").click()
        }

        setTimeout(() => {
            $("chapterScroll").scrollTop = sessionStorage.getItem("scrollState")
        }, 500);

        sessionStorage.removeItem("selectedType")
    }
})

$("mainQuestBtn").addEventListener('click', () => {
    typeID = 1
    $("mainQuestBtn").style.backgroundColor = "orange"
    $("sideQuestBtn").style.backgroundColor = "#ccc"
    $("charactersBtn").style.backgroundColor = "#ccc"
    jatekAdatBetolt()
})

$("sideQuestBtn").addEventListener('click', () => {
    typeID = 2
    $("mainQuestBtn").style.backgroundColor = "#ccc"
    $("sideQuestBtn").style.backgroundColor = "orange"
    $("charactersBtn").style.backgroundColor = "#ccc"
    jatekAdatBetolt()
})

$("charactersBtn").addEventListener('click', () => {
    typeID = 3
    $("mainQuestBtn").style.backgroundColor = "#ccc"
    $("sideQuestBtn").style.backgroundColor = "#ccc"
    $("charactersBtn").style.backgroundColor = "orange"
    jatekAdatBetolt()
})