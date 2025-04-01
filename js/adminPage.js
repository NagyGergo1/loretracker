import { callphpFunction } from "./index.js";

function $(id){
    return document.getElementById(id);
}

async function userlogs(){
    let kiiras = $("userlogs")
    kiiras.innerHTML = ""

    let adatok = await callphpFunction("getUserLog")
    for (let adat of adatok) {
        let sor = document.createElement("tr")

        let logid = document.createElement("td")
        let method = document.createElement("td")
        let time = document.createElement("td")
        let userid = document.createElement("td")
        let username = document.createElement("td")
        let password = document.createElement("td")
        let email = document.createElement("td")
        let steamid = document.createElement("td")

        logid.innerHTML = adat.logID
        method.innerHTML = adat.muvelet
        time.innerHTML = adat.ido
        userid.innerHTML = adat.userID
        username.innerHTML = adat.userName
        password.innerHTML = adat.password
        email.innerHTML = adat.email
        steamid.innerHTML = adat.steamID

        password.id = "spoiler"

        sor.appendChild(logid)
        sor.appendChild(method)
        sor.appendChild(time)
        sor.appendChild(userid)
        sor.appendChild(username)
        sor.appendChild(password)
        sor.appendChild(email)
        sor.appendChild(steamid)
        kiiras.appendChild(sor)
    }
}

async function additionallogs(){
    let kiiras = $("additionallogs")
    kiiras.innerHTML = ""

    let adatok = await callphpFunction("getAdditionalLog")
    for (let adat of adatok) {
        let sor = document.createElement("tr")

        let logid = document.createElement("td")
        let method = document.createElement("td")
        let time = document.createElement("td")
        let postid = document.createElement("td")
        let publisher = document.createElement("td")
        let title = document.createElement("td")
        let accepted = document.createElement("td")
        
        logid.innerHTML = adat.logID
        method.innerHTML = adat.muvelet
        time.innerHTML = adat.ido
        postid.innerHTML = adat.postID
        publisher.innerHTML = adat.publisher
        title.innerHTML = adat.title
        accepted.innerHTML = (adat.accepted == 1) ? "true" : "false"

        sor.appendChild(logid)
        sor.appendChild(method)
        sor.appendChild(time)
        sor.appendChild(postid)
        sor.appendChild(publisher)
        sor.appendChild(title)
        sor.appendChild(accepted)
        kiiras.appendChild(sor)
    }
}

async function trackerlogs(){
    let kiiras = $("trackerlogs")
    kiiras.innerHTML = ""

    let adatok = await callphpFunction("getTrackerLog")
    for (let adat of adatok) {
        let sor = document.createElement("tr")

        let logid = document.createElement("td")
        let method = document.createElement("td")
        let time = document.createElement("td")
        let trackerid = document.createElement("td")
        let mainach = document.createElement("td")
        let sideach1 = document.createElement("td")
        let sideach2 = document.createElement("td")
        let sideach3 = document.createElement("td")
        let sideach4 = document.createElement("td")

        logid.innerHTML = adat.logID
        method.innerHTML = adat.muvelet
        time.innerHTML = adat.ido
        trackerid.innerHTML = adat.trackerID
        mainach.innerHTML = adat.mainAchievementCounter
        sideach1.innerHTML = adat.sideAchievementCounter1
        sideach2.innerHTML = adat.sideAchievementCounter2
        sideach3.innerHTML = adat.sideAchievementCounter3
        sideach4.innerHTML = adat.sideAchievementCounter4

        sor.appendChild(logid)
        sor.appendChild(method)
        sor.appendChild(time)
        sor.appendChild(trackerid)
        sor.appendChild(mainach)
        sor.appendChild(sideach1)
        sor.appendChild(sideach2)
        sor.appendChild(sideach3)
        sor.appendChild(sideach4)
        kiiras.appendChild(sor)
    }
}

window.addEventListener('load', () => { userlogs(), additionallogs(), trackerlogs() })