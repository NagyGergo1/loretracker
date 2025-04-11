import { $ } from "./index.js";
import { callphpFunction } from "./index.js";
import { steamRequest, loginStat, checkCookie, getCookie, loginCheck } from "./index.js";

window.addEventListener('load', loginCheck)

checkCookie("email");
console.log(loginStat);

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function newPostSections() {
    try {
        const gameId = getQueryParam("gameId");

        let gameData = await callphpFunction("gameNameGet", { id: gameId });
        let userData = await callphpFunction("getUserByEmail", { email: getCookie("email") });

        let gameName = document.getElementById("gameName");
        gameName.innerHTML = gameData.nev

        console.log();

        let newSelect = $("newPostSection");
        let editSelect = $("editPostSection");
        let userAdatok = await steamRequest(gameData.steamID, userData.steamID);
        let jatekAdatok = await callphpFunction("gameLoadAll", { id: gameId });
        for (let i = 0; i < userAdatok.length; i++) {
            for (let j = 0; j < jatekAdatok.length; j++) {
                if (userAdatok[i].name == jatekAdatok[j].title) {
                    let optionNew = document.createElement("option");
                    optionNew.value = jatekAdatok[j].pageID;
                    optionNew.innerHTML = `Chapter ${j + 1}: ${jatekAdatok[j].chapterName}`;

                    let optionEdit = document.createElement("option");
                    optionEdit.value = jatekAdatok[j].pageID;
                    optionEdit.innerHTML = `Chapter ${j + 1}: ${jatekAdatok[j].chapterName}`;

                    newSelect.appendChild(optionNew);
                    editSelect.appendChild(optionEdit);
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function loadCommunityPosts() {
    const gameId = getQueryParam("gameId");

    document.getElementById("lorePageLink").href = `./gamePage.html?gameId=${gameId}`;

    let kiiras = $("actual_page");
    kiiras.innerHTML = "";

    let getPosts;

    let aktFilter = $("communityFilter").value;

    switch (aktFilter) {
        case "timeAsc":
            getPosts = await callphpFunction("getAdditionalByTimeAsc", { gameId: gameId });
            break;

        case "timeDesc":
            getPosts = await callphpFunction("getAdditionalByTimeDesc", { gameId: gameId });
            break;

            break;

        case "aToz":
            getPosts = await callphpFunction("getAdditionalByTitleAsc", { gameId: gameId });
            break;

        case "zToa":
            getPosts = await callphpFunction("getAdditionalByTitleDesc", { gameId: gameId });
            break;
    }

    if (!(Array.isArray(getPosts))) {
        let postPub = await callphpFunction("getUserData", { id: getPosts.publisher });
        postPub = postPub.userName;

        let postSection = await callphpFunction("getChapterTitle", { gameId: gameId, pageId: getPosts.relatedPageID });
        postSection = postSection.chapterName;

        let communityPostCard = document.createElement("div");
        communityPostCard.classList.add("card");
        communityPostCard.classList.add("community-post-card");
        communityPostCard.style = "width: 100%; margin-bottom: 10px; max-width: 100%";
        communityPostCard.id = getPosts.postID;

        let cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");

        let cardHeaderContent = document.createElement("div");
        cardHeaderContent.innerHTML = `
                <h5 style="display: inline;">${getPosts.title}</h5>
                <div class="vr"></div>
                <h6 style="display: inline;">By: ${postPub}</h6>
                <div class="vr"></div>
                <h6 style="display: inline;">${postSection}</h6>
                <div class="vr"></div>
                <h6 style="display: inline;">${getPosts.created_at}</h6>
            `;
        let upDownVote = document.createElement("div")
        upDownVote.classList = "btn-group upDownVote"

        let upvote = document.createElement("button")
        upvote.onclick = () => { callphpFunction('likeAdditional', { postID: getPosts.postID }), toastUp() }
        upvote.type = "button"
        upvote.classList = "btn btn-success post-vote-btn"
        upvote.innerHTML = "&#xf087"
        upvote.id = "upVote"
        upDownVote.appendChild(upvote)

        let downvote = document.createElement("button")
        downvote.onclick = () => { callphpFunction('dislikeAdditional', { postID: getPosts.postID }), toastDown() }
        downvote.type = "button"
        downvote.classList = "btn btn-danger post-vote-btn"
        downvote.innerHTML = "&#xf088"
        downvote.id = "downVote"
        upDownVote.appendChild(downvote)

        cardHeaderContent.appendChild(upDownVote)


        let deletePostButton = document.createElement("button");
        deletePostButton.type = "submit";
        deletePostButton.classList.add("btn");
        deletePostButton.classList.add("btn-danger");
        deletePostButton.classList.add("postButton");
        deletePostButton.style = "display: inline;";
        deletePostButton.innerHTML = "Delete Post";
        deletePostButton.onclick = () => { openDeleteConfirm(), localDeletePost() };

        function callLocal(){
            callphpFunction("deleteAdditional", { postID: getPosts.postID }), location.reload()
        }

        function localDeletePost(){
            document.getElementById("deletePostButton").addEventListener('click', callLocal, { once: true })

            document.getElementById("cancelDelete").addEventListener('click', () => { document.getElementById("deletePostButton").removeEventListener('click', callLocal, false) })
        }


        let editPostButton = document.createElement("button");
        editPostButton.type = "button";
        editPostButton.classList.add("btn");
        editPostButton.classList.add("btn-primary");
        editPostButton.classList.add("postButton");
        editPostButton.style = "display: inline; margin-right: 10px; margin-left: 10px";
        editPostButton.innerHTML = "Edit Post";
        editPostButton.onclick = () => {
            loadEditPost(getPosts.postID);
        }


        if (postPub == getCookie("name")) {
            cardHeaderContent.appendChild(editPostButton);
            cardHeaderContent.appendChild(deletePostButton);
        }

        cardHeader.appendChild(cardHeaderContent);

        communityPostCard.appendChild(cardHeader);

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.innerHTML = `
                <div class="card-text">
                    <p>${getPosts.body}</p>
                </div>
            `;
        communityPostCard.appendChild(cardBody);

        kiiras.appendChild(communityPostCard);
    } else {
        for (let i = 0; i < getPosts.length; i++) {
            let postPub = await callphpFunction("getUserData", { id: getPosts[i].publisher });
            postPub = postPub.userName;

            let postSection = await callphpFunction("getChapterTitle", { gameId: gameId, pageId: getPosts[i].relatedPageID });
            postSection = postSection.chapterName;

            let communityPostCard = document.createElement("div");
            communityPostCard.classList.add("card");
            communityPostCard.classList.add("community-post-card");
            communityPostCard.style = "width: 100%; margin-bottom: 10px; max-width: 100%";
            communityPostCard.id = getPosts[i].postID;

            let cardHeader = document.createElement("div");
            cardHeader.classList.add("card-header");

            let cardHeaderContent = document.createElement("div");
            cardHeaderContent.innerHTML = `
                <h5 style="display: inline;">${getPosts[i].title}</h5>
                <div class="vr"></div>
                <h6 style="display: inline;">By: ${postPub}</h6>
                <div class="vr"></div>
                <h6 style="display: inline;">${postSection}</h6>
                <div class="vr"></div>
                <h6 style="display: inline;">${getPosts[i].created_at}</h6>
            `;
            let upDownVote = document.createElement("div")
            upDownVote.classList = "btn-group upDownVote"
    
            let upvote = document.createElement("button")
            upvote.onclick = () => { callphpFunction('likeAdditional', { postID: getPosts[i].postID }), toastUp() }
            upvote.type = "button"
            upvote.classList = "btn btn-success post-vote-btn"
            upvote.innerHTML = "&#xf087"
            upvote.id = "upVote"
            upDownVote.appendChild(upvote)
    
            let downvote = document.createElement("button")
            downvote.onclick = () => { callphpFunction('dislikeAdditional', { postID: getPosts[i].postID }), toastDown() }
            downvote.type = "button"
            downvote.classList = "btn btn-danger post-vote-btn"
            downvote.innerHTML = "&#xf088"
            downvote.id = "downVote"
            upDownVote.appendChild(downvote)
    
            cardHeaderContent.appendChild(upDownVote)
            

            let deletePostButton = document.createElement("button");
            deletePostButton.type = "submit";
            deletePostButton.classList.add("btn");
            deletePostButton.classList.add("btn-danger");
            deletePostButton.classList.add("postButton");
            deletePostButton.style = "display: inline;";
            deletePostButton.innerHTML = "Delete Post";
            deletePostButton.onclick = () => { openDeleteConfirm(), localDeletePost() };

            function callLocal(){
                callphpFunction("deleteAdditional", { postID: getPosts[i].postID }), location.reload()
            }
    
            function localDeletePost(){
                document.getElementById("deletePostButton").addEventListener('click', callLocal, { once: true })
    
                document.getElementById("cancelDelete").addEventListener('click', () => { document.getElementById("deletePostButton").removeEventListener('click', callLocal, false) })
            }


            let editPostButton = document.createElement("button");
            editPostButton.type = "button";
            editPostButton.classList.add("btn");
            editPostButton.classList.add("btn-primary");
            editPostButton.classList.add("postButton");
            editPostButton.style = "display: inline; margin-right: 10px; margin-left: 10px";
            editPostButton.innerHTML = "Edit Post";
            editPostButton.onclick = () => {
                loadEditPost(getPosts[i].postID);
            }


            if (postPub == getCookie("name")) {
                cardHeaderContent.appendChild(editPostButton);
                cardHeaderContent.appendChild(deletePostButton);
            }

            cardHeader.appendChild(cardHeaderContent);

            communityPostCard.appendChild(cardHeader);

            let cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            cardBody.innerHTML = `
                <div class="card-text">
                    <p>${getPosts[i].body}</p>
                </div>
            `;
            communityPostCard.appendChild(cardBody);

            kiiras.appendChild(communityPostCard);
        }
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

            location.reload();
        }
    } catch (error) {
        console.log(error);
    }
}


async function loadEditPost(postId) {
    try {
        const editModal = new bootstrap.Modal(document.getElementById('editPostModal'));
        editModal.show();
        let postData = await callphpFunction("getAdditionalById", { postID: postId });

        $("editPostTitle").value = postData.title;
        $("editPostSection").value = postData.relatedPageID
        $("editPostText").value = postData.body;
        $("editPostSubmit").onclick = () => {
            editPost(postData.postID, postData.jatekID, postData.typeID);
        }
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
            //console.log("I'm running!");
            let postMod = await callphpFunction("updateAdditional", { postID: postId, jatekID: jatekId, typeID: typeId, title: editPostTitle, body: editPostText, relatedPageID: editPostSection });

            location.reload();
        }
    } catch (error) {
        console.log(error);
    }
}

async function searchBar() {
    try {
        const gameId = getQueryParam("gameId");

        let kiiras = $("actual_page");
        kiiras.innerHTML = "";

        let findGameSearch = $("text_communitySearch").value;

        if (findGameSearch == "") {
            $("communityFilter").value = "timeDesc";
            loadCommunityPosts();
        } else {
            let findPostDataTitle = await callphpFunction("searchAdditionalByTitle", { title: findGameSearch });

            if (findPostDataTitle == "Nincsenek találatok!") {
                let userNameCheck = await callphpFunction("getUserByName", { name: findGameSearch });
                if (userNameCheck == "Nincsenek találatok!") {
                    kiiras.innerHTML = `
                        <div class="alert alert-danger mt-3" role="alert">
                            ${userNameCheck}
                        </div>
                    `;
                } else {
                    let findPostDataUser = await callphpFunction("getAdditionalByUserAndGame", { userID: userNameCheck.userID, gameId: gameId });

                    if (!(Array.isArray(findPostDataUser))) {
                        let postPub = await callphpFunction("getUserData", { id: findPostDataUser.publisher });
                        postPub = postPub.userName;

                        let postSection = await callphpFunction("getChapterTitle", { gameId: findPostDataUser.jatekID, pageId: findPostDataUser.relatedPageID });
                        postSection = postSection.chapterName;

                        let communityPostCard = document.createElement("div");
                        communityPostCard.classList.add("card");
                        communityPostCard.classList.add("community-post-card");
                        communityPostCard.style = "width: 100%; margin-bottom: 10px; max-width: 100%";
                        communityPostCard.id = findPostDataUser.postID;

                        let cardHeader = document.createElement("div");
                        cardHeader.classList.add("card-header");

                        let cardHeaderContent = document.createElement("div");
                        cardHeaderContent.innerHTML = `
                            <h5 style="display: inline;">${findPostDataUser.title}</h5>
                            <div class="vr"></div>
                            <h6 style="display: inline;">By: ${postPub}</h6>
                            <div class="vr"></div>
                            <h6 style="display: inline;">${postSection}</h6>
                            <div class="vr"></div>
                            <h6 style="display: inline;">${findPostDataUser.created_at}</h6>
                        `;
                        let upDownVote = document.createElement("div")
                        upDownVote.classList = "btn-group upDownVote"
                
                        let upvote = document.createElement("button")
                        upvote.onclick = () => { callphpFunction('likeAdditional', { postID: findPostDataUser.postID }), toastUp() }
                        upvote.type = "button"
                        upvote.classList = "btn btn-success post-vote-btn"
                        upvote.innerHTML = "&#xf087"
                        upvote.id = "upVote"
                        upDownVote.appendChild(upvote)
                
                        let downvote = document.createElement("button")
                        downvote.onclick = () => { callphpFunction('dislikeAdditional', { postID: findPostDataUser.postID }), toastDown() }
                        downvote.type = "button"
                        downvote.classList = "btn btn-danger post-vote-btn"
                        downvote.innerHTML = "&#xf088"
                        downvote.id = "downVote"
                        upDownVote.appendChild(downvote)
                
                        cardHeaderContent.appendChild(upDownVote)


                        let deletePostButton = document.createElement("button");
                        deletePostButton.type = "submit";
                        deletePostButton.classList.add("btn");
                        deletePostButton.classList.add("btn-danger");
                        deletePostButton.classList.add("postButton");
                        deletePostButton.style = "display: inline;";
                        deletePostButton.innerHTML = "Delete Post";
                        deletePostButton.onclick = () => { openDeleteConfirm(), localDeletePost() };

                        function callLocal(){
                            callphpFunction("deleteAdditional", { postID: findPostDataUser.postID }), location.reload()
                        }
                
                        function localDeletePost(){
                            document.getElementById("deletePostButton").addEventListener('click', callLocal, { once: true })
                
                            document.getElementById("cancelDelete").addEventListener('click', () => { document.getElementById("deletePostButton").removeEventListener('click', callLocal, false) })
                        }


                        let editPostButton = document.createElement("button");
                        editPostButton.type = "button";
                        editPostButton.classList.add("btn");
                        editPostButton.classList.add("btn-primary");
                        editPostButton.classList.add("postButton");
                        editPostButton.style = "display: inline; margin-right: 10px; margin-left: 10px";
                        editPostButton.innerHTML = "Edit Post";
                        editPostButton.onclick = () => {
                            loadEditPost(findPostDataUser.postID);
                        }


                        if (postPub == getCookie("name")) {
                            cardHeaderContent.appendChild(editPostButton);
                            cardHeaderContent.appendChild(deletePostButton);
                        }

                        cardHeader.appendChild(cardHeaderContent);

                        communityPostCard.appendChild(cardHeader);

                        let cardBody = document.createElement("div");
                        cardBody.classList.add("card-body");
                        cardBody.innerHTML = `
                            <div class="card-text">
                                <p>${findPostDataUser.body}</p>
                            </div>
                        `;
                        communityPostCard.appendChild(cardBody);

                        kiiras.appendChild(communityPostCard);
                    } else {
                        for (const element of findPostDataUser) {
                            let postPub = await callphpFunction("getUserData", { id: element.publisher });
                            postPub = postPub.userName;

                            console.log(postPub);
                            //postPub = postPub.userName;

                            let postSection = await callphpFunction("getChapterTitle", { gameId: element.jatekID, pageId: element.relatedPageID });
                            postSection = postSection.chapterName;

                            let communityPostCard = document.createElement("div");
                            communityPostCard.classList.add("card");
                            communityPostCard.classList.add("community-post-card");
                            communityPostCard.style = "width: 100%; margin-bottom: 10px; max-width: 100%";
                            communityPostCard.id = element.postID;

                            let cardHeader = document.createElement("div");
                            cardHeader.classList.add("card-header");

                            let cardHeaderContent = document.createElement("div");
                            cardHeaderContent.innerHTML = `
                                <h5 style="display: inline;">${element.title}</h5>
                                <div class="vr"></div>
                                <h6 style="display: inline;">By: ${postPub}</h6>
                                <div class="vr"></div>
                                <h6 style="display: inline;">${postSection}</h6>
                                <div class="vr"></div>
                                <h6 style="display: inline;">${element.created_at}</h6>
                            `;
                            let upDownVote = document.createElement("div")
                            upDownVote.classList = "btn-group upDownVote"
                    
                            let upvote = document.createElement("button")
                            upvote.onclick = () => { callphpFunction('likeAdditional', { postID: element.postID }), toastUp() }
                            upvote.type = "button"
                            upvote.classList = "btn btn-success post-vote-btn"
                            upvote.innerHTML = "&#xf087"
                            upvote.id = "upVote"
                            upDownVote.appendChild(upvote)
                    
                            let downvote = document.createElement("button")
                            downvote.onclick = () => { callphpFunction('dislikeAdditional', { postID: element.postID }), toastDown() }
                            downvote.type = "button"
                            downvote.classList = "btn btn-danger post-vote-btn"
                            downvote.innerHTML = "&#xf088"
                            downvote.id = "downVote"
                            upDownVote.appendChild(downvote)
                    
                            cardHeaderContent.appendChild(upDownVote)


                            let deletePostButton = document.createElement("button");
                            deletePostButton.type = "submit";
                            deletePostButton.classList.add("btn");
                            deletePostButton.classList.add("btn-danger");
                            deletePostButton.classList.add("postButton");
                            deletePostButton.style = "display: inline;";
                            deletePostButton.innerHTML = "Delete Post";
                            deletePostButton.onclick = () => { openDeleteConfirm(), localDeletePost() };

                            function callLocal(){
                                callphpFunction("deleteAdditional", { postID: element.postID }), location.reload()
                            }
                    
                            function localDeletePost(){
                                document.getElementById("deletePostButton").addEventListener('click', callLocal, { once: true })
                    
                                document.getElementById("cancelDelete").addEventListener('click', () => { document.getElementById("deletePostButton").removeEventListener('click', callLocal, false) })
                            }


                            let editPostButton = document.createElement("button");
                            editPostButton.type = "button";
                            editPostButton.classList.add("btn");
                            editPostButton.classList.add("btn-primary");
                            editPostButton.classList.add("postButton");
                            editPostButton.style = "display: inline; margin-right: 10px; margin-left: 10px";
                            editPostButton.innerHTML = "Edit Post";
                            editPostButton.onclick = () => {
                                loadEditPost(element.postID);
                            }


                            if (postPub == getCookie("name")) {
                                cardHeaderContent.appendChild(editPostButton);
                                cardHeaderContent.appendChild(deletePostButton);
                            }

                            cardHeader.appendChild(cardHeaderContent);

                            communityPostCard.appendChild(cardHeader);

                            let cardBody = document.createElement("div");
                            cardBody.classList.add("card-body");
                            cardBody.innerHTML = `
                                <div class="card-text">
                                    <p>${element.body}</p>
                                </div>
                            `;
                            communityPostCard.appendChild(cardBody);

                            kiiras.appendChild(communityPostCard);
                        }
                    }
                }
            } else {
                let postPub = await callphpFunction("getUserData", { id: findPostDataTitle.publisher });
                postPub = postPub.userName;

                let postSection = await callphpFunction("getChapterTitle", { gameId: findPostDataTitle.jatekID, pageId: findPostDataTitle.relatedPageID });
                postSection = postSection.chapterName;

                let communityPostCard = document.createElement("div");
                communityPostCard.classList.add("card");
                communityPostCard.classList.add("community-post-card");
                communityPostCard.style = "width: 100%; margin-bottom: 10px; max-width: 100%";
                communityPostCard.id = findPostDataTitle.postID;

                let cardHeader = document.createElement("div");
                cardHeader.classList.add("card-header");

                let cardHeaderContent = document.createElement("div");
                cardHeaderContent.innerHTML = `
                <h5 style="display: inline;">${findPostDataTitle.title}</h5>
                <div class="vr"></div>
                <h6 style="display: inline;">By: ${postPub}</h6>
                <div class="vr"></div>
                <h6 style="display: inline;">${postSection}</h6>
                <div class="vr"></div>
                <h6 style="display: inline;">${findPostDataTitle.created_at}</h6>
                `;
                let upDownVote = document.createElement("div")
                upDownVote.classList = "btn-group upDownVote"
        
                let upvote = document.createElement("button")
                upvote.onclick = () => { callphpFunction('likeAdditional', { postID: findPostDataTitle.postID }), toastUp() }
                upvote.type = "button"
                upvote.classList = "btn btn-success post-vote-btn"
                upvote.innerHTML = "&#xf087"
                upvote.id = "upVote"
                upDownVote.appendChild(upvote)
        
                let downvote = document.createElement("button")
                downvote.onclick = () => { callphpFunction('dislikeAdditional', { postID: findPostDataTitle.postID }), toastDown() }
                downvote.type = "button"
                downvote.classList = "btn btn-danger post-vote-btn"
                downvote.innerHTML = "&#xf088"
                downvote.id = "downVote"
                upDownVote.appendChild(downvote)
        
                cardHeaderContent.appendChild(upDownVote)


                let deletePostButton = document.createElement("button");
                deletePostButton.type = "submit";
                deletePostButton.classList.add("btn");
                deletePostButton.classList.add("btn-danger");
                deletePostButton.classList.add("postButton");
                deletePostButton.style = "display: inline;";
                deletePostButton.innerHTML = "Delete Post";
                deletePostButton.onclick = () => { openDeleteConfirm(), localDeletePost() };

                function callLocal(){
                    callphpFunction("deleteAdditional", { postID: findPostDataTitle.postID }), location.reload()
                }
        
                function localDeletePost(){
                    document.getElementById("deletePostButton").addEventListener('click', callLocal, { once: true })
        
                    document.getElementById("cancelDelete").addEventListener('click', () => { document.getElementById("deletePostButton").removeEventListener('click', callLocal, false) })
                }


                let editPostButton = document.createElement("button");
                editPostButton.type = "button";
                editPostButton.classList.add("btn");
                editPostButton.classList.add("btn-primary");
                editPostButton.classList.add("postButton");
                editPostButton.style = "display: inline; margin-right: 10px; margin-left: 10px";
                editPostButton.innerHTML = "Edit Post";
                editPostButton.onclick = () => {
                    loadEditPost(findPostDataTitle.postID);
                }


                if (postPub == getCookie("name")) {
                    cardHeaderContent.appendChild(editPostButton);
                    cardHeaderContent.appendChild(deletePostButton);
                }

                cardHeader.appendChild(cardHeaderContent);

                communityPostCard.appendChild(cardHeader);

                let cardBody = document.createElement("div");
                cardBody.classList.add("card-body");
                cardBody.innerHTML = `
                    <div class="card-text">
                        <p>${findPostDataTitle.body}</p>
                    </div>
                `;
                communityPostCard.appendChild(cardBody);

                kiiras.appendChild(communityPostCard);
            }
        }
    } catch (error) {
        console.log(error);
    }
}


$("newPostSubmit").addEventListener("click", ujPost);

$("text_communitySearch").addEventListener("keydown", function (press) {
    if (press.key === "Enter") {
        press.preventDefault();
        searchBar();
    }
});

$("startButton_communityFilter").addEventListener("click", loadCommunityPosts);

function toastUp(){
    const livetoast = document.getElementById("liveToastUp")
    const toast = bootstrap.Toast.getOrCreateInstance(livetoast)
    toast.show()
}

function toastDown(){
    const livetoast = document.getElementById("liveToastDown")
    const toast = bootstrap.Toast.getOrCreateInstance(livetoast)
    toast.show()
}

function openDeleteConfirm() {
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
    deleteModal.show();
}

window.addEventListener("load", function () {
    newPostSections();
    loadCommunityPosts();
})