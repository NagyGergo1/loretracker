import { callphpFunction } from "./index.js";
import { setCookie } from "./index.js";
import { getCookie } from "./index.js";
import { checkCookie } from "./index.js";
import { loginStat } from "./index.js";
import { deleteCookie } from "./index.js";
import { removeSession } from "./index.js";
import { loginCheck } from "./index.js";

window.addEventListener('load', loginCheck)

function $(id) {
    return document.getElementById(id);
}

async function loadPage() {
    checkCookie("email");
    console.log(loginStat);
    if (loginStat == true) {
        $("toLibrary").removeAttribute("hidden");
        $("toMyArticles").removeAttribute("hidden");
        $("form-container").innerHTML = "";
        let userEmail = getCookie("email");
        let userData = await callphpFunction("getUserByEmail", {email: userEmail});
        console.log(userData);

        $("form-container").innerHTML += `
            <h2 style="text-align: center; color: orange"><b>My Account</b></h2>
        `;

        let table = document.createElement("table");
        table.classList.add("table");
        
        table.innerHTML += `
            <tr>
                <th>Username: </th>
                <td id="userNameClickParent"><a id="userNameClick">${userData.userName}</a></td>
            </tr>
            <tr>
                <th>E-mail: </th>
                <td id="emailClickParent"><a id="emailClick">${userData.email}</a></td>
            </tr>
            <tr>
                <th>SteamID: </th>
                <td id="steamidClickParent"><a id="steamidClick">${userData.steamID}</a></td>
            </tr>
        `;        
        $("form-container").appendChild(table);

        function dataChange(element){
            let thisElement = $(`${element}Click`)
            let userEmail = getCookie("email");

            let input = document.createElement("input")
            input.id = `${element}Input`
            input.type = "text"
            input.value = thisElement.innerHTML

            $(`${element}ClickParent`).innerHTML = ""
            $(`${element}ClickParent`).appendChild(input)

            $(`${element}Input`).focus()

            $(`${element}Input`).addEventListener('focusout', function(){
                if(element == "userName"){
                    $(`userNameClickParent`).innerHTML = `<a id="userNameClick">${userData.userName}</a>`
                }
                else if(element == "email"){
                    $(`emailClickParent`).innerHTML = `<a id="emailClick">${userData.email}</a>`
                }
                else if(element == "steamid"){
                    $(`steamidClickParent`).innerHTML = `<a id="steamidClick">${userData.steamID}</a>`
                }

                addEnterListeners()
            })

            $(`${element}Input`).addEventListener('keydown', async function(event){
                if(event.key === "Enter"){
                    let ertek = $(`${element}Input`).value

                    if(element == "userName"){
                        await callphpFunction("modifyUserName", {userName: ertek, email: userEmail})

                        setCookie("name", ertek)
                        $("userNameClickParent").innerHTML = ""
                        $("userNameClickParent").innerHTML = `<a id="userNameClick">${ertek}</a>`

                        const livetoast = document.getElementById("toastNameChange")
                        const toast = bootstrap.Toast.getOrCreateInstance(livetoast)
                        toast.show()

                        addEnterListeners()

                        $(`${element}Input`).dispatchEvent(new Event("focusout"))
                    }
                    else if(element == "email"){
                        await callphpFunction("modifyEmail", {newEmail: ertek, currentEmail: userEmail})
                        
                        setCookie("email", ertek)
                        $("emailClickParent").innerHTML = ""
                        $("emailClickParent").innerHTML = `<a id="emailClick">${ertek}</a>`

                        const livetoast = document.getElementById("toastEmailChange")
                        const toast = bootstrap.Toast.getOrCreateInstance(livetoast)
                        toast.show()

                        addEnterListeners()

                        $(`${element}Input`).dispatchEvent(new Event("focusout"))
                    }
                    else if(element == "steamid"){
                        await callphpFunction("modifySteamID", {steamID: ertek, email: userEmail})

                        $("steamidClickParent").innerHTML = ""
                        $("steamidClickParent").innerHTML = `<a id="steamidClick">${ertek}</a>`

                        const livetoast = document.getElementById("toastSteamidChange")
                        const toast = bootstrap.Toast.getOrCreateInstance(livetoast)
                        toast.show()

                        addEnterListeners()

                        $(`${element}Input`).dispatchEvent(new Event("focusout"))
                    }
                }
            })
        }

        $("userNameClick").addEventListener('click', () => {
            dataChange("userName")
        })
    
        $("emailClick").addEventListener('click', () => {
            dataChange("email")
        })
    
        $("steamidClick").addEventListener('click', () => {
            dataChange("steamid")
        })

        function addEnterListeners(){
            $("userNameClick").addEventListener('click', () => {
                dataChange("userName")
            })
        
            $("emailClick").addEventListener('click', () => {
                dataChange("email")
            })
        
            $("steamidClick").addEventListener('click', () => {
                dataChange("steamid")
            })
        }

        if (userData.admin == 1) {
            let adminDiv = document.createElement("div");

            let adminButton = document.createElement("a");
            adminButton.href = "./adminPage.html";
            adminButton.type = "button";
            adminButton.id = "adminButton"
            adminButton.classList.add("btn");
            adminButton.classList.add("btn-warning");
            adminButton.style = "margin-bottom: 5px; width: 100%; color: white; background-color: orange"
            adminButton.innerHTML = "To Admin Page";

            adminDiv.appendChild(adminButton);
            $("form-container").appendChild(adminDiv);
        }

        let passwordChange = document.createElement("div");

        let passwordButton = document.createElement("a");
        passwordButton.type = "button";
        passwordButton.classList.add("btn");
        passwordButton.classList.add("btn-success");
        passwordButton.style = "margin-bottom: 5px; width: 100%; color: white"
        passwordButton.innerHTML = "Change Password";
        passwordButton.onclick = () => {
            const editModal = new bootstrap.Modal($("editPasswModal"))
            editModal.show()
        }

        passwordChange.appendChild(passwordButton);
        $("form-container").appendChild(passwordChange);

        let div = document.createElement("div");
        div.style.display = "flex";
        
        let button1 = document.createElement("button");
        button1.classList.add("btn");
        button1.classList.add("btn-danger");
        button1.id = "torles";
        button1.type = "button";
        button1.style = "margin-right: 2.5px;";
        button1.innerHTML = "Delete Account";
        button1.onclick = () => {openDeleteConfirm()};
        
        div.appendChild(button1);
        
        let button2 = document.createElement("button");
        button2.classList.add("btn");
        button2.classList.add("btn-primary");
        button2.id = "kilepes";
        button2.type = "submit";
        button2.innerHTML = "Log Out";
        button2.style = "margin-left: 2.5px";
        button2.onclick = () => {logOut()};
        
        div.appendChild(button2);

        $("form-container").appendChild(div);
    }
}

