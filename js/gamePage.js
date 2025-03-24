import { callphpFunction } from "./index.js";
import { checkCookie } from "./index.js";
import { loginStat } from "./index.js";
import { steamRequest } from "./index.js";


checkCookie("email");
console.log(loginStat);
function $(id) {
    return document.getElementById(id);
}


async function jatekAdatBetolt() {
    let kiiras = $("chapters");
    let tartalomJegy = $("chapter-nav");
    let userAdatok = await steamRequest();
    let jatekAdatok = await callphpFunction("gameloadall", {id : 1});
    
    for (let i = 0; i < userAdatok.length; i++) {
        for (let j = 0; j < jatekAdatok.length; j++) {
            if (userAdatok[i].name == jatekAdatok[j].title) {
                let chapter = document.createElement("div");
                chapter.id = "chapter" + (j + 1) + "Section";

                let chapterTitle = document.createElement("h2");
                chapterTitle.innerHTML = `Chapter ${j + 1}`;
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
                chapterGomb.innerHTML = `Chapter ${j + 1}`;
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
}

window.addEventListener("load", function() {
    jatekAdatBetolt();
})