//import { steamRequest } from "./index.js";
import { getCookie, getSession, loginCheck } from "./index.js";

window.addEventListener('load', loginCheck)

function $(id) {
    return document.getElementById(id);
}

function orderCards() {
    let setConfig = $("select_libraryPageFilter").value;
    let cardArea = $("kartya_row");
    let cards = Array.from(document.querySelectorAll(".kartya"));

    switch (setConfig) {
        case "a-z":
            cards.sort((game1, game2) => {
                let title1 = game1.querySelector("h6").textContent.toLowerCase();
                let title2 = game2.querySelector("h6").textContent.toLowerCase();
                return title1.localeCompare(title2);
            })

            for (const card of cards) {
                cardArea.appendChild(card);
            }

            break;

        case "z-a":
            cards.sort((game1, game2) => {
                let title1 = game1.querySelector("h6").textContent.toLowerCase();
                let title2 = game2.querySelector("h6").textContent.toLowerCase();
                return title2.localeCompare(title1);
            })

            for (const card of cards) {
                cardArea.appendChild(card);
            }
            
            break;
    }


}

function searchBar() {
    let gameSearch = $("text_libraryPageSearch").value.toLowerCase().split(" ").join("");

    let cards = document.querySelectorAll(".kartya");

    if (gameSearch != "") {
        for (const element of cards) {
            element.removeAttribute("hidden");

            if ((element.id.toLowerCase()).split(" ").join("").match(gameSearch) != gameSearch) {
                element.setAttribute("hidden", true);
            }
        }
    } else {
        for (const element of cards) {
            element.removeAttribute("hidden");
        }
    }

}

function adjustNavbar() {
    const loginEmail = getCookie("email");

    if (loginEmail) {
        $("toMyArticles").removeAttribute("hidden");
    } else {
        $("toMyArticles").setAttribute("hidden", true);
    }
}

/*$("text_libraryPageSearch").addEventListener("keydown", function (press) {
    if (press.key === "Enter") {
        press.preventDefault();
        searchBar();
    }
});*/

$("text_libraryPageSearch").addEventListener("input", searchBar)

$("startButton_libraryFilter").addEventListener("click", orderCards);

window.addEventListener("load", function () {
    //jatek1Check();
    adjustNavbar();
});