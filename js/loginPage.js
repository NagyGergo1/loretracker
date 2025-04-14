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
            $("form-content").appendChild(adminDiv);
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
        $("form-content").appendChild(passwordChange);

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

        $("form-content").appendChild(div);
    }
}

function logOut() {
    deleteCookie("name");
    deleteCookie("email");
    deleteCookie("userId");
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
                Kérem adja meg az e-mail címét!
            </div>
        `;
        return;
    } else if (userPass == "") {
        $("hibakiir").innerHTML = `
            <div class="alert alert-danger" role="alert" style="padding: 8px;">
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
            setCookie("userId", userAdatok.userID)
            console.log(getCookie("name"));
            checkCookie("name");
            removeSession("tempSteamID");
            location.replace(location.href);
        } else {
            $("hibakiir").innerHTML = `
                <div class="alert alert-danger" role="alert" style="padding: 8px;">
                    Nincs ilyen felhasználó!
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
        /*var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}*/

        let userData = await callphpFunction("getUserByEmail", {email: email})

        let writeError = $("editPasswHiba")
        writeError.innerHTML = ""

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

        let changePassword = await callphpFunction("changePassword", {email: email, password: newPassw})

        console.log(changePassword)

    } catch (error) {
        console.log(error)
    }
}

$("editPasswSubmit").addEventListener('click', () => {
    ChangePassword(getCookie("email"))
})

window.addEventListener("load", function() {
    loadPage();
})

$("deleteAccountButton").addEventListener("click", userDelete);

$("inditas").addEventListener("click", logIn);