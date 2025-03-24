import { callphpFunction } from "./index.js";
import { setCookie } from "./index.js";
import { getCookie } from "./index.js";
import { checkCookie } from "./index.js";
import { loginStat } from "./index.js";
import { deleteCookie } from "./index.js";

function $(id) {
    return document.getElementById(id);
}

async function loadPage() {
    checkCookie("email");
    console.log(loginStat);
    if (loginStat == true) {
        $("toLibrary").removeAttribute("hidden");
        $("toBookmarks").removeAttribute("hidden");
        $("toMyArticles").removeAttribute("hidden");
        $("form-content").innerHTML = "";
        let userEmail = getCookie("email");
        let userData = await callphpFunction("getUserByEmail", {email: userEmail});
        console.log(userData);

        $("form-content").innerHTML += `
            <h2 style="text-align: center; color: orange"><b>My Account</b></h2>
        `;

        let table = document.createElement("table");
        table.classList.add("table");
        
        table.innerHTML += `
            <tr>
                <th>Felhasználónév: </th>
                <td>${userData.userName}</td>
            </tr>
            <tr>
                <th>E-mail: </th>
                <td>${userData.email}</td>
            </tr>
            <tr>
                <th>SteamID: </th>
                <td>${userData.steamID}</td>
            </tr>
        `;        
        $("form-content").appendChild(table);

        let div = document.createElement("div");
        div.style.display = "flex";
        
        let button1 = document.createElement("button");
        button1.classList.add("btn");
        button1.classList.add("btn-danger");
        button1.id = "torles";
        button1.type = "submit";
        button1.style = "margin-right: 2.5px;";
        button1.innerHTML = "Delete Account";
        button1.onclick = () => {userDelete()};
        
        //$("form-content").appendChild(button1);
        div.appendChild(button1);
        
        let button2 = document.createElement("button");
        button2.classList.add("btn");
        button2.classList.add("btn-warning");
        button2.id = "kilepes";
        button2.type = "submit";
        button2.innerHTML = "Log Out";
        button2.style = "margin-left: 2.5px";
        button2.onclick = () => {deleteCookie("email")};
        
        //$("form-content").appendChild(button2);
        div.appendChild(button2);

        $("form-content").appendChild(div);
    }
}

async function userDelete() {
    let userEmail = getCookie("email");
    let deleteUser = await callphpFunction("deleteUser", {email : userEmail});

    deleteUser;
    deleteCookie("email");
    deleteCookie("name");
    //location.reload();
}

async function bejelentkezes() {
    let userEmail = $("loginEmail").value;
    let userPass = $("loginPassword").value;

    if (userEmail == "") {
        $("hibakiir").innerHTML = `
            <div class="alert alert-danger" role="alert">
                Kérem adja meg az e-mail címét!
            </div>
        `;
        return;
    } else if (userPass == "") {
        $("hibakiir").innerHTML = `
            <div class="alert alert-danger" role="alert">
                Kérem adja meg a jelszavát!
            </div>
        `;
        return;
    }

    try {
        let userAdatok = await callphpFunction("getUserLogin", { email: userEmail, password: userPass });
        console.log(userAdatok.userName);

        if (userAdatok && userAdatok.userName) {
            setCookie("name", userAdatok.userName);
            setCookie("email", userAdatok.email);
            console.log(getCookie("name"));
            checkCookie("name");
            location.replace(location.href);
        } else {
            $("hibakiir").innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Nincs ilyen felhasználó!
                </div>
            `;
        }
    } catch (error) {
        console.log(error);
    }

}

window.addEventListener("load", function() {
    loadPage();
})

$("inditas").addEventListener("click", bejelentkezes);