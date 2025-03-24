async function callphpFunction(funcName, params = {}){
    try {
        let toSend = {
            "params" : params
        }

        let response = await fetch('http://localhost/13c-nagyg/loretracker/php/index.php/' + funcName, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(toSend),
        })

        let data = await response.json()
        if(response.ok){
            
            data = (data.length > 1) ? data : data[0]
            return data
        }
        else{
            return data.valasz
        }
    }
    catch (error) {
        console.log(error)
    }
}

async function loadLorepage1(){
    return await callphpFunction('gameloadall', { id: 1 })
}

async function gameList(){
    return await callphpFunction('gameList')
}

async function getUserTracker(){
    return await callphpFunction('getUserTracker', { id: 2 })
}

async function getTrackerByUserAndGame() {
    return await callphpFunction('getTrackerByUserAndGame', { userID: 2, jatekID: 1 })
}

async function getUserData(){
    return await callphpFunction('getUserData', { id: 1 })
}

async function createUserData() {
    return await callphpFunction('createUserData', { userName: "tesztuser", password: "asd123", email: "joemail@email.com", steamID: "ijdgsiu298479" })
}

async function getUserByName() {
    return await callphpFunction('getUserByName', { name: "gergo" })
}

async function getUserByEmail() {
    return await callphpFunction('getUserByEmail', { email: "gergonagy1122@gmail.com" });
}

async function getUserLogin() {
    return await callphpFunction('getUserLogin', { email: "gergonagy1122@gmail.com", password: "asd123" })
}

async function updateTracker(){
    return await callphpFunction('updateTracker', { trackerID: 2, mainAcCounter: 8, optional: [4, 1] })
}

function setCookie(cname, data){
    document.cookie = `loretracker_${cname}=${data}`
}

function getCookie(cname) {
    let name = "loretracker_" + cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function checkCookie(cname) {
    let name = getCookie(cname);
    if(name != ""){
        alert("Welcome again " + name + "!");
    }
    else{
        alert("Please log in!")
    }
}

function deleteCookie(cname){
    document.cookie = `loretracker_${cname}=none; expires=Mon, 17 Mar 2025 00:00:00 UTC`
}

async function callAllFunc(){
    console.log(await loadLorepage1(), await gameList(), await getUserTracker(), await getTrackerByUserAndGame(), await getUserData(), /*await createUserData(),*/ await getUserByName(), await getUserByEmail(), await getUserLogin(), /*await updateTracker()*/)

    setCookie("name", "gergo")
    console.log(getCookie("name"))
    //checkCookie("name")
    deleteCookie("name")
    //checkCookie("name")

    //console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
}
window.addEventListener('load', callAllFunc)

//Steam API
async function steamRequest() {
    try {
        let valasz = await fetch('https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?appid=2215430&key=525020EAA6719FA15214AF6D447A5FC7&format=json&steamid=76561198811836115')
        //let valasz = await fetch('https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=525020EAA6719FA15214AF6D447A5FC7&appid=2215430')

        let adatok = await valasz.json()
        
        if(valasz.ok){
            console.log(adatok.playerstats.achievements)
            //console.log(adatok.game.availableGameStats.achievements)
        }
        else alert("nem jo :c")

    } catch (error) {
        console.log(error)
    }
}
window.addEventListener('load', steamRequest)

async function createTracker(){
    return await callphpFunction('createTracker', { userID: 1, jatekID: 2, mainAcCounter: 4, optional: [3, 6] })
}
document.getElementById("gomba").addEventListener('click', createTracker)