function logOut() {
    deleteCookie("name");
    deleteCookie("email");
    deleteCookie("userId");
    location.reload()
}

async function userDelete() {
    let userEmail = getCookie("email");
    let deleteUser = await callphpFunction("deleteUser", {email : userEmail});

    deleteUser;
    $("kilepes").click();
}

async function logIn() {
    let userEmail = $("loginEmail").value;
    let userPass = $("loginPassword").value;

    if (userEmail == "") {
        $("hibakiir").innerHTML = `
            <div class="alert alert-danger" role="alert" style="padding: 8px;">
                Please enter your e-mail!
            </div>
        `;
        return;
    } else if (userPass == "") {
        $("hibakiir").innerHTML = `
            <div class="alert alert-danger" role="alert" style="padding: 8px;">
                Please enter your password!
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
            setCookie("userId", userAdatok.userID)
            console.log(getCookie("name"));
            checkCookie("name");
            removeSession("tempSteamID");
            location.replace(location.href);
        } else {
            $("hibakiir").innerHTML = `
                <div class="alert alert-danger" role="alert" style="padding: 8px;">
                    Incorrect information!
                </div>
            `;
        }
    } catch (error) {
        console.log(error);
    }
}

function openDeleteConfirm() {
    const deletModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
    deletModal.show();
}

async function ChangePassword(email){
    try {
        let writeError = $("editPasswHiba")

        let oldPassw = $("oldPassw").value
        let newPassw = $("newPassw").value
        let confirmPassw = $("confirmPassw").value

        if(oldPassw == "" || newPassw == "" || confirmPassw == ""){
            writeError.innerHTML =
            `<div class="alert alert-danger mt-3" role="alert">
                Please fill all the blanks!
            </div>`
        }
        else if(newPassw != confirmPassw){
            writeError.innerHTML =
            `<div class="alert alert-danger mt-3" role="alert">
                Password confirmation doesn't match!
            </div>`
        }
        else if(await callphpFunction("passwordCheck", {email: email, password: oldPassw}) != "Helyes jelszó!"){
            writeError.innerHTML =
            `<div class="alert alert-danger mt-3" role="alert">
                Incorrect current password!
            </div>`
        }
        else{
            let change = await callphpFunction("changePassword", {email: email, password: newPassw})

            if(change == "Sikertelen művelet!"){
                writeError.innerHTML =
                `<div class="alert alert-danger mt-3" role="alert">
                    New password can't be the same as the current one!
                </div>`
            }
            else{
                $("editPasswModalClose").click()
                const livetoast = document.getElementById("toastPassChange")
                const toast = bootstrap.Toast.getOrCreateInstance(livetoast)
                toast.show()
                $("oldPassw").value = ""
                $("newPassw").value = ""
                $("confirmPassw").value = ""

                writeError.innerHTML = ""
            }
        }

    } catch (error) {
        console.log(error)
    }
}

$("closePasswChange").addEventListener("click", () => {
    $("oldPassw").value = ""
    $("newPassw").value = ""
    $("confirmPassw").value = ""

    let writeError = $("editPasswHiba")
    writeError.innerHTML = ""
})

$("editPasswModalClose").addEventListener("click", () => {
    $("oldPassw").value = ""
    $("newPassw").value = ""
    $("confirmPassw").value = ""

    let writeError = $("editPasswHiba")
    writeError.innerHTML = ""
})

$("editPasswSubmit").addEventListener('click', () => {
    ChangePassword(getCookie("email"))
})

window.addEventListener("load", function() {
    loadPage();
})

$("deleteAccountButton").addEventListener("click", userDelete);

$("inditas").addEventListener("click", logIn);