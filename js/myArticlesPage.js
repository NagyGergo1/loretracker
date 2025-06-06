import { $ } from "./index.js";
import { callphpFunction } from "./index.js";
import { steamRequest, loginStat, checkCookie, getCookie, loginCheck } from "./index.js";

window.addEventListener("load", loginCheck);

checkCookie("email");

function adjustPage() {
    const loginEmail = getCookie("email");

    if (!loginEmail) {
        $("toMyArticles").setAttribute("hidden", true);
        $("newPostBtn").hidden = true;
    }
}

async function loadPosts() {
    try {
        let userData = getCookie("userId");
        let jatekhozIrtak = new Set();
        let userArticles = await callphpFunction("getAdditionalByUser", { userID: userData });

        if (Array.isArray(userArticles)) {
            for (const data of userArticles) {
                jatekhozIrtak.add(data.jatekID);
            }
        } else if (userArticles) {
            jatekhozIrtak.add(userArticles.jatekID);
        }

        let kiiras = document.getElementById("game-sections");
        kiiras.innerHTML = "";

        // Game Sections load
        for (const element of jatekhozIrtak) {
            await postSections(element);

            let gameName = await callphpFunction("gameNameGet", { id: element });

            let gameSectionDiv = document.createElement("div");
            gameSectionDiv.classList.add("d-grid");

            let dGrid_button = document.createElement("button");
            dGrid_button.type = "button";
            dGrid_button.classList.add("btn");
            dGrid_button.setAttribute("data-bs-toggle", "collapse");
            dGrid_button.setAttribute("data-bs-target", `#gameSection${element}`);
            dGrid_button.style = "border-radius: 0px; background-color: orange;";
            dGrid_button.innerHTML = `${gameName.nev}`;

            gameSectionDiv.appendChild(dGrid_button);

            let dGrid_body = document.createElement("div");
            dGrid_body.classList.add("row");
            dGrid_body.classList.add("collapse");
            dGrid_body.classList.add("mx-0");
            dGrid_body.classList.add("gx-3");
            dGrid_body.id = `gameSection${element}`;
            dGrid_body.style = "margin-left: 10px !important; margin-right: 10px !important;";

            let postsForCurrentGame;

            if (Array.isArray(userArticles)) {
                postsForCurrentGame = userArticles.filter(article => article.jatekID == element);
            } else {
                if (userArticles && userArticles.jatekID == element) {
                    postsForCurrentGame = [userArticles];
                } else {
                    postsForCurrentGame = [];
                }
            }

            let aktFilter = $("communityFilter").value;
            switch (aktFilter) {
                case "timeAsc":
                    postsForCurrentGame.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                    break;
                case "timeDesc":
                    postsForCurrentGame.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    break;
                case "aToz":
                    postsForCurrentGame.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case "zToa":
                    postsForCurrentGame.sort((a, b) => b.title.localeCompare(a.title));
                    break;
            }

            for (const post of postsForCurrentGame) {
                let postSection = await callphpFunction("getChapterByID", {
                    pageId: post.relatedPageID,
                });

                let communityPostCard = document.createElement("div");
                communityPostCard.classList.add("card");
                communityPostCard.classList.add("community-post-card");
                communityPostCard.style = "margin-top: 10px; margin-bottom: 10px";
                communityPostCard.classList.add("col-12");
                communityPostCard.classList.add("col-md-6");

                communityPostCard.id = post.postID;

                let cardHeader = document.createElement("div");
                cardHeader.classList.add("card-header");

                let cardHeaderContent = document.createElement("div");
                cardHeaderContent.innerHTML = `
                                            <h5 style="display: inline;">${post.title}</h5>
                                            <div class="vr"></div>
                                            <h6 style="display: inline;">${postSection.chapterName}</h6>
                                            <div class="vr"></div>
                                            <h6 style="display: inline;">${post.created_at}</h6>
                                        `;

                let deletePostButton = document.createElement("button");
                deletePostButton.type = "submit";
                deletePostButton.classList.add("btn");
                deletePostButton.classList.add("btn-danger");
                deletePostButton.classList.add("postButton");
                deletePostButton.style = "display: inline;";
                deletePostButton.innerHTML = "Delete Post";
                deletePostButton.onclick = () => {
                    openDeleteConfirm();
                    localDeletePost(post.postID);
                };

                function callLocal() {
                    callphpFunction("deleteAdditional", { postID: post.postID }), location.reload();
                }

                function localDeletePost() {
                    document
                        .getElementById("deletePostButton")
                        .addEventListener("click", callLocal, { once: true });

                    document
                        .getElementById("cancelDelete")
                        .addEventListener("click", () => {
                            document
                                .getElementById("deletePostButton")
                                .removeEventListener("click", callLocal, false);
                        });
                }

                let editPostButton = document.createElement("button");
                editPostButton.type = "button";
                editPostButton.classList.add("btn");
                editPostButton.classList.add("btn-primary");
                editPostButton.classList.add("postButton");
                editPostButton.classList.add("editPostButton");
                editPostButton.style = "display: inline; margin-right: 10px; margin-left: 10px";
                editPostButton.innerHTML = "Edit Post";
                editPostButton.onclick = () => {
                    loadEditPost(post.postID);
                };

                cardHeaderContent.appendChild(editPostButton);
                cardHeaderContent.appendChild(deletePostButton);

                cardHeader.appendChild(cardHeaderContent);
                communityPostCard.appendChild(cardHeader);

                let cardBody = document.createElement("div");
                cardBody.classList.add("card-body");
                cardBody.innerHTML = `
                                            <div class="card-text">
                                                <p>${post.body}</p>
                                            </div>
                                        `;
                communityPostCard.appendChild(cardBody);

                dGrid_body.appendChild(communityPostCard);
            }

            kiiras.appendChild(gameSectionDiv);
            kiiras.appendChild(dGrid_body);

        }
    } catch (error) {
        console.log(error);
    }
}

