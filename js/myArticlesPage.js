import { $ } from "./index.js";
import { callphpFunction } from "./index.js";
import { steamRequest, loginStat, checkCookie, getCookie, loginCheck } from "./index.js";

async function loadPosts() {
    try {
        let userData = getCookie("userId");

        let userArticles = callphpFunction("getAdditionalByUser", {userID : userData});

        
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('load', loginCheck)