async function searchPost() {
    try {
        let keresettSzoveg = $("text_articleSearch").value;
        let userId = getCookie("userId");
        let kiiras = document.getElementById("game-sections");
        kiiras.innerHTML = ""; // Clear previous content


        if (keresettSzoveg == "") {
            loadPosts();
        } else if (keresettSzoveg != "") {
            let kereses = await callphpFunction("searchAdditionalByTitleAndUser", {
                title: keresettSzoveg, userID: userId
            });
            if (Array.isArray(kereses)) {
                for (const post of kereses) {
                    postSections(post.jatekID);
                    // Card creation logic starts here
                    let postSection = await callphpFunction("getChapterByID", {
                        pageId: post.relatedPageID,
                    });

                    let communityPostCard = document.createElement("div");
                    communityPostCard.classList.add("card");
                    communityPostCard.classList.add("community-post-card");
                    communityPostCard.style = "margin-top: 10px;";
                    communityPostCard.classList.add("col-12");
                    communityPostCard.classList.add("col-md-6");


                    communityPostCard.id = post.postID;


                    let cardHeader = document.createElement("div");
                    cardHeader.classList.add("card-header");
                    let cardHeaderContent = document.createElement("div");
                    cardHeaderContent.innerHTML = `
                        <h5 style="display: inline;">${post.title}</h5>
                        <div class="vr"></div>
                        <h6 style="display: inline;">${postSection.chapterName}</h6>
                        <div class="vr"></div>
                        <h6 style="display: inline;">${post.created_at}</h6>
                    `;
                    let deletePostButton = document.createElement("button");
                    deletePostButton.type = "submit";
                    deletePostButton.classList.add("btn");
                    deletePostButton.classList.add("btn-danger");
                    deletePostButton.classList.add("postButton");
                    deletePostButton.style = "display: inline;";
                    deletePostButton.innerHTML = "Delete Post";
                    deletePostButton.onclick = () => {
                        openDeleteConfirm();
                        localDeletePost(post.postID);
                    };


                    function callLocal() {
                        callphpFunction("deleteAdditional", { postID: post.postID }), location.reload();
                    }


                    function localDeletePost() {
                        document
                            .getElementById("deletePostButton")
                            .addEventListener("click", callLocal, { once: true });
                        document
                            .getElementById("cancelDelete")
                            .addEventListener("click", () => {
                                document
                                    .getElementById("deletePostButton")
                                    .removeEventListener("click", callLocal, false);
                            });
                    }


                    let editPostButton = document.createElement("button");
                    editPostButton.type = "button";
                    editPostButton.classList.add("btn");
                    editPostButton.classList.add("btn-primary");
                    editPostButton.classList.add("postButton");
                    editPostButton.classList.add("editPostButton");
                    editPostButton.style = "display: inline; margin-right: 10px; margin-left: 10px";
                    editPostButton.innerHTML = "Edit Post";
                    editPostButton.onclick = () => {
                        loadEditPost(post.postID);
                    };


                    cardHeaderContent.appendChild(editPostButton);
                    cardHeaderContent.appendChild(deletePostButton);


                    cardHeader.appendChild(cardHeaderContent);
                    communityPostCard.appendChild(cardHeader);


                    let cardBody = document.createElement("div");
                    cardBody.classList.add("card-body");
                    cardBody.innerHTML = `
                        <div class="card-text">
                        <p>${post.body}</p>
                        </div>
                    `;
                    communityPostCard.appendChild(cardBody);


                    kiiras.appendChild(communityPostCard);
                    // Card creation logic ends here
                }
            } else if (kereses) {
                // Card creation logic starts here
                let postSection = await callphpFunction("getChapterByID", {
                    pageId: kereses.relatedPageID,
                });
                let communityPostCard = document.createElement("div");
                communityPostCard.classList.add("card");
                communityPostCard.classList.add("community-post-card");
                communityPostCard.style = "margin-top: 10px;";
                communityPostCard.classList.add("col-12");
                communityPostCard.classList.add("col-md-6");


                communityPostCard.id = kereses.postID;


                let cardHeader = document.createElement("div");
                cardHeader.classList.add("card-header");
                let cardHeaderContent = document.createElement("div");
                cardHeaderContent.innerHTML = `
                    <h5 style="display: inline;">${kereses.title}</h5>
                    <div class="vr"></div>
                    <h6 style="display: inline;">${postSection.chapterName}</h6>
                    <div class="vr"></div>
                    <h6 style="display: inline;">${kereses.created_at}</h6>
                `;
                let deletePostButton = document.createElement("button");
                deletePostButton.type = "submit";
                deletePostButton.classList.add("btn");
                deletePostButton.classList.add("btn-danger");
                deletePostButton.classList.add("postButton");
                deletePostButton.style = "display: inline;";
                deletePostButton.innerHTML = "Delete Post";
                deletePostButton.onclick = () => {
                    openDeleteConfirm();
                    localDeletePost(kereses.postID);
                };


                function callLocal() {
                    callphpFunction("deleteAdditional", { postID: kereses.postID }), location.reload();
                }


                function localDeletePost() {
                    document
                        .getElementById("deletePostButton")
                        .addEventListener("click", callLocal, { once: true });
                    document
                        .getElementById("cancelDelete")
                        .addEventListener("click", () => {
                            document
                                .getElementById("deletePostButton")
                                .removeEventListener("click", callLocal, false);
                        });
                }


                let editPostButton = document.createElement("button");
                editPostButton.type = "button";
                editPostButton.classList.add("btn");
                editPostButton.classList.add("btn-primary");
                editPostButton.classList.add("postButton");
                editPostButton.classList.add("editPostButton");
                editPostButton.style = "display: inline; margin-right: 10px; margin-left: 10px";
                editPostButton.innerHTML = "Edit Post";
                editPostButton.onclick = () => {
                    loadEditPost(kereses.postID);
                };


                cardHeaderContent.appendChild(editPostButton);
                cardHeaderContent.appendChild(deletePostButton);


                cardHeader.appendChild(cardHeaderContent);
                communityPostCard.appendChild(cardHeader);


                let cardBody = document.createElement("div");
                cardBody.classList.add("card-body");
                cardBody.innerHTML = `
    <div class="card-text">
    <p>${kereses.body}</p>
    </div>
    `;
                communityPostCard.appendChild(cardBody);


                kiiras.appendChild(communityPostCard);
                // Card creation logic ends here
            } else {
                kiiras.innerHTML = "<p>No matching articles found.</p>";
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function postSections(gameId) {
    let userData = await callphpFunction("getUserByEmail", { email: getCookie("email") });

    try {
        let gameData = await callphpFunction("gameNameGet", { id: gameId });

        let editSelect = $("editPostSection");
        let userAdatok = await steamRequest(gameData.steamID, userData.steamID);

        let jatekAdatok = await callphpFunction("gameLoadAll", { id: gameId });
        for (let i = 0; i < userAdatok.length; i++) {
            for (let j = 0; j < jatekAdatok.length; j++) {
                if (userAdatok[i].name == jatekAdatok[j].title) {
                    let optionEdit = document.createElement("option");
                    optionEdit.value = jatekAdatok[j].pageID;
                    optionEdit.innerHTML = `Chapter ${j + 1}: ${jatekAdatok[j].chapterName}`;

                    editSelect.appendChild(optionEdit);
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
    adjustPage();
}

function openDeleteConfirm() {
    const deleteModal = new bootstrap.Modal(document.getElementById("deleteConfirmModal"));
    deleteModal.show();
}

async function loadEditPost(postId) {
    try {
        const editModal = new bootstrap.Modal(document.getElementById("editPostModal"));
        editModal.show();
        let postData = await callphpFunction("getAdditionalById", { postID: postId });

        $("editPostTitle").value = postData.title;
        $("editPostSection").value = postData.relatedPageID;
        $("editPostText").value = postData.body.split("<br>").join("\n");

        $("editPostSubmit").onclick = () => {
            editPost(postData.postID, postData.jatekID, postData.typeID);
        };
    } catch (error) {
        console.log(error);
    }
}

async function editPost(postId, jatekId, typeId) {
    try {
        let editPostTitle = $("editPostTitle").value;
        let editPostPublisher = getCookie("userId");
        let editPostSection = $("editPostSection").value;
        let editPostText = $("editPostText").value;

        if (editPostTitle == "" || editPostSection == "" || editPostText == "") {
            $("editPostHiba").innerHTML = `
                        <div class="alert alert-danger mt-3" role="alert">
                            Please fill all the blanks!
                        </div>
                    `;
        } else {
            editPostText = editPostText.split(/\n/).join("<br>");

            await callphpFunction("updateAdditional", {
                postID: postId,
                jatekID: jatekId,
                typeID: typeId,
                title: editPostTitle,
                body: editPostText,
                relatedPageID: editPostSection,
            });

            location.reload();
        }
    } catch (error) {
        console.log(error);
    }
    adjustPage();
}

window.addEventListener("load", loadPosts);
$("startButton_communityFilter").addEventListener("click", loadPosts);
$("text_articleSearch").addEventListener("keydown", function (event) { 
    if (event.key === "Enter") {
        event.preventDefault();
        searchPost();
    }
});